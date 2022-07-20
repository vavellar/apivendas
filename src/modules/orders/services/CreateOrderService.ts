import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await this.checkIfCustomerExists(
      customersRepository,
      customer_id,
    );

    const productsExists = await this.checkProducts(
      productsRepository,
      products,
    );

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(p => p.id === product.id)[0].price,
      name: productsExists.filter(p => p.id === product.id)[0].name,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        productsExists.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }

  private async checkIfCustomerExists(
    customersRepository: CustomersRepository,
    customer_id: string,
  ) {
    const customerExists = await customersRepository.findById(customer_id);
    if (!customerExists)
      throw new AppError('Could not find any customer with this id');

    return customerExists;
  }

  private async checkProducts(
    productsRepository: ProductRepository,
    products: IProduct[],
  ) {
    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length)
      throw new AppError('Could not find any products with this ids');

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length)
      throw new AppError(
        `Could not find any product ${checkInexistentProducts[0].id}`,
      );

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length)
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );

    return existsProducts;
  }
}
