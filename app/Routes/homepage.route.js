import { Router } from 'express';
import homepageController from '../Controllers/homepage.controller.js';

const homepageRouter = Router();

homepageRouter.get('/', homepageController.home);

export default homepageRouter;