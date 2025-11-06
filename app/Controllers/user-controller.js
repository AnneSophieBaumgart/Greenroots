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

// Schéma pour la mise à jour => on ne touche PAS au mot de passe
const userUpdateSchema = Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).optional(), // ici password optionnel
    role: Joi.string().valid('client', 'admin').required()
});

// Contrôleur spécifique aux utilisateurs, hérite du CoreController
class UserController extends CoreController {
    constructor() {
        super(User, userSchema, 'users'); // On passe le modèle, le schéma et le dossier des Views
    }

 async updateUser(req, res) {
    try {
      const { id } = req.params;
      const item = await this.model.findByPk(id);

      if (!item) {
        return res.status(404).render('error', { message: 'Utilisateur non trouvé.' });
      }

      if (req.method === 'GET') {
        return res.render(`${this.viewFolder}/edit`, {
          title: `Modifier ${this.model.name} #${id}`,
          errorMessage: null,
          oldInput: item,
        });
      }

      const { error, value } = userUpdateSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).render(`${this.viewFolder}/edit`, {
          title: `Modifier ${this.model.name} #${id}`,
          errorMessage: error.details.map((d) => d.message).join('<br>'),
          oldInput: req.body,
        });
      }

      await item.update(value);
      return res.redirect(`${req.baseUrl}/${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).render('error', { message: 'Erreur lors de la mise à jour.' });
    }
  }

}

export default new UserController();
