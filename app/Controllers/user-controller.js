import Joi from 'joi';
import { User } from '../Models/index.js';
import CoreController from './core-controller.js';

// Schéma Joi pour valider les données d'un utilisateur
const userSchema = Joi.object({
    last_name: Joi.string().min(2).required(),
    first_name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('client', 'admin').default('client'),
});

// Contrôleur spécifique aux utilisateurs, hérite du CoreController
class UserController extends CoreController {
    constructor() {
        super(User, userSchema, 'user'); // On passe le modèle, le schéma et le dossier des Views
    }
}

export default new UserController();
