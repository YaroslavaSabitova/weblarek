// форма 2го шага оформления (email + телефон)

import { Form } from './Form';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export class ContactsForm extends Form<{}> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container, events, 'contacts:submit');

    this.emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container
    );

    // ввод email
    this.emailInput.addEventListener('input', () => {
      this.events.emit('contacts.email:change', { value: this.emailInput.value });
    });

    // ввод телефона
    this.phoneInput.addEventListener('input', () => {
      this.events.emit('contacts.phone:change', { value: this.phoneInput.value });
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
}
