import express from 'express';
import { getPanier, addToPanier, removeFromPanier } from '../Controllers/panier.controller.js';
import { authenticateToken } from '../Middlewares/auth-middleware.js';

const router = express.Router();

router.get('/', authenticateToken, getPanier);
router.post('/add', authenticateToken, addToPanier);
router.post('/remove', authenticateToken, removeFromPanier);

export default router;