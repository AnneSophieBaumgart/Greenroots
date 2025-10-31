import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { Tree } from '../Models/index.js';

class TreeController {

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
            const trees = await Tree.findAll();
            res.status(StatusCodes.OK).json(trees);
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erreur serveur lors de la récupération des arbres."});
        }
    }

    // Récupérer un arbre par ID
    static async getById(req, res) {
        try {

            const { id } = req.params; // on récupère l'id de l'URL
            const tree = await Tree.findByPk(id); // on cherche l'arbre
            
            if (!tree) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: "Arbre non trouvé." });
            }
            res.status(StatusCodes.OK).json(tree);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erreur serveur lors de la récupération de l’arbre."});
        }
        }

    // Créer un nouvel arbre
    static async create(req, res) {
        try {
            const { error, value } = this.treeSchema.validate(req.body);
            if (error) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
            }

            const newTree = await Tree.create(value);
            res.status(StatusCodes.CREATED).json(newTree);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la création de l’arbre." });
        }
    }

    // Mettre à jour un arbre existant
    static async update(req, res) {
    try {
        const { id } = req.params;
        const { error, value } = this.treeSchema.validate(req.body);

        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
        }

        const tree = await Tree.findByPk(id);

        if (!tree) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Arbre non trouvé." });
        }

        await tree.update(value);

        res.status(StatusCodes.OK).json(tree);

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la mise à jour de l’arbre." });
    }
    }

    // Supprimer un arbre
static async delete(req, res) {
    try {
        const { id } = req.params;
        const tree = await Tree.findByPk(id);

        if (!tree) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Arbre non trouvé." });
        }

    await tree.destroy();

    res.status(StatusCodes.NO_CONTENT).send(); // 204 : succès sans contenu

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la suppression de l’arbre." });
    }
}
}
