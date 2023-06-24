import { Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboard = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get('/:homeOrAway', (req, res) => leaderboard.tableWihtFilter(req, res));

export default leaderboardRouter;
