// форма 2го шага оформления (email + телефон)

import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export class ContactsForm extends Component<{}> {
  protected formElement: HTMLFormElement;
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.formElement = container as HTMLFormElement;

    this.emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container
    );
    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container
    );
    this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);

    // ввод email
    this.emailInput.addEventListener('input', () => {
      this.events.emit('contacts.email:change', { value: this.emailInput.value });
    });

    // ввод телефона
    this.phoneInput.addEventListener('input', () => {
      this.events.emit('contacts.phone:change', { value: this.phoneInput.value });
    });

    // отправка формы (submit)
    this.formElement.addEventListener('submit', event => {
      event.preventDefault();
      this.events.emit('contacts:submit');
    });
  }

  // установка email
  set email(value: string) {
    this.emailInput.value = value;
  }

  // установка телефона
  set phone(value: string) {
    this.phoneInput.value = value;
  }

  // сообщение об ошибке
  set errors(value: string) {
    this.errorsElement.textContent = value;
  }

  // кнопка «Оплатить»
  set disabled(value: boolean) {
    this.submitButton.disabled = value;
  }
}
