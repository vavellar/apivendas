import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
import { ProductValidator } from '../validators';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);

productsRouter.get('/:id', ProductValidator.show(), productsController.show);

productsRouter.post('/', ProductValidator.create(), productsController.create);

productsRouter.put(
  '/:id',
  ProductValidator.update(),
  productsController.update,
);

productsRouter.delete(
  '/:id',
  ProductValidator.show(),
  productsController.delete,
);

export default productsRouter;
