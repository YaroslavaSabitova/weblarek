import { IBuyer } from '../../types';

export class Buyer {
  private payment: TPayment = ''; // вид/способ оплаты (card/cash - строки)
  private email: string = ''; // электронный адрес почты
  private phone: string = ''; // телефон (строка)
  private address: string = ''; // адрес (строка с пробелами)

  // сохранение данных в модели
  setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) {
      this.payment = data.payment;
    }

    if (data.email !== undefined) {
      this.email = data.email;
    }

    if (data.phone !== undefined) {
      this.phone = data.phone;
    }

    if (data.address !== undefined) {
      this.address = data.address;
    }
  }

  // получение всех данных покупателя
  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  // очистка данных покупателя
  clear(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  // валидация данных покупателя
  // шаг 1 - способ оплаты и адрес

  validateStepOne(): {
    isValid: boolean;
    errors: { payment?: string; address?: string };
  } {
    const errors: { payment?: string; address?: string } = {};

    if (!this.payment || this.payment === '') {
      errors.payment = 'Необходимо выбрать способ оплаты';
    }

    if (!this.address || this.address.trim() === '') {
      errors.address = 'Необходимо указать адрес';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors,
    };
  }

  // валидация данных покупателя
  // шаг 2 - email и телефон

  validateStepTwo(): { isValid: boolean; errors: { email?: string; phone?: string } } {
    const errors: { email?: string; phone?: string } = {};

    if (!this.email || this.email.trim() === '') {
      errors.email = 'Необходимо ввести email';
    }

    if (!this.phone || this.phone.trim() === '') {
      errors.phone = 'Необходимо ввести номер телефона';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors,
    };
  }
}
