import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EthrealMail';
import HandlebarsMailTemplate from '@config/mail/HandlebarsMailTemplate';

interface IRequest {
  email: string;
}

export class SendForgetPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exists.');

    const { token } = await userTokensRepository.generate(user.id);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email,
      },
      subject: 'Recuperação de senha',
      templateData: {
        template: `Olá {{ name }}: {{token}}`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
