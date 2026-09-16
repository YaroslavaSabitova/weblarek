// форма первого шага оформления (способ оплаты + адрес)

import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { TPayment } from '../../types';

export class OrderForm extends Component<{}> {
  protected formElement: HTMLFormElement;
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.formElement = container as HTMLFormElement;

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
    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container
    );
    this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);

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

    // отправка формы (submit)
    this.formElement.addEventListener('submit', event => {
      event.preventDefault();
      this.events.emit('order:submit');
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

  // сообщение об ошибке
  set errors(value: string) {
    this.errorsElement.textContent = value;
  }

  // кнопка «Далее»
  set disabled(value: boolean) {
    this.submitButton.disabled = value;
  }
}
