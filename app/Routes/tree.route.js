import express from 'express';
import  TreeController from '../Controllers/tree-controller.js';
import { validateTree } from '../Middlewares/tree-middleware.js';

const router = express.Router();

// Routes CRUD
router.get('/', TreeController.getAll);
router.get('/:id', TreeController.getById);
router.post('/',validateTree, TreeController.create);
router.put('/:id',validateTree, TreeController.update);
router.delete('/:id', TreeController.delete);

export default router;