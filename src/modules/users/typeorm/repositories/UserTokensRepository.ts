import { EntityRepository, Repository } from 'typeorm';
import UserTokens from '../entities/UserTokens';

@EntityRepository(UserTokens)
class UserTokensRepository extends Repository<UserTokens> {
  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserTokens | undefined> {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
