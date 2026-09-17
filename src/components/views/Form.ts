// базовый класс для форм

import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export abstract class Form<T> extends Component<T> {
  protected formElement: HTMLFormElement;
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
    protected submitEvent: string
  ) {
    super(container);

    this.formElement = container as HTMLFormElement;
    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container
    );
    this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);

    // общий обработчик submit — эмитит событие, переданное в конструктор
    this.formElement.addEventListener('submit', event => {
      event.preventDefault();
      this.events.emit(this.submitEvent);
    });
  }

  //  сообщение об ошибке
  set errors(value: string) {
    this.errorsElement.textContent = value;
  }

  // кнопка
  set disabled(value: boolean) {
    this.submitButton.disabled = value;
  }
}
