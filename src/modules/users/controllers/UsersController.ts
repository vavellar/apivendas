import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { ListAllUsersService } from '../services/ListAllUsersService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    console.log(request);
    const listAllUsers = new ListAllUsersService();

    const users = await listAllUsers.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}
