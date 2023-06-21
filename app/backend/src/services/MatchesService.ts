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

  public async finishMatch(id: number): Promise<void> {
    await this.matchesModel.update(id);
  }

  public async updateMatch(id: number, goals: number[]): Promise<void> {
    await this.matchesModel.updateMatch(id, goals);
  }
}
