import { Router } from 'express';
import MatchesController from '../controller/MatchesController';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));
export default matchesRouter;
