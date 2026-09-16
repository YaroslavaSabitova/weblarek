// экран успешного заказа

import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export class Success extends Component<{}> {
  protected descriptionElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>(
      '.order-success__description',
      this.container
    );
    this.closeButton = ensureElement<HTMLButtonElement>(
      '.order-success__close',
      this.container
    );

    // закрываем модалку
    this.closeButton.addEventListener('click', () => {
      this.events.emit('success:close');
    });
  }

  // Списано 0 синапсов — заменяем 0 на итоговую сумму
  set total(value: number) {
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }
}
