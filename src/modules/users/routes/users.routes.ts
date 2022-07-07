import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import UserValidator from '../validators/UserValidator';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);

usersRouter.post('/', UserValidator.create(), usersController.create);

export default usersRouter;
