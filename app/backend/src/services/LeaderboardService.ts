import LeaderboardModel from '../Models/Leaderboard.Model';
import { ILeaderboardModel } from '../Interfaces/Leaderboard/ILeaderboardModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboardModel = new LeaderboardModel(),
  ) {}

  public async tableWihtFilter(filter: string): Promise<ServiceResponse<ILeaderboard[] | string>> {
    const table = await this.leaderboardModel.getTableWihtFilter(filter);
    return { status: 'SUCCESSFUL', data: table };
  }
}
