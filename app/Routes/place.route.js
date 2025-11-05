import express from 'express';
import PlaceController from '../Controllers/place-controller.js';
import { authenticateToken } from '../Middlewares/auth-middleware.js';
import { isAdmin } from '../Middlewares/isAdmin-middleware.js';

const router = express.Router();

// CRUD basique
router.get('/', PlaceController.getAll);
router.get('/create', authenticateToken, isAdmin, PlaceController.create);
router.post('/create', authenticateToken, isAdmin, PlaceController.create);
router.get('/:id', PlaceController.getById);
router.get('/:id/edit', authenticateToken, isAdmin, PlaceController.update);
router.post('/:id/edit', authenticateToken, isAdmin, PlaceController.update);
router.post('/:id/delete', authenticateToken, isAdmin, PlaceController.delete);

export default router;