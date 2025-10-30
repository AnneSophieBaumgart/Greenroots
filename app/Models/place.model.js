import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.client.js';

class Place extends Model {}

Place.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false        // Le nom de la catégorie est obligatoire (non null)
    },
},
{
    sequelize,              // Instance Sequelize (connexion à la BDD)
    tableName: 'place',     // Nom de la table dans la base
    modelName: 'Place',     // Nom du modèle côté code
    timestamps: true,       // <-- Sequelize gère createdAt et updatedAt
}
)

export default Place;