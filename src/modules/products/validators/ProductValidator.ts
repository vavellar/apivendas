import { celebrate, Joi, Segments } from 'celebrate';

export class ProductValidator {
  public static create() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
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
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    });
  }
}
