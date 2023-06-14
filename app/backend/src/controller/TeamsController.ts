import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public async getAllTeams(_req: Request, res: Response):Promise<Response> {
    const serviceResponse = await this.teamsService.getAllTeams();
    return res.status(200).json(serviceResponse.data);
  }

  public async getTeamsById(req: Request, res: Response):Promise<Response> {
    const serviceResponse = await this.teamsService.getTeamsById(Number(req.params.id));
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
