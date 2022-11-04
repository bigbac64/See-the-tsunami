# Back-end

# Technologies

Builder : **Docker**

Environnement d’exécution : [**Node.js (nodejs.org)**](https://nodejs.org/fr/)

Langage : **Javascript**

Outils : 
 - **[Tsunami](https://github.com/google/tsunami-security-scanner)**
 - **[Tsunami plugins](https://github.com/google/tsunami-security-scanner-plugins)**

# API

<aside>
<img src="https://www.notion.so/icons/info-alternate_blue.svg" alt="https://www.notion.so/icons/info-alternate_blue.svg" width="10px" /> L’API seras créé dans un docker afin de faciliter le déploiement et de contrôler les dépendances

</aside>

## Objectif

<aside>
⚠️ Les objectifs finaux de ce projet ne sont pas tous développé dans le référentiel, en vert sont les objectifs réalisés

</aside>

L’API doit:

- Exécuter l’outils Tsunami avec en paramètre une adresse internet et la liste des plugins à utiliser
- Vérifier la version de tsunami
- Mettre à jour la liste des plugins
- Récupérer le résultat généré par Tsunami
- Récupérer la liste des plugins utilisable
- Permettre d’ajouter des plugins personnel
- ajouter une méthode d’authentification

![Schéma de l’API](docs/Schema_API_(1).svg)

Schéma de l’API

Créer une méthode d’authentification permettras de sécurisé l’api des sujets sensiblent tel que la modification de l’outil tsunami ou l’ajout d’un plugin

## Documentation

L’API est créé à l’aide de **NodeJS**, c’est une couche de contrôle sur l’outils Tsunami

L’API contient 2 chemin exploitables

- **~/tsunami** : La méthode GET permet de lancer un scan avec tsunami avec une adresse et une liste de plugins, si les plugin ne sont pas renseigné, lance le scan avec tout les plugins. Retourne le rapport généré par tsunami
- **~/plugins** : La méthode GET permet de générer une liste des plugins utilisable par tsunami. Retourne cette liste

## informations Serveur

### Dépendances

`express` v.4.16.1

`dotenv` v.16.0.3

`debug` v.2.6.9

`morgan` v.1.9.1

`cors` v.2.8.5

### Variables d’environement

`PORT` permet d’initialiser le numéros du port

`CORS` Renseigne le Cross-origin resource sharing

`PLUGIN_PATH` Renseigne l’emplacement des plugins

`TSUNAMI_PATH` Renseigne l’emplacement de l’outils tsunami

`RESULT_PATH` Renseigne l’emplacement du rapport généré par tsunami



### [Modèles](models/)

## Utilisation

### Analyser une adresse avec T**sunami**

<aside>
<img src="https://www.notion.so/icons/info-alternate_blue.svg" alt="https://www.notion.so/icons/info-alternate_blue.svg" width="10px" /> La requête permet de lancer l’analyse d’une adresse et de recevoir le rapport créer par Tsunami

</aside>

Méthode : **GET**

route : **/tsunami**

Authentification : **Non**

Paramètres : 
- **host=**<<adresse ipv4, ipv6 ou hostname>>
- **plugins=**<<plugin1:plugin2: … or *>>

Réponse : **JSON Object**

exemple : `http://127.0.0.1:3000/tsunami?host=127.0.0.1&plugins=nmap_port_scanner-0.0.1-SNAPSHOT`


### Récupérer la liste des plugins

<aside>
<img src="https://www.notion.so/icons/info-alternate_blue.svg" alt="https://www.notion.so/icons/info-alternate_blue.svg" width="10px" /> La requête permet de récupérer la liste des plugins utilisable par Tsunami

</aside>

Méthode : **GET**

route : **/plugins**

Authentification : **Non**

Paramètres : **Non**

Réponse : **JSON List**

exemple : `http://127.0.0.1:3000/plugins`


# Docker

## Installation

Afin de lancer le serveur back-end avec docker, vous devrez créer un clone du repository du projet et accéder au répertoire **back-the-tsunami**, puis construire une image en ligne de commande :

```bash
docker build --build-arg PORT=3000 -t back-the-tsunami ./ 
```

Vous pouvez définir le port sur le quel tourneras le serveur en modifiant la valeur de **PORT**

Ensuite lancer une image back-the-tsunami avec la commande :

```bash
docker run -p 3000:3000 --name back-the-tsunami -d back-the-tsunami
```

pensez a modifier le port selon votre choix précédent

Voila le serveur back-end est maintenant up vous pouvez maintenant accéder aux requète de l’API avec le l’adresse `http://localhost:3000` depuis le poste ou l’image a été créée

## Détail de fonctionnement

### Stage 1

- Utilisation de l’image **adoptopenjdk/openjdk13:debianslim** pour construire les plugins de Tsunami
- Installation de **git**
- Récupération des dépôts git de **tsunami scanner** et **tsunami plugin**
- Construction des plugins **google**, **community** et **govtech** (facebook ne build pas)
- Construction de Tsunami

### Stage 2

- Utilisation de l’image **adoptopenjdk/openjdk13:debianslim-jre** comme base pour l’image de la partie back
- Récupération de l’argument **PORT**
- Installation de **git**, **nmap**, **ncrack** et **curl**
- Installation de **nodejs** et **npm**
- Ajout des variables d’environment pour le projet
- Copie des fichiers de Tsunami généré dans le Stage 1
- Copie du projet **back-the-tsunami**
- Construction des dépendences **Node** du projet
- Ouverture du port **PORT**
- Lancement du serveur node