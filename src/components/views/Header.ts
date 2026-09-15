import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export interface IHeaderData {
  counter: number; // количество товаров в корзине (принимает от Presenter)
}

// шапка с корзиной
export class Header extends Component<IHeaderData> {
  protected counterElement: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.counterElement = ensureElement<HTMLElement>(
      '.header__basket-counter',
      this.container
    );
    this.basketButton = ensureElement<HTMLButtonElement>(
      '.header__basket',
      this.container
    );

    this.basketButton.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  // счётчик товаров.
  // Presenter вызывает: `header.counter = cart.getCount();`

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}
