import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../Models/Match.Model';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchModel(),
  ) {}

  public async getAllMatches(filter: boolean | null): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll(filter);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  /* public async getMatchesById(id: number): Promise<ServiceResponse<IMatches>> {
    const team = await this.matchesModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  } */
}
