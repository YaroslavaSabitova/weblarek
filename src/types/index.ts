export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

//  данные по одному товару
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// данные по оплате
export type TPayment = 'card' | 'cash' | '';

// данные покупателя
export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

// тип для объекта, отправляемого на сервер при оформлении заказа
// IOrderRequest к полям IBuyer добавляет поля
export interface IOrderRequest extends IBuyer {
  items: string[];
  total: number;
}

// типы для объектов, принимаемых с сервера в разных запросах
// ответ сервера при получении товаров
export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

// ответ сервера при создании заказа
export interface IOrderResponse {
  id: string;
  total: number;
}
