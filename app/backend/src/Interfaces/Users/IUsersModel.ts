import { IUsers } from './IUsers';

export interface IUsersModel {
  findByEmail(email: string): Promise<IUsers | null>,
}
