import './scss/styles.scss';
import { ItemsCatalog } from './components/models/ItemsCatalog';
import { Buyer } from './components/models/Buyer';
import { Cart } from './components/models/Cart';
import { IProduct } from './types';

import { apiProducts } from './utils/data';

import { Api } from './components/base/Api';
import { ApiService } from './components/api/ApiService';
import { API_URL } from './utils/constants';

const itemsCatalog = new ItemsCatalog();
const buyer = new Buyer();
const cart = new Cart();

itemsCatalog.saveItems(apiProducts.items);
console.log('Массив товаров из каталога:', itemsCatalog.getItems());

console.log(
  'товар по id:',
  itemsCatalog.getItemById('854cef69-976d-4c2a-a18c-2aa45046c390')
);

console.log('данные покупателя', buyer.getData());
console.log('валидация способа оплаты и адреса', buyer.validateStepOne());
console.log('валидация email и телефона', buyer.validateStepTwo());

console.log('товары из корзины', cart.getItems());
console.log('стоимость всех товаров в корзине', cart.getTotalPrice());
console.log('количество товаров в корзине', cart.getCount());

const apiData = new Api(apiProducts);
const apiServiceData = new ApiService(apiData);
console.log('apiServiceData', apiServiceData);

console.log('Проверка URL:');
console.log(`API_URL: ${API_URL}`);
console.log(`Полный URL для товаров: ${API_URL}/product/`);
console.log(`Полный URL для заказа: ${API_URL}/order/`);

async function main() {
  try {
    console.log(`API URL: ${API_URL}`);

    const api = new Api(API_URL);
    const apiService = new ApiService(api);
    const catalog = new ItemsCatalog();

    console.log('Загрузка товаров с сервера');

    // запрос на сервер для получения товаров
    const response = await apiService.getProducts();
    console.log('response', response);
    console.log(`Всего товаров: ${response.total}`);

    // сохранение массива товаров в модель каталога
    catalog.saveItems(response.items);

    // сохраненный каталог из модели
    const products = catalog.getItems();
    console.log('products', products);

    // каталог в консоль
    console.log('Каталог товаров:');

    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title}`);
      console.log(`ID: ${product.id}`);
      console.log(`Категория: ${product.category}`);
      console.log(`Цена: ${product.price}`);
      console.log(`Описание: ${product.description}}`);
      console.log(`Изображение: ${product.image}`);
      console.log('─────────────────────');
    });

    console.log(`Итого в каталоге: ${catalog.getItems().length} товаров`);
  } catch (error) {
    console.error('Ошибка', error);
  }
}

main();
