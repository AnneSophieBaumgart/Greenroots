import { Router } from 'express';
import loginController from '../Controllers/login.controller.js';

const loginRouter = Router();

loginRouter.get('/', loginController.login);

export default loginRouter;