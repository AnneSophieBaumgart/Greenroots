import Tree from "../Models/tree.model.js";
import Place from "../Models/place.model.js";
import { StatusCodes } from "http-status-codes";


// ---- afficher le panier ---- \\

export async function getPanier(req, res) {
  try {

    // vérifie si un panier existe dans la session
    // si non, initialise un tableau vide
    if (!req.session.panier) {
      req.session.panier = [];
    }

    // tableau vide pour stocker les détails du panier
    const panierItems = [];

    // initialise le total à 0
    let total = 0;

    // Boucle sur chaque item du panier stocké en session
    for (const item of req.session.panier) {

      // on récupère les détails de l'arbre depuis bdd avec id
      const tree = await Tree.findByPk(item.tree_id, {

        //include pour récupérer le lieu associé
        include: [{
          model: Place,
          through: { attributes: [] }
        }]
      });

      //vérifie que l'arbre existe dans bdd
      if (tree) {

        // calcule le sous-total
        const subtotal = parseFloat(tree.price) * item.quantity;

        //ajoute l'arbre + infos au tableau panierItems
        panierItems.push({
          tree,                     //objet complet de l'arbre
          quantity: item.quantity,  //quantité de la session
          subtotal                  // sous-total calculé
        });

        // ajoute le sous-total au total général du panier
        total += subtotal;
      }
    }

    //rend la view panier.ejs avec les données
    res.render('panier', {
      panierItems,
      total
    });
  } catch (error) {

    // rend une page d'erreur 500
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('error', {
      error: 'Erreur serveur'
    });
  }
}

// ---- ajouter un arbre au panier ---- \\

export async function addToPanier(req, res) {

  //récupère les données envoyées
  const { tree_id, quantity } = req.body;

  // vérifie si un panier existe dans la session
  if (!req.session.panier) {
    req.session.panier = [];
  }

  //chercher si l'arbre existe déjà dans le panier
  //find retourne l'item si trouvé, sinon undefined
  const existingItem = req.session.panier.find(
    item => item.tree_id === parseInt(tree_id)  // convertit tree_id en nombre pour comparer
  );

  // si l'arbre est déjà dans le panier
  if (existingItem) {

    //augmente la quantité si existante
    //parsInt convertit la quantité en nombre entier
    existingItem.quantity += parseInt(quantity);
  } else {

    //si l'arbre n'est pas dans le panier, l'ajoute
    req.session.panier.push({
      tree_id: parseInt(tree_id),
      quantity: parseInt(quantity)
    });
  }
  // redirige l'utilisateur vers la page du panier
  res.redirect('/panier');
}


// ---- supprimer un arbre du panier ---- \\

export async function removeFromPanier(req, res) {

  //récupère l'ID de l'arbre à supprimer
  const { tree_id } = req.body;

  // vérifie que le panier  existe
  if (req.session.panier) {

    //filter créer un nouveau tableau en gardant seulement
    // les items dont le tree_id est différent de celui à supprimer
    req.session.panier = req.session.panier.filter(
      item => item.tree_id !== parseInt(tree_id)
    );
  }
  res.redirect('/panier');
}
