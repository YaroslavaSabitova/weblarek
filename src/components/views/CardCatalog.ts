// карточка для галереи на главной

import { Card, ICardData } from './Card';
import { IEvents } from '../base/Events';

export interface ICardCatalogData extends ICardData {
  category: string;
  image: string;
}

export class CardCatalog extends Card<ICardCatalogData> {
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    // передаём в презентер id товара из data-атрибута
    this.container.addEventListener('click', () => {
      this.events.emit('card:select', { id: this.container.dataset.id });
    });
  }
}
