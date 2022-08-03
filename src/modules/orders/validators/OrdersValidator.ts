import { celebrate, Joi, Segments } from 'celebrate';

export class OrderValidator {
  public static create() {
    return celebrate({
      [Segments.BODY]: {
        customer_id: Joi.string().uuid().required(),
        products: Joi.required(),
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
}
