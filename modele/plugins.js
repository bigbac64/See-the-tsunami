let control = require("./control");

/**
 * Transforme le json contenant la liste des plugins en string exploitable pour les classpath java
 * @param plugins
 */
function listRequest(plugins){
    let classpath = "";

    // on parcoure tous les plugins renseigné
    plugins.split(':').forEach(plugin => {

        classpath += `${process.env.PLUGIN_PATH}/${plugin}.jar:`;
    })

    // on retire le dernier ':'
    return classpath.substring(0, classpath.length-1);
}

module.exports = {listRequest}