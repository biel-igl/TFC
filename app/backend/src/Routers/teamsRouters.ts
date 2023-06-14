import { Router } from 'express';
import TeamsController from '../controller/TeamsController';

const teamsRouter = Router();
const teamController = new TeamsController();

teamsRouter.get('/', (req, res) => teamController.getAllTeams(req, res));
teamsRouter.get('/:id', (req, res) => teamController.getTeamsById(req, res));
export default teamsRouter;
