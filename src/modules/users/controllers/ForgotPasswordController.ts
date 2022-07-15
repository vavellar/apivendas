import { Request, Response } from 'express';
import { SendForgetPasswordEmailService } from '../services/SendForgotPasswordEmailService';

interface IRequest {
  email: string;
}

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body as IRequest;
    const sendForgotPasswordEmail = new SendForgetPasswordEmailService();

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
