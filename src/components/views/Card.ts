import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

// общие данные для всех карточек
export interface ICardData {
  title: string;
  price: number | null;
}

// базовый компонент карточки товара
export class Card<T extends ICardData> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  // если цена null - бесценно
  set price(value: number | null) {
    this.priceElement.textContent = value === null ? 'Бесценно' : `${value} синапсов`;
  }
}
