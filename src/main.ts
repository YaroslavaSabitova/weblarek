import './scss/styles.scss';
import { ItemsCatalog } from './components/Models/ItemsCatalog';
import { Buyer } from './components/Models/Buyer';
import { Cart } from './components/Models/Cart';

import { apiProducts } from './utils/data';

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
