import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import LoginValidator from '../validators/LoginValidator';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', LoginValidator.create(), sessionsController.create);

export default sessionsRouter;
