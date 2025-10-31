import { StatusCodes } from 'http-status-codes';

// Classe de base pour les contrôleurs génériques
class CoreController {

    // Constructeur : reçoit un modèle Sequelize et un schéma Joi
    constructor(model, schema) {
        this.model = model; // Stocke le modèle (table)
        this.schema = schema; // Stocke le schéma de validation
    } 

    /**
     * Récupérer toutes les Ressources d'une certaine table de la BDD
     *
     * @param {Request} req
     * @param {Response} res
     */
    getAll = async (req, res) => {
        try {

            const items = await this.model.findAll();// Récupère tous les enregistrements

            res.status(StatusCodes.OK).json(items); // Retourne la liste en JSON (code 200)

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur." });
        }
    };

    /**
     * Récupérer une Ressource d'une certaine table par son id
     *
     * @param {Request} req
     * @param {Response} res
     */
    getById = async (req, res) => {
        try {

            const { id } = req.params;// Récupère l'ID depuis l'URL

            const item = await this.model.findByPk(id); // Cherche l'élément par clé primaire

            if (!item) { // Si l'élément n'existe pas
                return res.status(StatusCodes.NOT_FOUND).json({ error: "Élément non trouvé." });
            }

            res.status(StatusCodes.OK).json(item); // Retourne l'élément trouvé (code 200)

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur." });
        }
    };

    /**
     * Crée une nouvelle Ressource d'une certaine table dans la BDD
     *
     * @param {Request} req
     * @param {Response} res
     */
    create = async (req, res) => {
        try {
            const { error, value } = this.schema.validate(req.body); // Valide les données entrantes

            if (error) { // Si les données ne passent pas la validation
                return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
            }

            const newItem = await this.model.create(value);  // Crée un nouvel enregistrement

            res.status(StatusCodes.CREATED).json(newItem); // Retourne l'objet créé (code 201)

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la création." });
        }
    };

    /**
     * Met à jour une Ressource d'une certaine table par son id
     *
     * @param {Request} req
     * @param {Response} res
     */
    update = async (req, res) => {
        try {

            const { id } = req.params;// Récupère l'ID depuis l'URL

            const { error, value } = this.schema.validate(req.body); // Valide les nouvelles données

            if (error) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
            }

            const item = await this.model.findByPk(id); // Recherche l'élément à modifier

            if (!item) {// Si il ne le trouve pas
                return res.status(StatusCodes.NOT_FOUND).json({ error: "Élément non trouvé." });
            }

            await item.update(value); // Met à jour l'élément

            res.status(StatusCodes.OK).json(item); // Retourne l'élément mis à jour (code 200)
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la mise à jour." });
        }
    };

    /**
     * Supprime une Ressource d'une certaine table par son id
     *
     * @param {Request} req
     * @param {Response} res
     */
    delete = async (req, res) => {
        try {

            const { id } = req.params; // Récupère l'ID depuis l'URL

            const item = await this.model.findByPk(id); // Recherche l'élément

            if (!item) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: "Élément non trouvé." });
            }

            await item.destroy(); // Supprime l'élément

            res.status(StatusCodes.NO_CONTENT).send(); // Répond code 204 (aucun contenu)

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la suppression." });
        }
    };
}

// Exporte la classe pour être héritée par d'autres contrôleurs
export default CoreController;
