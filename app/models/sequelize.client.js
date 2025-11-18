import { Sequelize } from "sequelize"; // import de sequelize
import "dotenv/config"; // import du fichier .env

// On crée une instance de Sequelize
const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    underscored: true,      // snake_case
    timestamps: true,       // ajoute automatiquement creat_at et update_at
    freezeTableNAme: true,  // garde le nom exact du modèle
  },
});

//Test connection
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à Supabase établie avvec succès.');
  })
  .catch(err => {
    console.error('Erreur de connexion à Supabase:', err);
    process.exit(1);
  });


// On exporte cette instance
export default sequelize;