export interface ILeaderboard {
  name: string,
  totalPoints:number,
  totalGames: number,
  totalVictories:number,
  totalDraws:number,
  totalLosses:number,
  goalsFavor:number,
  goalsOwn:number,
}

export interface ILeaderboardBE extends ILeaderboard{
  goalsBalance: number,
  efficiency: string,
}

export interface IResults {
  home: ILeaderboard,
  away: ILeaderboard,
}
