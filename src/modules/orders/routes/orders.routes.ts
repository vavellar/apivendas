import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import { OrderValidator } from '../validators/OrdersValidator';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get('/:id', OrderValidator.show(), ordersController.show);

ordersRouter.post('/', OrderValidator.create(), ordersController.create);

export default ordersRouter;
