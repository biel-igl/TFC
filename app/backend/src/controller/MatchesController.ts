import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/MatchesService';

export default class MetchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAllMatches(_req: Request, res: Response):Promise<Response> {
    const serviceResponse = await this.matchesService.getAllMatches();
    return res.status(200).json(serviceResponse.data);
  }

  public async getMatchesById(req: Request, res: Response):Promise<Response> {
    const serviceResponse = await this.matchesService.getMatchesById(Number(req.params.id));
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
