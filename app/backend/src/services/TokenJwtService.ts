import * as jwt from 'jsonwebtoken';
import { IUsers } from '../Interfaces/Users/IUsers';
import { Token } from '../Interfaces/Users/Token';

const secrets = process.env.JWT_SECRET || 'jwt_secret';

export default class TokenJwtService implements Token {
  private jwt = jwt;

  generate(user: IUsers): string {
    const token = this.jwt.sign({ id: user.id }, secrets);
    return token;
  }

  verify(token: string): jwt.JwtPayload {
    const verify = this.jwt.verify(token, secrets);
    return verify as jwt.JwtPayload;
  }
}
