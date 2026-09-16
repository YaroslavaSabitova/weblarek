import './scss/styles.scss';

import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { ApiService } from './components/api/ApiService';

import { ItemsCatalog } from './components/models/ItemsCatalog';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';

import { Header } from './components/views/Header';
import { Gallery } from './components/views/Gallery';
import { CardCatalog } from './components/views/CardCatalog';

import { API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

// itemsCatalog.saveItems(apiProducts.items);
// console.log('Массив товаров из каталога:', itemsCatalog.getItems());

// console.log(
//   'товар по id:',
//   itemsCatalog.getItemById('854cef69-976d-4c2a-a18c-2aa45046c390')
// );

// console.log('данные покупателя', buyer.getData());
// console.log('валидация данных покупателя', buyer.validate());

// console.log('товары из корзины', cart.getItems());
// console.log('стоимость всех товаров в корзине', cart.getTotalPrice());
// console.log('количество товаров в корзине', cart.getCount());

// const apiData = new Api(apiProducts);
// const apiServiceData = new ApiService(apiData);
// console.log('apiServiceData', apiServiceData);

// console.log('Проверка URL:');
// console.log(`API_URL: ${API_URL}`);
// console.log(`Полный URL для товаров: ${API_URL}/product/`);
// console.log(`Полный URL для заказа: ${API_URL}/order/`);

// async function main() {
//   try {
//     console.log(`API URL: ${API_URL}`);

//     const api = new Api(API_URL);
//     const apiService = new ApiService(api);
//     const catalog = new ItemsCatalog();

//     console.log('Загрузка товаров с сервера');

//     // запрос на сервер для получения товаров
//     const response = await apiService.getProducts();
//     console.log('response', response);
//     console.log(`Всего товаров: ${response.total}`);

//     // сохранение массива товаров в модель каталога
//     catalog.saveItems(response.items);

//     // сохраненный каталог из модели
//     const products = catalog.getItems();
//     console.log('products', products);

//     // каталог в консоль
//     console.log('Каталог товаров:');

//     products.forEach((product, index) => {
//       console.log(`${index + 1}. ${product.title}`);
//       console.log(`ID: ${product.id}`);
//       console.log(`Категория: ${product.category}`);
//       console.log(`Цена: ${product.price}`);
//       console.log(`Описание: ${product.description}}`);
//       console.log(`Изображение: ${product.image}`);
//       console.log('─────────────────────');
//     });

//     console.log(`Итого в каталоге: ${catalog.getItems().length} товаров`);
//   } catch (error) {
//     console.error('Ошибка', error);
//   }
// }

// main();

const events = new EventEmitter();

const catalog = new ItemsCatalog();
const cart = new Cart();
const buyer = new Buyer();

const api = new Api(API_URL);
const apiService = new ApiService(api);

const header = new Header(ensureElement<HTMLElement>('.header'), events);
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));

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

// обрабатываем события (презентер)

// клик по корзине в шапке
events.on('basket:open', () => {
  console.log('корзина');
});

// Клик по карточке товара в галерее
events.on<{ id: string }>('card:select', data => {
  const product = catalog.getItemById(data.id);
  if (!product) return;

  catalog.saveSelectedItem(product);
  console.log('Выбран товар:', product.title);
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
