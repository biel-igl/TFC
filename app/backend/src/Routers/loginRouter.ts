import { Router } from 'express';
import LoginController from '../controller/LoginController';

const login = new LoginController();
const loginRouter = Router();

loginRouter.post('/', (req, res) => login.login(req, res));
/* loginRouter.get('/role', (req, res) => login.getTeamsById(req, res)); */
export default loginRouter;
