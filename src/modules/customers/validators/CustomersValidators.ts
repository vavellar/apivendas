import { celebrate, Joi, Segments } from 'celebrate';

export class CustomersValidators {
  public static create() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      },
    });
  }

  public static show() {
    return celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    });
  }

  public static update() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      },
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    });
  }

  public static delete() {
    return celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    });
  }
}
