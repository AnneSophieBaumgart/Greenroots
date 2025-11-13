# dwwm-greenroots

## Résumé du projet – GreenRoots

GreenRoots est une plateforme d’e-commerce éco-responsable permettant aux utilisateurs d’acheter des arbres à planter pour contribuer à la reforestation mondiale.
Le projet offre un espace où particuliers, entreprises et associations peuvent financer des plantations, suivre leurs achats et découvrir les lieux de reforestation.
En gros, la plateforme va intègrer un système complet de gestion des utilisateurs, de commandes et d'arbres, ainsi qu’un suivi des plantations.

## Résumé du MCD (Modèle Conceptuel de Données)

Le MCD de GreenRoots représente l’organisation conceptuel des informations du projet.
Il met en relation les principales entités du système :

- Utilisateur : gère l’inscription, la connexion et les commandes.

- Commande : regroupe les achats effectués par un utilisateur.

- Arbre : correspond aux arbres disponibles à l’achat.

- Lieu de reforestation : représente les endroits où les arbres sont plantés.

## Les cardinalités :

- Un utilisateur peut passer plusieurs commandes, mais une commande appartient à un seul utilisateur.

- Une commande peut contenir plusieurs arbres, et un arbre peut apparaître dans plusieurs commandes (relation N:N).

- Un arbre peut être planté dans plusieurs lieux de reforestation, et un lieu peut accueillir plusieurs arbres (relation N:N).

## Résumé du MLD (Modèle Logique de Données)

Il précise les tables, leurs attributs, clés primaires, clés étrangères et contraintes d’intégrité.

Les principales tables sont :

- USER : contient les informations des utilisateurs (nom, prénom, email, mot de passe, rôle).

- TREE : représente les arbres disponibles à la vente, avec leurs caractéristiques (nom, description, prix, stock, origine).

- ORDER : enregistre les commandes passées par les utilisateurs, avec la date, le statut et le montant total.

- PLACE : désigne les différents lieux de reforestation.

- ORDER_HAS_TREE : fait le lien entre les commandes et les arbres achetés, en précisant la quantité commandée.

- USER_HAS_TREE : permet de savoir quels arbres ont déjà été achetés par un utilisateur.

PLACE_HAS_PLANT : relie les arbres aux lieux de plantation, en indiquant la quantité d’arbres plantés à chaque endroit.

Ce modèle assure la cohérence des données, la traçabilité des actions (achats, plantations) et une structure optimisée pour les futures évolutions du projet.
