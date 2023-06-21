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

  public async finishMatch(req: Request, res: Response):Promise<Response> {
    const { id } = req.params;
    await this.matchesService.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response):Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatch(Number(id), [homeTeamGoals, awayTeamGoals]);
    return res.status(200).json({ message: 'GOOOOOLLL!!!!' });
  }
}
