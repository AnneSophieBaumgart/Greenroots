# GreenRoots

## Présentation Générale

- **Quoi ?** Développement d'une plateforme d'e-commerce permettant d'acheter des arbres à planter (par GreenRoots et demain des associations tierces) pour contribuer à la reforestation.
- **Qui ?** GreenRoots (fictif) est née de l’urgence de prendre des mesures concrètes pour préserver notre planète face à la déforestation et au changement climatique.
- **Pour qui ?** Public éco-conscient, entreprises responsables, associations engagées, etc.
- **Comment ?** En équipe : Armand, Zakaria, Anne-Sophie. Organisation en méthode agile pour la gestion de projet.
- **Quand ?** En plusieurs sprints qui incluront des tâches de : conception, code, déploiement, recettage, etc.

## Présentation du Projet de Développement

### Besoins Fonctionnels (Minimum Viable Product - MVP)

- Landing page avec la présentation de GreenRoots et certains arbres à planter.
- Système d'inscription et de connexion.
- Avoir la possibilité (en tant que GreenRoots) de gérer les arbres à proposer : création, édition, suppression, etc.
- Pouvoir consulter les détails d’un arbre disponible à l’achat.
- Pouvoir acheter un arbre (avec un faux tunnel d’achat pour le MVP).
- Pouvoir suivre ses commandes passées en tant qu’utilisateur.

### Propositions d’évolutions possibles

- Pouvoir suivre l’évolution des arbres que l’on a achetés : lieu, croissance, photos potentielles, etc.
- Back-office pour l'administration, la gestion des profils utilisateurs, le suivi des arbres, etc.
- Ajout de fonctionnalités avancées pour les partenaires : via un rôle spécifique, pouvoir proposer en tant qu’externe un lot d’arbres à planter, etc.
- Intégration d'une API pour le paiement sécurisé, comme [Stripe](https://stripe.com/fr).

### Contraintes Techniques (notamment liées au TP)

- **Technologies** : application monolithique : 
                              - express + ejs pour les views,
                              - postgreSQL pour l'API,
                              - sequelize comme ORM.
- **Sécurité :** authentification sécurisée, protection contre les failles courantes (XSS, injections SQL, etc.).
- **Déploiement :** rédaction a minima d'une procédure de déploiement (CI/CD en bonus).
- **Responsive :** application développée en mobile first et responsive.
- **Accessibilité :** respect des normes d'accessibilité web [WCAG](https://www.w3.org/Translations/WCAG20-fr/).
- **RGPD et mentions légales :** mettre en place les mentions légales liées au règlement général sur la protection des données (RGPD).
- **Versionning :** utilisation de Git et GitHub.
- **SEO** : appliquer les bonnes pratiques visant à maximiser le référencement du projet.
- **Navigateurs compatibles :** tous.
- **Bonus** :
    - conteneurisation (Docker) pour l'environnement de développement voire pour le déploiement,
    - éco-conception (optimisation des images, minification des fichiers, etc.).

### Routes

#### L'arborescence des routes

![arborescence](./arborescence.excalidraw.png)

#### Détail des routes

| Méthode | Route                     | Description                                      | Accès               |
|---------|---------------------------|--------------------------------------------------|---------------------|
| GET     | /                         | Page d'accueil                                   | Public              |
| GET     | /register                 | Page d'inscription                               | Public              |
| POST    | /register                 | Soumission du formulaire d'inscription           | Public              |
| GET     | /user                     | Page de profil                                   | Utilisateur connecté|
| GET     | /login                    | Page de connexion                                | Public              |
| POST    | /login                    | Soumission du formulaire de connexion            | Public              |
| POST    | /logout                   | Déconnexion                                      | Utilisateur connecté|
| GET     | /trees                    | Liste des arbres disponibles à l'achat           | Public              |
| GET     | /trees/:id                | Détails d'un arbre spécifique                    | Public              |
| POST    | /trees/:id/buy            | Achat d'un arbre                                 | Utilisateur connecté|
| GET     | /orders                   | Liste des commandes passées                      | Utilisateur connecté|
| GET     | /cart                     | Panier                                           | Public              |
| GET     | /contact                  | Contact                                          | Public              |
| GET     | /admin                    | Page d'admin                                     | Admin               |
| POST    | /admin                    | Ajout d'un arbre                                 | Admin               |
| PATCH   | /admin                    | Modification d'un arbre                          | Admin               |
| DELETE  | /admin                    | Suppression d'un arbre                           | Admin               |
| GET     | /admin/user:id            | Voir d'un utilisateur                            | Admin               |


#### User Stories

### Utilisateur :

- En tant qu’utilisateur, je veux pouvoir m’inscrire pour créer un compte.
- En tant qu’utilisateur, je veux pouvoir me connecter à mon compte.
- En tant qu’utilisateur, je veux pouvoir consulter la liste des arbres disponibles à l’achat.
- En tant qu’utilisateur, je veux pouvoir voir les détails d’un arbre spécifique.
- En tant qu’utilisateur, je veux pouvoir acheter un arbre.
- En tant qu’utilisateur, je veux pouvoir consulter l’historique de mes commandes.
- En tant qu’utilisateur, je veux pouvoir voir et modifier mon panier.
- En tant qu’utilisateur, je veux pouvoir me déconnecter de mon compte.


### Admin :

- En tant qu’admin, je veux pouvoir ajouter de nouveaux arbres à la plateforme.
- En tant qu’admin, je veux pouvoir modifier les informations d’un arbre existant.
- En tant qu’admin, je veux pouvoir supprimer un arbre de la plateforme.


#### Rôles de chacun :

- Product Owner (PO) : Armand
- Lead developer front : Zakaria
- Lead developer back : Anne-Sophie
- Git master : Armand

#### Organisation du travail

Mise en place d'un kanban où chacun choisira les tâches qu'il souhaite faire tout en restant équilibré entre les membres de l'équipe.