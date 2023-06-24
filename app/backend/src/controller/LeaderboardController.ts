import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async tableWihtFilter(req: Request, res: Response): Promise<Response> {
    const { homeOrAway } = req.params;
    const serviceResponse = await this.leaderboardService.tableWihtFilter(homeOrAway);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
