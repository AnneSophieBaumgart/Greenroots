import express from 'express';
import TreeController from '../Controllers/tree-controller.js';
import { authenticateToken } from '../Middlewares/auth-middleware.js';
import { isAdmin } from '../Middlewares/isAdmin-middleware.js';

const router = express.Router();

// CRUD basique
router.get('/', TreeController.getAll);
router.get('/create', authenticateToken, isAdmin, TreeController.create);
router.post('/create', authenticateToken, isAdmin, TreeController.create);
router.get('/:id', TreeController.getById);
router.get('/:id/edit', authenticateToken, isAdmin, TreeController.update);
router.post('/:id/edit', authenticateToken, isAdmin, TreeController.update);

// Suppression via DELETE (JS fetch)
router.post('/:id/delete', authenticateToken, isAdmin, TreeController.delete);

export default router;
