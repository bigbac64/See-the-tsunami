const os = require("child_process");
const util = require('util');
const fs = require('fs');

/**********************************************************************************************************************
 * lance une commande java
 * @param classpath les dépendances à utiliser
 * @param main la class java principale a lancer
 * @param options les options supplémentaire
 */
async function java(classpath, main, ...options ){
    const command = `java -cp ${classpath} ${main} ` + [...options].join(' ');
    console.log(command);
    try {
        os.execSync(command);
    } catch (error) {
        fs.writeFileSync('java.out', `Status Code: ${error.status} with '${error.message}'`);
    }
}

/**********************************************************************************************************************
 * Lance un scan d'un répertoire afin de retourner la liste des fichiers contenu
 * @param directoryPath le chemin du répertoire à scanner
 * @returns {Promise<boolean|*>} la liste des fichier sinon false
 */
async function ls(directoryPath){
    try {
        return fs.readdirSync(directoryPath);
    }catch (error) {
        fs.writeFileSync('ls.out', `Status Code: ${error.status} with '${error.message}'`);
        return false
    }
}

/**********************************************************************************************************************
 * Supprime un fichier
 * @param path le chemin du fichier a supprimer
 * @returns {boolean} le succes de la commande
 */
function rm(path){
    if (!fs.unlinkSync(path)) {
        return true;
    } else {
        return false;
    }
}


module.exports = {java, ls, rm}