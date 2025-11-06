import Tree from '../Models/tree.model.js';
import Place from '../Models/place.model.js';
import { StatusCodes } from 'http-status-codes';


// ---- afficher la liste des arbres en tant qu'admin ----\\

export async function getAllTreesAdmin(req, res) {
  try {

    // récupère tous les arbres de la BDD
    const trees = await Tree.findAll({
      order: [['name', 'ASC']]
    });

    // rend la view a dmin avec liste des arbres
    res.render('admin/trees-list', { trees });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('error', {
      error: 'Erreur lors du chargement des arbres'
    });
  }
}

// ---- afficher le formulaire d'ajout d'arbre ---- \\

export async function getAddTreeForm(req, res) {
  try {
    // récupère tous les lieux pour le formulaire
    const places = await Place.findAll();

    // rend la view avec le formulaire vide
    res.render('admin/tree-form', {
      tree: null,       // mode création
      places,           // liste des lieux disponibles
      action: 'add'     //action du formulaire
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('error', {
      error: 'Erreur lors du chargement du formulaire'
    });
  }
}

// ---- créer un nouvel arbre ---- \\

export async function createTree(req, res) {
  try {

    // récupère les données du formulaire
    const { name, description, image, price, stock, origin, place_ids, quantities } = req.body;

    // créer le nouvel arbre dans la BDD
    const newTree = await Tree.create({
      name,
      description,
      image,
      price: parseFloat(price),   // convertit en nombre décimal
      stock: parseInt(stock),     // convertit en nombre entier
      origin
    });

    // si des lieux ont été sélectionnés, créer les relations dans place_has_plant
    if (place_ids && Array.isArray(place_ids)) {
      for (let i = 0; i < place_ids.length; i++) {

        // ajoute chaque lieu avec sa quantité à la table de jonction
        await newTree.addPlace(place_ids[i], {
          through: { quantity: parseInt(quantities[i]) }
        });
      }
    }

    // redirife vers la liste des arbres avec messages de succès
    res.redirect('/admin/trees?success=tree_created');

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('error', {
      error: 'Erreur lors de la création de l\'arbre'
    });
  }
}


