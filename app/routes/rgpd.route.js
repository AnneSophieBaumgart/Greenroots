import { Router } from 'express';
import rgpdController from '../controllers/rgpd-controllerjs';

const rgpdRouter = Router();

rgpdRouter.get('/', rgpdController.rgpd);

export default rgpdRouter;