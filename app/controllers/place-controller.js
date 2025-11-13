import Joi from 'joi';
import { Place } from '../models/index.js';
import CoreController from './core-controller.js';

// Schéma Joi pour valider les données d'un Lieux
const placeSchema = Joi.object({
  name: Joi.string().min(2).required(), // Le nom doit faire au moins 2 caractères et est obligatoire
});

// Contrôleur spécifique aux lieux, hérite du CoreController
class PlaceController extends CoreController {
  constructor() {
    super(Place, placeSchema, 'places'); // On passe le modèle, le schéma et le dossier des Views 
  }
}

export default new PlaceController();
export { placeSchema }; //exporte le schéma pour les tests