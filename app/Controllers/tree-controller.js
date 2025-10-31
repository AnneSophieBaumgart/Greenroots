import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { Tree } from '../Models/index.js';

class TreeController {

    // static veut dire que la méthode appartient à la classe elle-même,et non à une instance de cette classe.

    // Schéma de validation pour Joi
    static treeSchema = Joi.object({
        name: Joi.string().min(2).max(100).required(), // Nom obligatoire
        description: Joi.string().allow(''), // Description optionnelle
        image: Joi.string().uri().allow(''), // URL d’image optionnelle
        price: Joi.number().positive().required(), // Prix positif obligatoire
        stock: Joi.number().integer().min(0).required(), // Stock entier >= 0
        origin: Joi.string().min(2).required(), // Origine obligatoire
    });

    // Récupérer tous les arbres
    static async getAll(req, res) {
        try {

            const trees = await Tree.findAll(); // Récupère tous les enregistrements

            res.status(StatusCodes.OK).json(trees); // Envoie la liste en JSON

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erreur serveur lors de la récupération des arbres."});
        }
    }

    // Récupérer un arbre par ID
    static async getById(req, res) {
        try {

            const { id } = req.params; // on récupère l'id de l'URL

            const tree = await Tree.findByPk(id); // Recherche dans la BDD par clé primaire
            
            if (!tree) { // Si aucun arbre trouvé => erreur 404
                return res.status(StatusCodes.NOT_FOUND).json({ error: "Arbre non trouvé." });
            }

            res.status(StatusCodes.OK).json(tree); // Envoie l'arbre trouvé

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erreur serveur lors de la récupération de l’arbre."});
        }

        }

    // Créer un nouvel arbre
    static async create(req, res) {
        try {

            // Validation des données avec Joi
            const { error, value } = this.treeSchema.validate(req.body);

            if (error) {
                // Si erreur de validation => erreur 400
                return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
            }

            const newTree = await Tree.create(value); // Création de l'arbre en BDD

            res.status(StatusCodes.CREATED).json(newTree); // Envoie de l'arbre crée

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la création de l’arbre." });
        }
    }

    // Mettre à jour un arbre existant
    static async update(req, res) {
    try {

        const { id } = req.params; // Récupère l’ID

        const { error, value } = this.treeSchema.validate(req.body); // Valide les données

        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
        }

        const tree = await Tree.findByPk(id); // Recherche de l’arbre

        if (!tree) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Arbre non trouvé." });
        }

        await tree.update(value); // Mise à jour dans la BDD

        res.status(StatusCodes.OK).json(tree); // Retourne l’arbre modifié

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la mise à jour de l’arbre." });
    }
    }

    // Supprimer un arbre
    static async delete(req, res) {
    try {

        const { id } = req.params; // Récupère l’ID

        const tree = await Tree.findByPk(id); // Recherche de l’arbre

        if (!tree) { // Si pas trouvé => erreur 404
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Arbre non trouvé." });
        }

    await tree.destroy(); // Suppression en BDD

    res.status(StatusCodes.NO_CONTENT).send(); // 204 : succès sans contenu

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la suppression de l’arbre." });
    }
}
}

// Export de la classe pour l’utiliser dans les routes
export default TreeController;
