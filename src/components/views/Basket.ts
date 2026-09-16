// компонент корзина в модальном окне.

import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export class Basket extends Component<{}> {
  protected listElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected orderButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
    this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);
    this.orderButton = ensureElement<HTMLButtonElement>(
      '.basket__button',
      this.container
    );

    // клик по кнопке «Оформить»
    this.orderButton.addEventListener('click', () => {
      this.events.emit('order:open');
    });
  }

  // список товаров в корзине
  set items(value: HTMLElement[]) {
    this.listElement.replaceChildren(...value);
  }

  // общая стоимость товаров
  set total(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }

  // кнопка «Оформить»
  // true  - кнопка неактивна (корзина пуста)
  // false - кнопка активна (есть товары)
  set disabled(value: boolean) {
    this.orderButton.disabled = value;
  }
}
