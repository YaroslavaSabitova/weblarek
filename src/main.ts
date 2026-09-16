import './scss/styles.scss';

import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { ApiService } from './components/api/ApiService';

import { ItemsCatalog } from './components/models/ItemsCatalog';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';

import { Header } from './components/views/Header';
import { Gallery } from './components/views/Gallery';
import { Basket } from './components/views/Basket';
import { Modal } from './components/views/Modal';
import { OrderForm } from './components/views/OrderForm';
import { ContactsForm } from './components/views/ContactsForm';
import { CardCatalog } from './components/views/CardCatalog';
import { CardPreview } from './components/views/CardPreview';
import { CardBasket } from './components/views/CardBasket';

import { API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { TPayment } from './types';

const events = new EventEmitter();

const catalog = new ItemsCatalog();
const cart = new Cart();
const buyer = new Buyer();

const api = new Api(API_URL);
const apiService = new ApiService(api);

const header = new Header(ensureElement<HTMLElement>('.header'), events);
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basketContainer = cloneTemplate<HTMLElement>('#basket');
const basket = new Basket(basketContainer, events);

const orderFormContainer = cloneTemplate<HTMLElement>('#order');
const orderForm = new OrderForm(orderFormContainer, events);

const contactsFormContainer = cloneTemplate<HTMLElement>('#contacts');
const contactsForm = new ContactsForm(contactsFormContainer, events);

// создаём карточки CardCatalog для каждого товара и передаём в Gallery
function renderGallery() {
  const products = catalog.getItems();

  const cards = products.map(product => {
    const cardContainer = cloneTemplate<HTMLButtonElement>('#card-catalog');

    // компонент карточки
    const card = new CardCatalog(cardContainer, events);

    card.id = product.id;
    card.title = product.title;
    card.price = product.price;
    card.category = product.category;
    card.image = product.image;

    return cardContainer;
  });

  gallery.catalog = cards;
}

// отрисовка корзины
function renderBasket() {
  const items = cart.getItems();

  const cards = items.map((product, i) => {
    const cardContainer = cloneTemplate<HTMLLIElement>('#card-basket');
    const card = new CardBasket(cardContainer, events);

    card.id = product.id;
    card.index = i + 1;
    card.title = product.title;
    card.price = product.price;

    return cardContainer;
  });

  basket.items = cards;
  basket.total = cart.getTotalPrice();
  basket.disabled = items.length === 0;
}

// форма заказа 1ый шаг
function updateOrderForm() {
  const buyerData = buyer.getData();
  const { errors } = buyer.validate();

  // первый шаг (payment + address)
  // непустые ошибки первого шага
  const errorsList: string[] = [];

  if (errors.payment) {
    errorsList.push(errors.payment);
  }
  if (errors.address) {
    errorsList.push(errors.address);
  }

  const orderErrors = errorsList.join(', ');

  // кнопка «Далее» активна, если нет ошибок первого шага
  const hasErrors = errorsList.length > 0;

  orderForm.payment = buyerData.payment;
  orderForm.address = buyerData.address;
  orderForm.errors = orderErrors;
  orderForm.disabled = hasErrors;
}

// форма заказа 2ой шаг
function updateContactsForm() {
  const buyerData = buyer.getData();
  const { errors } = buyer.validate();

  // ошибки второго шага (email + phone)
  const errorsList: string[] = [];

  if (errors.email) {
    errorsList.push(errors.email);
  }
  if (errors.phone) {
    errorsList.push(errors.phone);
  }

  const contactsErrors = errorsList.join(', ');
  const hasErrors = errorsList.length > 0;

  contactsForm.email = buyerData.email;
  contactsForm.phone = buyerData.phone;
  contactsForm.errors = contactsErrors;
  contactsForm.disabled = hasErrors;
}

// презентер

// клик по корзине
events.on('basket:open', () => {
  renderBasket();
  modal.content = basketContainer;
  modal.open();
});

// клик по карточке товара в галерее
events.on<{ id: string }>('card:select', data => {
  const product = catalog.getItemById(data.id);
  if (!product) return;

  catalog.saveSelectedItem(product);

  // превью
  const previewContainer = cloneTemplate<HTMLElement>('#card-preview');
  const preview = new CardPreview(previewContainer, events);

  preview.id = product.id;
  preview.title = product.title;
  preview.price = product.price;
  preview.category = product.category;
  preview.image = product.image;
  preview.description = product.description;

  // состояние кнопки
  if (product.price === null) {
    preview.buttonState = 'unavailable';
  } else if (cart.hasItem(product.id)) {
    preview.buttonState = 'remove';
  } else {
    preview.buttonState = 'add';
  }

  modal.content = previewContainer;
  modal.open();
});

// добавление товара в корзину из превью
events.on<{ id: string }>('card:add-to-cart', data => {
  const product = catalog.getItemById(data.id);
  if (!product) return;

  cart.addItem(product);
  header.counter = cart.getCount();
  modal.close();
});

// удаление товара из корзины (из превью)
events.on<{ id: string }>('card:remove-from-cart', data => {
  const product = catalog.getItemById(data.id);
  if (!product) return;

  cart.removeItem(product);
  header.counter = cart.getCount();
  modal.close();
});

// удаление товара из корзины (из списка корзины)
events.on<{ id: string }>('cart:remove-item', data => {
  const product = catalog.getItemById(data.id);
  if (!product) return;

  cart.removeItem(product);
  header.counter = cart.getCount();
  renderBasket();
});

// открытие формы заказа (кнопка «Оформить» в корзине)
events.on('order:open', () => {
  updateOrderForm();
  modal.content = orderFormContainer;
});

// изменение адреса в форме заказа
events.on<{ value: string }>('order.address:change', data => {
  buyer.setData({ address: data.value });
  updateOrderForm();
});

// изменение способа оплаты в форме заказа
events.on<{ value: TPayment }>('order.payment:change', data => {
  buyer.setData({ payment: data.value });
  updateOrderForm();
});

// ввод email
events.on<{ value: string }>('contacts.email:change', data => {
  buyer.setData({ email: data.value });
  updateContactsForm();
});

// ввод телефона
events.on<{ value: string }>('contacts.phone:change', data => {
  buyer.setData({ phone: data.value });
  updateContactsForm();
});

// открытие формы контактов (клик «Далее» в первой форме)
events.on('order:submit', () => {
  // заполняем форму текущими данными
  updateContactsForm();
  modal.content = contactsFormContainer;
});

apiService
  .getProducts()
  .then(response => {
    console.log(`Загружено ${response.total} товаров с сервера`);

    // сохраняем товары в каталог
    catalog.saveItems(response.items);

    renderGallery();

    // счётчик корзины в шапке
    header.counter = cart.getCount();
  })
  .catch(error => {
    console.error('Ошибка загрузки товаров:', error);
  });
