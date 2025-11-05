import express from 'express';
import UserController from '../Controllers/user-controller.js';
import { authenticateToken } from '../Middlewares/auth-middleware.js';
import { isAdmin } from '../Middlewares/isAdmin-middleware.js';

const router = express.Router();

// CRUD basique
router.get('/', UserController.getAll);
router.get('/create', authenticateToken, isAdmin, UserController.create);
router.post('/create', authenticateToken, isAdmin, UserController.create);
router.get('/:id', UserController.getById);
router.get('/:id/edit', authenticateToken, isAdmin, UserController.update);
router.post('/:id/edit', authenticateToken, isAdmin, UserController.update);
router.post('/:id/delete', authenticateToken, isAdmin, UserController.delete);

export default router;