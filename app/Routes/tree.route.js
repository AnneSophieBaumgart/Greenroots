import express from 'express';
import TreeController from '../Controllers/tree-controller.js';

const router = express.Router();

// CRUD basique
router.get('/', TreeController.getAll);
router.get('/create', TreeController.create);
router.post('/create', TreeController.create);
router.get('/:id', TreeController.getById);
router.get('/:id/edit', TreeController.update);
router.post('/:id/edit', TreeController.update);

// Suppression via DELETE (JS fetch)
router.delete('/:id', TreeController.delete);

export default router;
