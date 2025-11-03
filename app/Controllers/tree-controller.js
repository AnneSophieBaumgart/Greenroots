import Joi from 'joi';
import { Tree } from '../Models/index.js';
import CoreController from './core-controller.js';

// Schéma Joi pour valider les données d'un arbre
const treeSchema = Joi.object({
    name: Joi.string().min(2).required(), // Nom requis (2 caractères minumum)
    description: Joi.string().allow(''), // Description / optionnelle
    image: Joi.string().uri().allow(''), // URL d’image /  optionnelle
    price: Joi.number().positive().required(), // Prix positif / obligatoire
    stock: Joi.number().integer().min(0).required(), // Stock >= 0 / obligatoire
    origin: Joi.string().min(2).required(), // Origine requise (2 caractères minumum)
});

class TreeController extends CoreController {
    constructor() {
        super(Tree, treeSchema, 'trees'); // On passe le modèle et le schéma
    }
}

export default new TreeController();
