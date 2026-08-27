import { IApi, IOrderRequest, IProductsResponse, IOrderResponse } from '../../types';

export class ApiService {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  // делает get запрос на эндпоинт /product/ и возвращает объект, полученный от сервера, в котором находится массив товаров
  getProducts(): Promise<IProductsResponse> {
    return this.api.get<IProductsResponse>('/product/');
  }

  // делает post запрос на эндпоинт /order/ и передаёт в него данные о заказе (список товаров и информация о покупателе), а возвращает объект, подтверждающий покупку на определенную сумму
  sendOrder(orderData: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>('/order/', orderData);
  }
}
