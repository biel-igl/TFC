import TeamsModel from '../database/models/TeamsModel';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import MatchesModel from '../database/models/MatchesModel';

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

  /* async findById(id: number): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { id } });
    if (!user) return null;
    return user;
  } */
}
