import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { User, UserHasTree, Tree, Place } from '../Models/index.js';
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
  role: Joi.string().valid('client', 'admin').required()
});

// Contrôleur spécifique aux utilisateurs, hérite du CoreController
class UserController extends CoreController {
  constructor() {
    super(User, userSchema, 'users'); // On passe le modèle, le schéma et le dossier des Views
  }

  // Méthode asynchrone pour modifier un utilisateur
  updateUser = async (req, res) => {
    try {

      // Récupère l’ID de l’utilisateur dans l’URL
      const { id } = req.params;

      // Cherche l’utilisateur en bdd via so id
      const item = await this.model.findByPk(id);

      if (!item) { // Si aucun utilisateur trouvé
        return res.status(StatusCodes.NOT_FOUND).render('error', { message: 'Utilisateur non trouvé.' });
      }

      // Si la requête est un GET (affichage du formulaire)
      if (req.method === 'GET') {
        return res.render(`${this.viewFolder}/edit`, { // Rend la vue "edit.ejs"
          title: `Modifier ${this.model.name} #${id}`, // Titre dynamique
          errorMessage: null, // Aucune erreur au départ
          oldInput: item, // Pré-remplit le formulaire avec les données existantes
        });
      }

      // Si la requête est un POST => on valide les nouvelles données
      const { error, value } = userUpdateSchema.validate(req.body, {
        abortEarly: false, // Récupère toutes les erreurs
        stripUnknown: true, // Supprime les champs non définis dans le schéma
      });

      // Si la validation Joi échoue
      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).render(`${this.viewFolder}/edit`, {
          title: `Modifier ${this.model.name} #${id}`,
          errorMessage: error.details.map((details) => details.message).join('<br>'), // error.details est un tableau de toutes les erreurs trouvées par Joi.
          oldInput: req.body, // Garde les valeurs saisies par l’utilisateur
        });
      }

      // Met à jour l’utilisateur avec les données validées
      await item.update(value);

      // Redirige vers la page de détail de l’utilisateur
      return res.redirect(`${req.baseUrl}/${id}`);

    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('error', { message: 'Erreur lors de la mise à jour.' });
    }
  }

  // méthode pour afficher les arbres de l'utilisateur dans son dashboard
  // getDashboard = async (req, res) => {
  //  try {

  // on récupère l'id utilisateur depuis le token
  //  const userId = req.userId;

  // si pas d'userId, on le redirige vers la connexion
  //  if (!userId) {
  //    return res.redirect('/login');
  //  }

  // charger l'utilisateur avec les associations nécessaires
  // const user = await this.model.findByPk(userId, {
  //  include: [{
  //   model: UserHasTree,
  //   include: [{
  //     model: Tree,
  //     include: [{
  //       model: Place,
  //       through: { attributes: ['quantity'] }
  //     }]
  //   }]
  //  }]
  //  });

  // vérifier que l'utilisateur existe
  //  if (!user) {
  //    return res.status(StatusCodes.NOT_FOUND).render('error', {
  //      message: 'Utilisateur introuvable'
  //    });
  //  }

  // transformer en plain object pour EJS ( plus simple à lire)
  //  const userPlain = user.get ? user.get({ plain: true }) : user;

  // rendre la vue dashboaard
  //  return res.status(StatusCodes.OK).render('dashboard', {
  //    user: userPlain,
  //    userRole: req.userRole
  //  });

  //  } catch (error) {
  //    console.error('Erreur getDashboard:', error);
  //    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('error', {
  //      message: 'Erreur serveur'
  //    });
  //  }
  // }
}

export default new UserController();
export { userSchema, userUpdateSchema }; // Pour les tests unitaires
