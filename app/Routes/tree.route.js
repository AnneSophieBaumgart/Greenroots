import express from 'express';
import { treeController } from '../Controllers/tree-controller.js';

const router = express.Router();

// Route GET pour récupérer tous les arbres
router.get('/', treeController.getAll);

export default router;