import { NextFunction, Request, Response } from 'express';

export default class ValidateMatch {
  static async NewMatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}
