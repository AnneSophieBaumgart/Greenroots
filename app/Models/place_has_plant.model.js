import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.client.js';

class PlaceHasPlant extends Model {}

PlaceHasPlant.init(
{
    // Quantité d'arbres plantés
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,         // Valeur par défaut : 1
        validate: {
            min: 1,                // Vérifie que quantity > 0
        },
    },

    // Clé étrangère vers Tree
    tree_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    // Clé étrangère vers Place
    place_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    sequelize,                  // Connexion à la base
    tableName: 'place_has_plant', // Nom correct de la table SQL
    modelName: 'PlaceHasPlant',  // Nom du modèle Sequelize
    timestamps: true,            // Sequelize gère createdAt / updatedAt
}
);

export default PlaceHasPlant;
