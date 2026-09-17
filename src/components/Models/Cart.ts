import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class Cart {
  private items: IProduct[] = []; // товары, которые пользователь выбрал для покупки

  constructor(protected events: IEvents) {}

  // получение массива товаров, которые находятся в корзине
  public getItems(): IProduct[] {
    return this.items;
  }

  // добавление товара, который был получен в параметре, в массив корзины
  public addItem(product: IProduct): void {
    this.items.push(product);
    this.events.emit('cart:changed', { items: this.items });
  }

  // удаление товара, полученного в параметре из массива корзины
  public removeItem(product: IProduct): void {
    const index = this.items.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.events.emit('cart:changed', { items: this.items });
    } else {
      console.warn(`Товар с id ${product.id} не найден в корзине`);
    }
  }

  // очистка корзины
  public clear(): void {
    this.items = [];
    this.events.emit('cart:changed', { items: this.items });
  }

  // получение стоимости всех товаров в корзине
  public getTotalPrice(): number {
    return this.items.reduce((total, item) => {
      return total + (item.price || 0);
    }, 0);
  }

  // получение количества товаров в корзине
  public getCount(): number {
    return this.items.length;
  }

  // проверка наличия товара в корзине по его id, полученного в параметр метода
  public hasItem(id: string): boolean {
    return this.items.some(item => item.id === id);
  }
}
