import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public async getAllTeams(_req: Request, res: Response):Promise<Response> {
    const serviceResponse = await this.teamsService.findAll();
    return res.status(200).json(serviceResponse.data);
  }

  public async getTeamsById(req: Request, res: Response):Promise<Response> {
    const serviceResponse = await this.teamsService.findById(Number(req.params.id));
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
