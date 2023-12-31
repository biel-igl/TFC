import { IUsers } from './IUsers';

export interface IUsersModel {
  findByEmail(email: string): Promise<IUsers | null>,
  findById(id: number): Promise<IUsers | null>,
}
