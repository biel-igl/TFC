import TeamsModel from '../database/models/TeamsModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import { ITeams } from '../Interfaces/Teams/ITeams';

export default class TeamModel implements ITeamsModel {
  private model = TeamsModel;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;
    const { teamName }:ITeams = dbData;
    return { id, teamName };
  }
}
