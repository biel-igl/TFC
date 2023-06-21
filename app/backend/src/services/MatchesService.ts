import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../Models/Match.Model';
import { NewEntity } from '../Interfaces';

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

  public async createNewMatch(match: NewEntity<IMatches>): Promise<ServiceResponse<IMatches>> {
    const newMatch = await this.matchesModel.createNewMatch(match);
    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
