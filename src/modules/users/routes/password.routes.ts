import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import SendForgotEmailPasswordValidator from '../validators/SendForgotEmailPasswordValidator';
import ResetPasswordValidator from '../validators/ResetPasswordValidator';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  SendForgotEmailPasswordValidator.create(),
  forgotPasswordController.create,
);

passwordRouter.post(
  '/reset',
  ResetPasswordValidator.create(),
  resetPasswordController.create,
);

export default passwordRouter;
