import { celebrate, Joi, Segments } from 'celebrate';

export default class ResetPasswordValidator {
  static create() {
    return celebrate({
      [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string()
          .required()
          .valid(Joi.ref('password')),
      },
    });
  }
}
