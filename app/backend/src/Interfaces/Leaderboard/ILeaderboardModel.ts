import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardModel {
  getTableWihtFilter(filter: string): Promise<ILeaderboard[]>
}
