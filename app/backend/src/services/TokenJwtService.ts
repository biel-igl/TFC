import * as jwt from 'jsonwebtoken';
import { IUsers } from '../Interfaces/Users/IUsers';
import { Token } from '../Interfaces/Users/Token';

export default class TokenJwtService implements Token {
  private jwt = jwt;

  generate(user: IUsers): string {
    const token = this.jwt.sign({ id: user.id }, 'SECRET');
    return token;
  }

  verify(token: string, secret = 'SECRET'): any {
    const verify = this.jwt.verify(token, secret);
    return verify;
  }
}
