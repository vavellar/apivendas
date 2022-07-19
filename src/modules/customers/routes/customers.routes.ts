import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import CustomersController from '../controllers/CustomersController';
import { CustomersValidators } from '../validators/CustomersValidators';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticated);

customersRouter.get('/', customersController.index);

customersRouter.get(
  '/:id',
  CustomersValidators.show(),
  customersController.show,
);

customersRouter.post(
  '/',
  CustomersValidators.create(),
  customersController.create,
);

customersRouter.put(
  '/:id',
  CustomersValidators.update(),
  customersController.update,
);

customersRouter.delete(
  '/:id',
  CustomersValidators.delete(),
  customersController.delete,
);

export default customersRouter;
