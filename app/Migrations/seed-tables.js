import sequelize from '../Models/sequelize.client.js';
import { User, Place, Tree, PlaceHasPlant, Order, OrderHasTree, UserHasTree} from '../Models/index.js';
import * as argon2 from 'argon2'; // Pour hasher et vérifier les mots de passe


try{

    // force: true = supprime et recrée les donée à chaque exécution
    console.log('Réinitialisation de la base de données.');
    await sequelize.sync({ force: true });
    

    // Inserer des utilisateurs
    console.log('Insertion des utilisateurs.');
    const users = await User.bulkCreate([
        {
            first_name: 'Alice',
            last_name: 'Dupont',
            email: 'alice@mail.com',
            password: await argon2.hash('password'),
            role: 'client',
        },
        {
            first_name: 'Bob',
            last_name: 'Marley',
            email: 'bob@mail.com',
            password: await argon2.hash('passwordadmin'),
            role: 'admin',
        },
    ]);

    // Insérer des lieux
    console.log('Insertion des lieux.');
    const places = await Place.bulkCreate([
        { name: 'Turquie' },
        { name: 'Allemagne' },
        { name: 'Madagascar' },
        { name: 'France' },
        { name: 'Canada' },
        { name: 'Népal' },
        { name: 'Japon' },
        { name: 'Chili' },
        { name: 'Brésil' },
        { name: 'Papouasie-Nouvelle-Guinée' },
        { name: 'Australie' },
        { name: 'Egypte' },
    ]);

    //Insérer des arbres
    console.log('Insertion des arbres.');
    const trees = await Tree.bulkCreate([
        { name: 'Chêne', description: 'Arbre majestueux et robuste, symbole de force et de longévité. Son bois est très recherché en menuiserie.',
        image: '/images/chene.jpg', price: 15.5, stock: 60, origin: 'Turquie' },
        { name: 'Bouleau', description: 'Arbre élancé à l’écorce blanche caractéristique, souvent présent dans les forêts tempérées.',
        image: '/images/bouleau.jpg', price: 17, stock: 110, origin: 'Allemagne' },
        { name: 'Baobab', description: 'Arbre emblématique d’Afrique, au tronc gigantesque capable de stocker l’eau.',
        image: '/images/baobab.jpg', price: 24, stock: 20, origin: 'Madagascar' },
        { name: 'Dogwoods', description: 'Arbre ornemental aux fleurs délicates, très apprécié pour ses couleurs printanières.',
        image: '/images/dogwoods.webp', price: 17, stock: 100, origin: 'France' },
        { name: 'Érable à sucre', description: 'Arbre emblématique du Canada, célèbre pour la production du sirop d’érable.',
        image: '/images/erable-a-sucre.jpg', price: 20, stock: 85, origin: 'Canada' },
        { name: 'Cyprès de l’Himalaya', description: 'Grand conifère aux aiguilles vert bleuté, résistant au froid et aux conditions extrêmes.',
        image: '/images/cypres.jpg', price: 40, stock: 17, origin: 'Népal' },
        { name: 'Cerisier du Japon (sakura)', description: 'Arbre symbolique du Japon, connu pour ses magnifiques fleurs roses au printemps.',
        image: '/images/cerisier-du-japon.jpeg', price: 26.5, stock: 55, origin: 'Japon' },
        { name: 'Araucaria du Chili', description: 'Arbre aux branches géométriques uniques, parfois surnommé « désespoir des singes ».',
        image: '/images/araucaria-1249426.jpg', price: 15, stock: 32, origin: 'Chili' },
        { name: 'Noyer du Brésil', description: 'Arbre tropical dont les noix riches en sélénium sont très nutritives.',
        image: '/images/noyer-du-bresil.jpg', price: 12, stock: 44, origin: 'Brésil' },
        { name: 'Arbre à pain', description: 'Arbre tropical produisant un fruit nourrissant souvent utilisé comme base alimentaire.',
        image: '/images/arbre-a-pain.jpg', price: 31.5, stock: 10, origin: 'Papouasie-Nouvelle-Guinée' },
        { name: 'Eucalyptus', description: 'Arbre d’Australie à la croissance rapide, connu pour son parfum et ses huiles essentielles.',
        image: '/images/eucalyptus.jpg', price: 25.5, stock: 94, origin: 'Australie' },
        { name: 'Acacia', description: 'Arbre gracieux adapté aux zones arides, souvent associé aux paysages d’Afrique.',
        image: '/images/acacia.jpg', price: 12.5, stock: 66, origin: 'Egypte' },

    ]);

    // Lier des arbres à des lieux
    console.log('Liaison des arbres aux lieux.');
    const placeHasPlants = await PlaceHasPlant.bulkCreate([
        { place_id: places[0].id, tree_id: trees[0].id, quantity: 5 },  // Turquie - Chêne
        { place_id: places[1].id, tree_id: trees[1].id, quantity: 8 },  // Allemagne - Bouleau
        { place_id: places[2].id, tree_id: trees[2].id, quantity: 12 }, // Madagascar - Baobab
        { place_id: places[3].id, tree_id: trees[3].id, quantity: 10 }, // France - Dogwoods
        { place_id: places[4].id, tree_id: trees[4].id, quantity: 15 }, // Canada - Érable
    ]);

    // Créer une commande
    console.log('Création d’une commande.');
    const orders = await Order.bulkCreate([
        {
            total_price: 40,
            status: 'payé',
            user_id: users[0].id, // Alice
        }
    ]);

    // Associer des arbres à un utilisateur
    console.log('Attribution des arbres aux utilisateurs.');
    const userHasTrees = await UserHasTree.bulkCreate([
        { user_id: users[0].id, tree_id: trees[5].id }, // Alice => Cyprès de l’Himalaya
    ]);

    console.log('Données insérées avec succès !!!');

} catch (error) {
    console.error('Erreur lors du seed :', error)
}





await sequelize.close();