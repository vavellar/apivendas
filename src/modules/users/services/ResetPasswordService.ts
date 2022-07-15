import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import UserToken from '../typeorm/entities/UserTokens';

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) throw new AppError('User Token does not exists.');

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User does not exists.');

    const tokenExpired = this.checkIfTokenIsValid(userToken);

    if (tokenExpired) throw new AppError('Token expired');

    user.password = await hash(password, 8);
  }

  private checkIfTokenIsValid(userToken: UserToken) {
    const tokenCreadtAt = userToken.created_at;
    const hoursTokenIsValid = 2;
    const compareDate = addHours(tokenCreadtAt, hoursTokenIsValid);

    return isAfter(Date.now(), compareDate);
  }
}
