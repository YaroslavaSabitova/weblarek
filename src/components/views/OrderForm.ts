// форма первого шага оформления (способ оплаты + адрес)

import { Form } from './Form';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { TPayment } from '../../types';

export class OrderForm extends Form<{}> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container, events, 'order:submit');

    this.cardButton = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      this.container
    );
    this.cashButton = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      this.container
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container
    );

    // клик по кнопке «Онлайн» (card)
    this.cardButton.addEventListener('click', () => {
      this.events.emit('order.payment:change', { value: 'card' });
    });

    // клик по кнопке «При получении» (cash)
    this.cashButton.addEventListener('click', () => {
      this.events.emit('order.payment:change', { value: 'cash' });
    });

    // ввод в поле адреса
    this.addressInput.addEventListener('input', () => {
      this.events.emit('order.address:change', { value: this.addressInput.value });
    });
  }

  // выбранный способа оплаты
  set payment(value: TPayment | '') {
    // сброс активного состояния обеих кнопок
    this.cardButton.classList.remove('button_alt-active');
    this.cardButton.classList.add('button_alt');
    this.cashButton.classList.remove('button_alt-active');
    this.cashButton.classList.add('button_alt');

    // подсвечиваем нужную кнопку
    if (value === 'card') {
      this.cardButton.classList.remove('button_alt');
      this.cardButton.classList.add('button_alt-active');
    } else if (value === 'cash') {
      this.cashButton.classList.remove('button_alt');
      this.cashButton.classList.add('button_alt-active');
    }
  }

  // значение поля адреса
  set address(value: string) {
    this.addressInput.value = value;
  }
}
