# Projet Web Avancé - React & Backend

Ce projet utilise React pour le front-end et un backend avec NestJS. Vous pouvez également utiliser Docker pour faire fonctionner les deux parties.

Les répos git sont trouvables ici : https://github.com/PROJET-WEB-AVANCE

## Installation du Frontend

1. Clonez ce repository.

2. Allez dans le répertoire du frontend et installez les dépendances :

   ```bash
   npm install
   ```

3. Démarrez le serveur de développement :

   ```bash
   npm run start
   ```

Le front sera disponible sur le port `3000`.

Ou bien, vous pouvez démarrer avec Docker en utilisant `docker-compose` :

   ```bash
   docker-compose up
   ```

Cela démarrera le frontend dans un container Docker.

## Installation du Backend

1. Allez dans le répertoire du backend et installez les dépendances :

   ```bash
   npm install
   ```

2. Démarrez le serveur backend :

   ```bash
   npm run start
   ```

Ou bien, utilisez `nest start` si vous utilisez NestJS :

   ```bash
   nest start
   ```

Le backend sera disponible sur le port `8080`.

Vous pouvez également démarrer le backend avec Docker :

   ```bash
   docker-compose up
   ```

Cela démarrera le backend dans un container Docker.

## Comptes de test disponibles

Pour tester l'application, vous pouvez utiliser les comptes suivants :

Client

Email : client@insa-cvl.fr

Mot de passe : client123

Vendeur

Email : julien.sanchez@insa-cvl.fr

Mot de passe : sales123

Admin

Email : quentin.dollen@insa-cvl.fr

Mot de passe : admin123

## Swagger API Documentation

Une documentation Swagger de l'API est disponible à l'adresse suivante :

[http:localhost:8080/api-docs](http:localhost:8080/api-docs)

## Routes Frontend

Le front-end contient les routes suivantes :

- `/home` : Page d'accueil
- `/login` : Page de connexion
- `/register` : Page d'inscription
- `/profile` : Page de profil utilisateur
- `/search` : Page de recherche
- `/cart` : Page de panier
- `/admin` : Page d'administration des produits
- `/admin/order` : Page de gestion des commandes 
- `/admin/edit/:id` : Page de modification d'une commande
- `/category/:categoryName` : Page d'une catégorie spécifique
- `/article/:articleName` : Page de détails d'un article
- `/profile/edit` : Page de modification du profil utilisateur
- `/profile/order` : Page des commandes utilisateur
- `/admin/order/:id` : Page de modification d'une commande admin

## Configuration Docker

Si vous préférez utiliser Docker, vous pouvez démarrer les deux parties (frontend et backend) avec les commandes `docker-compose up` respectivement dans les dossiers `frontend` et `backend`.

