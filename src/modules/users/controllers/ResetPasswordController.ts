import { Request, Response } from 'express';
import { ResetPasswordService } from '../services/ResetPasswordService';

interface IRequest {
  password: string;
  token: string;
}

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body as IRequest;
    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}
