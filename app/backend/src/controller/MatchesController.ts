import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MetchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAllMatches(req: Request, res: Response):Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress) {
      const serviceResponse = await this.matchesService.getAllMatches(inProgress === 'true');
      return res.status(200).json(serviceResponse.data);
    }
    const serviceResponse = await this.matchesService.getAllMatches(null);
    return res.status(200).json(serviceResponse.data);
  }

  /* public async getMatchesById(req: Request, res: Response):Promise<Response> {
    const serviceResponse = await this.matchesService.getMatchesById(Number(req.params.id));
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  } */
}
