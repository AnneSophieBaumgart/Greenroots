import { Router } from 'express';
import contactController from '../Controllers/contact.controller.js';

const contactRouter = Router();

contactRouter.get('/', contactController.contact);

export default contactRouter;