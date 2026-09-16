// карточка товара в модальном окне (preview)

import { Card, ICardData } from './Card';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { CDN_URL, categoryMap } from '../../utils/constants';

// кнопки на карточке
// купить (в корзину) - удалить из корзинын - недоступно (у товара нет цены)
export type ButtonState = 'add' | 'remove' | 'unavailable';

export interface ICardPreviewData extends ICardData {
  id: string;
  category: string;
  image: string;
  description: string;
}

export class CardPreview extends Card<ICardPreviewData> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  protected cardId: string = '';
  protected currentState: ButtonState = 'add';

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(
      '.card__button',
      this.container
    );

    // говорим презентеру, что делать с товаром
    this.buttonElement.addEventListener('click', () => {
      if (this.currentState === 'add') {
        this.events.emit('card:add-to-cart', { id: this.cardId });
      } else if (this.currentState === 'remove') {
        this.events.emit('card:remove-from-cart', { id: this.cardId });
      }
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

  // описание товара
  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  // состояние кнопки
  set buttonState(value: ButtonState) {
    this.currentState = value;

    if (value === 'add') {
      this.buttonElement.textContent = 'Купить';
      this.buttonElement.disabled = false;
    } else if (value === 'remove') {
      this.buttonElement.textContent = 'Удалить из корзины';
      this.buttonElement.disabled = false;
    } else {
      this.buttonElement.textContent = 'Недоступно';
      this.buttonElement.disabled = true;
    }
  }
}
