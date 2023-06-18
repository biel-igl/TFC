import UsersModel from '../database/models/UsersModel';
import { IUsers } from '../Interfaces/Users/IUsers';
import { IUsersModel } from '../Interfaces/Users/IUsersModel';

export default class UserModel implements IUsersModel {
  private model = UsersModel;
  async findByEmail(email: string): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }
}
