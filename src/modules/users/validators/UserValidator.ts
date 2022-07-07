import { celebrate, Joi, Segments } from 'celebrate';

export default class UserValidator {
  static create() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    });
  }
}
