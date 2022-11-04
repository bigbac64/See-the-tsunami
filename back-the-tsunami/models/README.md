# Modèles

# processingRequest

<aside>
<img src="https://www.notion.so/icons/info-alternate_blue.svg" alt="https://www.notion.so/icons/info-alternate_blue.svg" width="10px" /> Ce module permet de traiter ou contrôler certaines requêtes pour que l’API puisent l’exploiter

</aside>

## `tsunamiAddressOption`

Fonction permettant de définir l'option a utilisé pour tsunami, A partir d’une adresse elle détecte la type d’adresse à l’aide des RegEx et retourne une option interprétable par Tsunami

## `pluginsList`

Transforme le json contenant la liste des plugins passé en paramètre, en string exploitable pour les classpath java

## `fileExiste`

Test l’existance d’un fichier 

# commandOS

<aside>
<img src="https://www.notion.so/icons/info-alternate_blue.svg" alt="https://www.notion.so/icons/info-alternate_blue.svg" width="10px" /> Ce module permet de traiter les commande utilisé en shell

</aside>

## `java`

Lance une commande java avec les classpath, la class main et les arguments que vas utiliser la commande le main, en cas d’erreur un fichier de log **java.out** est générer dans la racine du projet

## `ls`

Lance un scan d'un répertoire afin de retourner la liste des fichiers contenu, en cas d’erreur un fichier de log **ls.out** est générer dans la racine du projet

## `rm`

Supprime un fichier, retourne vrai ou faux selon la reussite de la suppresion