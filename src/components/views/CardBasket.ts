//  карточка товара в корзине

import { Card, ICardData } from './Card';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export interface ICardBasketData extends ICardData {
  id: string;
  index: number;
}

export class CardBasket extends Card<ICardBasketData> {
  protected indexElement: HTMLElement;
  protected deleteButton: HTMLButtonElement;
  protected cardId: string = '';

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.deleteButton = ensureElement<HTMLButtonElement>(
      '.basket__item-delete',
      this.container
    );

    // говорим презентеру, какой товар убрать из корзины
    this.deleteButton.addEventListener('click', () => {
      this.events.emit('cart:remove-item', { id: this.cardId });
    });
  }

  set id(value: string) {
    this.cardId = value;
  }

  // порядковый номер товара в корзине
  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}
