import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

export class ShowOrderService {
  public async execute(id: string) {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) throw new AppError('Order not found');

    return order;
  }
}
