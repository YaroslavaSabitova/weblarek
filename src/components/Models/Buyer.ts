import { IBuyer, TPayment } from '../../types';

export class Buyer {
  private payment: TPayment | '' = ''; // вид/способ оплаты (card/cash - строки)
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
  validate(): {
    isValid: boolean;
    errors: {
      payment: string;
      address: string;
      email: string;
      phone: string;
    };
  } {
    const errors: {
      payment: string;
      address: string;
      email: string;
      phone: string;
    } = {
      payment: '',
      address: '',
      email: '',
      phone: '',
    };

    if (!this.payment || this.payment === null) {
      errors.payment = 'Необходимо выбрать способ оплаты';
    }

    if (!this.address || this.address.trim() === '') {
      errors.address = 'Необходимо указать адрес';
    }

    if (!this.email || this.email.trim() === '') {
      errors.email = 'Необходимо ввести email';
    }

    if (!this.phone || this.phone.trim() === '') {
      errors.phone = 'Необходимо ввести номер телефона';
    }

    return {
      isValid: !errors.payment && !errors.address && !errors.email && !errors.phone,
      errors: errors,
    };
  }
}
