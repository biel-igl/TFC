import { ITeams } from '../Teams/ITeams';

export interface IMatches {
  id: number,
  homeTeamId:number,
  homeTeamGoals: number,
  awayTeamId:number,
  awayTeamGoals:number,
  inProgress: boolean,
}

export interface IHomeAndAwayTeam {
  dataValues: ITeams,
}
