import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UsersService from '../services/UsersService';

export default class LoginController {
  constructor(private usersService = new UsersService()) {}

  public async login(req: Request, res: Response):Promise<Response> {
    const { email, password } = req.body;
    const serviceResponse = await this.usersService.login(email, password);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getRole(req: Request, res: Response):Promise<Response> {
    const { id } = req.body.token;
    const serviceResponse = await this.usersService.getRole(id);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
