import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UsersService from '../services/UsersService';

export default class LoginController {
  constructor(private usersService = new UsersService()) {}

  public async login(req: Request, res: Response):Promise<Response> {
    const { email, password } = req.body;
    const serviceResponse = await this.usersService.login(email, password);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  /* public async getTeamsById(req: Request, res: Response):Promise<Response> {
    const serviceResponse = await this.usersService.getTeamsById(Number(req.params.id));
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  } */
}
