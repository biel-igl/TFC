import { Router } from 'express';
import LoginController from '../controller/LoginController';
import ValidateLogin from '../Middlewares/ValidateLogin';
import ValidateToken from '../Middlewares/ValidateToken';

const login = new LoginController();
const loginRouter = Router();

loginRouter.get('/role', ValidateToken.Token, (req, res) => login.getRole(req, res));
loginRouter.post('/', ValidateLogin.Login, (req, res) => login.login(req, res));
export default loginRouter;
