import { IProduct } from '../../types';

export class ItemsCatalog {
  private items: IProduct[] = []; // массив всех товаров
  private selectedItem: IProduct | null = null; // товар, выбранный для подробного отображения

  // сохранение массива товаров, полученного в параметрах метода
  public saveItems(items: IProduct[]): void {
    this.items = items;
  }

  // получение массива товаров из модели
  public getItems(): IProduct[] {
    return this.items;
  }

  // получение одного товара по его id
  public getItemById(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  // сохранение товара для подробного отображения
  public saveSelectedItem(item: IProduct): void {
    this.selectedItem = item;
  }

  // получение товара для подробного отображения
  public getSelectedItem(): IProduct | null {
    return this.selectedItem;
  }
}
