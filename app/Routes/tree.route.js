import express from 'express';
import  TreeController from '../Controllers/tree-controller.js';

const router = express.Router();

// Routes CRUD
router.get('/', TreeController.getAll);
router.get('/:id', TreeController.getById);
router.post('/', TreeController.create);
router.put('/:id', TreeController.update);
router.delete('/:id', TreeController.delete);

export default router;