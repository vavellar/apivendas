import { celebrate, Joi, Segments } from 'celebrate';

export default class SendForgotEmailPasswordValidator {
  static create() {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    });
  }
}
