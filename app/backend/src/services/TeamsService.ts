import { NewEntity } from '../Interfaces';
import { ITeams } from '../Interfaces/Teams/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import TeamModel from '../Models/TeamModel';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamModel(),
  ) {}

  public async createTeam(team:NewEntity<ITeams>): Promise<ServiceResponse<ITeams>> {
    const newTeam = await this.teamsModel.create(team);
    return { status: 'SUCCESSFUL', data: newTeam };
  }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamsById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
