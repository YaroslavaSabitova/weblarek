// карточка для галереи на главной

import { Card, ICardData } from './Card';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { CDN_URL, categoryMap } from '../../utils/constants';

export interface ICardCatalogData extends ICardData {
  id: string;
  category: string;
  image: string;
}

export class CardCatalog extends Card<ICardCatalogData> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected cardId: string = '';

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);

    // передаём в презентер id товара
    this.container.addEventListener('click', () => {
      this.events.emit('card:select', { id: this.cardId });
    });
  }

  set id(value: string) {
    this.cardId = value;
  }

  // категория товара
  set category(value: string) {
    // новый текст категории
    this.categoryElement.textContent = value;

    // базовый класс категории
    this.categoryElement.className = 'card__category';

    // новый класс-модификатор
    const newClass = categoryMap[value as keyof typeof categoryMap];
    if (newClass) {
      this.categoryElement.classList.add(newClass);
    }
  }

  // изображение товара
  set image(value: string) {
    const fullImageUrl = CDN_URL + value;

    // alt — название товара из title
    const altText = this.titleElement.textContent ?? '';

    // ставим src и alt через метод Component
    this.setImage(this.imageElement, fullImageUrl, altText);
  }
}
