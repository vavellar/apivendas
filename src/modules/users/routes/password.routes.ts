import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import LoginValidator from '../validators/LoginValidator';
import SendForgotEmailPasswordValidator from '../validators/SendForgotEmailPasswordValidator';
import ResetPasswordValidator from '../validators/SendForgotEmailPasswordValidator';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
  '/forgot',
  SendForgotEmailPasswordValidator.create(),
  forgotPasswordController.create,
);

// passwordRouter.post(
//   '/reset',
//   ResetPasswordValidator.create()
//   forgotPasswordController.create,
// );

export default passwordRouter;
