import { IUsersModel } from '../Interfaces/Users/IUsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { Encrypter } from '../Interfaces/Users/Encrypter';
import { Token } from '../Interfaces/Users/Token';
import EncrypterBcryptService from './EncrypterBcryptService';
import TokenJwtService from './TokenJwtService';
import UserModel from '../Models/Users.Model';

export default class UsersService {
  constructor(
    private usersModel: IUsersModel = new UserModel(),
    private encrypter: Encrypter = new EncrypterBcryptService(),
    private token: Token = new TokenJwtService(),
  ) {}

  public async login(email: string, password: string): Promise<ServiceResponse<{ token :string }>> {
    const user = await this.usersModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const validatePasswor = await this.encrypter.compare(password, user.password);
    if (!validatePasswor) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = await this.token.generate(user);
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
