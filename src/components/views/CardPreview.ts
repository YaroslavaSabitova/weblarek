// карточка товара в модальном окне (preview)

import { Card, ICardData } from './Card';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export interface ICardPreviewData extends ICardData {
  category: string;
  image: string;
  description: string;
}

export class CardPreview extends Card<ICardPreviewData> {
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(
      '.card__button',
      this.container
    );

    // говорим презентеру, что делать с товаром
    // одно событие при клике на кнопку
    this.buttonElement.addEventListener('click', () => {
      this.events.emit('card:preview-button-click', { id: this.container.dataset.id });
    });
  }

  // описание товара
  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  // состояние кнопки
  set buttonText(value: string) {
    this.buttonElement.textContent = value;
  }

  set buttonDisabled(value: boolean) {
    this.buttonElement.disabled = value;
  }
}
