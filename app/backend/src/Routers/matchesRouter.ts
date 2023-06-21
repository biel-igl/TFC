import { Router } from 'express';
import MatchesController from '../controller/MatchesController';
import ValidateToken from '../Middlewares/ValidateToken';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));
matchesRouter.patch(
  '/:id/finish',
  ValidateToken.Token,
  (req, res) => matchesController.finishMatch(req, res),
);

matchesRouter.patch(
  '/:id',
  ValidateToken.Token,
  (req, res) => matchesController.updateMatch(req, res),
);
export default matchesRouter;
