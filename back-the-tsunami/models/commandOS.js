const os = require("child_process");
const util = require('util');

/**
 * lance une commande java
 * @param classpath les dépendances à utiliser
 * @param main la class java principale a lancer
 * @param options les options supplémentaire
 */
async function java(classpath, main, ...options ){
    let command = `java -cp ${classpath} ${main} ` + [...options].join(' ');
    console.log(command);
    const asFunc = util.promisify((callback) =>{
        os.exec(command, (error, stdout, stderr) =>{
            callback(null, error, stdout, stderr);
        })
    });

    const result = await asFunc();
    if (result != null) {
        console.log(`error: ${result}`);
        return false;
    }
    return true;

}

module.exports = {java}