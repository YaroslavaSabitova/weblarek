// модальное окно

import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export class Modal extends Component<{}> {
  protected contentElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

    // закрыть модалку
    this.closeButton.addEventListener('click', () => {
      this.close();
    });

    // клик по оверлею (вне модального окна) — закрыть.
    this.container.addEventListener('click', event => {
      if (event.target === this.container) {
        this.close();
      }
    });
  }

  // открыть модальное окно
  open(): void {
    this.container.classList.add('modal_active');
  }

  // закрыть модальное окно и очистить содержимое
  close(): void {
    this.container.classList.remove('modal_active');
    this.contentElement.replaceChildren();
  }

  // установить содержимое модального окна
  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }
}
