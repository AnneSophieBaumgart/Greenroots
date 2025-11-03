import { Router }   from 'express';
import treesController from '../Controllers/trees-controller.js';

const treesRouter = Router();

treesRouter.get('/', treesController.listTrees);

export default treesRouter;