import { IUsers } from './IUsers';

export interface Token {
  generate(user: IUsers): string
  verify(token: string, secret: string): any
}
