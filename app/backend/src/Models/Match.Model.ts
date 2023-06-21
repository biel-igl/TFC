import TeamsModel from '../database/models/TeamsModel';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import MatchesModel from '../database/models/MatchesModel';
import { NewEntity } from '../Interfaces';

export default class MatchModel implements IMatchesModel {
  private model = MatchesModel;

  async findAll(filterProgres: boolean | null): Promise<IMatches[]> {
    const filter = filterProgres === null ? {} : { inProgress: filterProgres };
    const matches = await this.model.findAll(
      { include: [{ model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] }],
      where: filter },
    );
    const result = matches.map((match) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: { teamName: match.homeTeam?.dataValues.teamName },
      awayTeam: { teamName: match.awayTeam?.dataValues.teamName },
    }));
    return result;
  }

  async update(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: number, goals: number[]): Promise<void> {
    await this.model.update({ homeTeamGoals: goals[0],
      awayTeamGoals: goals[1] }, { where: { id } });
  }

  async createNewMatch(data: NewEntity<IMatches>): Promise<IMatches | null> {
    const home = await TeamsModel.findByPk(data.homeTeamId);
    const away = await TeamsModel.findByPk(data.awayTeamId);
    if (!home || !away) return null;
    const dbData = await this.model.create({ ...data, inProgress: true });
    const {
      id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress,
    }:IMatches = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
