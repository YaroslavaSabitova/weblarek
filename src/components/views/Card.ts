import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { CDN_URL, categoryMap } from '../../utils/constants';

// общие данные для всех карточек
export interface ICardData {
  title: string;
  price: number | null;
  id: string;
}

// базовый компонент карточки товара
export class Card<T extends ICardData> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected categoryElement: HTMLElement | null;
  protected imageElement: HTMLImageElement | null;

  constructor(container: HTMLElement) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);

    this.categoryElement = this.container.querySelector('.card__category');
    this.imageElement = this.container.querySelector('.card__image');
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  // если цена null - бесценно
  set price(value: number | null) {
    this.priceElement.textContent = value === null ? 'Бесценно' : `${value} синапсов`;
  }

  // категория для Catalog/Preview.
  // если элемента нет — ничего не делаем.
  set category(value: string) {
    if (!this.categoryElement) return;

    this.categoryElement.textContent = value;
    this.categoryElement.className = 'card__category';

    const newClass = categoryMap[value as keyof typeof categoryMap];
    if (newClass) {
      this.categoryElement.classList.add(newClass);
    }
  }

  // изображение для Catalog/Preview.
  // если элемента нет — ничего не делаем.
  set image(value: string) {
    if (!this.imageElement) return;

    const fullImageUrl = CDN_URL + value;
    const altText = this.titleElement.textContent ?? '';
    this.setImage(this.imageElement, fullImageUrl, altText);
  }
}
