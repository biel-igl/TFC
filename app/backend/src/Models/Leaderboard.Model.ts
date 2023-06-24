import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { ILeaderboard, ILeaderboardBE, IResults } from '../Interfaces/Leaderboard/ILeaderboard';
import { ILeaderboardModel } from '../Interfaces/Leaderboard/ILeaderboardModel';

export default class LeaderboardModel implements ILeaderboardModel {
  static modelMatches = MatchesModel;
  static modelTeams = TeamsModel;
  private modelTeams = TeamsModel;

  static scores(teamA: number, teamB: number): number {
    if (teamA > teamB) return 3;
    if (teamA < teamB) return 0;
    return 1;
  }

  static matchStatus(teamA: number, teamB: number, name: string): ILeaderboard {
    return ({
      name,
      totalPoints: LeaderboardModel.scores(teamA, teamB),
      totalGames: 1,
      totalVictories: teamA > teamB ? 1 : 0,
      totalDraws: teamA === teamB ? 1 : 0,
      totalLosses: teamA < teamB ? 1 : 0,
      goalsFavor: teamA,
      goalsOwn: teamB,
    });
  }

  static async listAll(): Promise<IResults[]> {
    const matches = await this.modelMatches.findAll(
      { include: [{ model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] }],
      where: { inProgress: false } },
    );
    const points = matches.map((match) => {
      const { homeTeamGoals, awayTeamGoals } = match;
      const nameH = match.homeTeam?.dataValues.teamName || '';
      const nameA = match.awayTeam?.dataValues.teamName || '';
      const home = LeaderboardModel.matchStatus(homeTeamGoals, awayTeamGoals, nameH);
      const away = LeaderboardModel.matchStatus(awayTeamGoals, homeTeamGoals, nameA);
      return ({ home, away });
    });
    return points;
  }

  static async leaderboardWihtFilterHome(): Promise<ILeaderboard[][]> {
    const teams = await this.modelTeams.findAll();
    const matches = await LeaderboardModel.listAll();
    const result = teams.map((team) => {
      const filter = matches.filter(({ home }) => home.name === team.teamName);
      return filter.map((cada) => cada.home);
    });
    return result;
  }

  static async leaderboardWihtFilterAway(): Promise<(ILeaderboard)[][]> {
    const teams = await this.modelTeams.findAll();
    const matches = await LeaderboardModel.listAll();
    const result = teams.map((team) => {
      const filter = matches.filter(({ away }) => away.name === team.teamName);
      return filter.map((cada) => cada.away);
    });
    return result;
  }

  static Results(dataValues: ILeaderboard[]): ILeaderboard {
    const data = dataValues.reduce((acc: ILeaderboard, cur: ILeaderboard): ILeaderboard => ({
      ...acc,
      name: cur.name,
      totalPoints: acc.totalPoints + cur.totalPoints,
      totalGames: acc.totalGames + cur.totalGames,
      totalVictories: acc.totalVictories + cur.totalVictories,
      totalDraws: acc.totalDraws + cur.totalDraws,
      totalLosses: acc.totalLosses + cur.totalLosses,
      goalsFavor: acc.goalsFavor + cur.goalsFavor,
      goalsOwn: acc.goalsOwn + cur.goalsOwn,
    }));
    return data;
  }

  static AddProperty(table: ILeaderboard[]): ILeaderboardBE[] {
    return table.map((cada) => {
      const efficiency = ((cada.totalPoints / (cada.totalGames * 3)) * 100);
      const { ...dateValues } = cada;
      return {
        ...dateValues,
        goalsBalance: cada.goalsFavor - cada.goalsOwn,
        efficiency: efficiency.toFixed(2),
      };
    });
  }

  static TakeOrden(table: ILeaderboardBE[]): ILeaderboardBE[] {
    function goalsf(a:ILeaderboardBE, b:ILeaderboardBE) {
      return b.goalsFavor - a.goalsFavor;
    }

    function goalsB(a:ILeaderboardBE, b:ILeaderboardBE) {
      return (b.goalsBalance === a.goalsBalance ? goalsf(a, b) : b.goalsBalance - a.goalsBalance);
    }

    function victories(a:ILeaderboardBE, b:ILeaderboardBE) {
      return (b.totalVictories === a.totalVictories
        ? goalsB(a, b) : b.totalVictories - a.totalVictories);
    }
    const points = table.sort((a, b) => (b.totalPoints === a.totalPoints
      ? victories(a, b) : b.totalPoints - a.totalPoints));
    return points;
  }

  async getTableWihtFilter(filter: string): Promise<ILeaderboard []> {
    const match = filter === 'home'
      ? await LeaderboardModel.leaderboardWihtFilterHome()
      : await LeaderboardModel.leaderboardWihtFilterAway();
    const teams = await this.modelTeams.findAll();
    const table = teams.map(({ teamName }) => {
      const filterByName = match.filter((cada) => cada.find((one) => one?.name === teamName))[0];
      return LeaderboardModel.Results(filterByName);
    });
    const result = LeaderboardModel.AddProperty(table);
    return LeaderboardModel.TakeOrden(result);
  }
}
