import { celebrate, Joi, Segments } from 'celebrate';

export default class ResetPasswordValidator {
  static create() {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    });
  }
}
