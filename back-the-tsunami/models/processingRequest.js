function tsunamiAddressOption(address){
    const ipv4 = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/gm;
    const ipv6 = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gm;
    const host = /(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}/gm;

    if(ipv4.test(address))
        return `--ip-v4-target=${address}`;

    if(ipv6.test(address))
        return `--ip-v6-target=${address}`;

    if(host.test(address))
        return `--hostname-target=${address}`
}

/**********************************************************************************************************************
 * Transforme le json contenant la liste des plugins en string exploitable pour les classpath java
 * @param plugins
 */
function pluginsList(plugins){
    let classpath = "";

    // on parcoure tous les plugins renseigné
    plugins.split(':').forEach(plugin => {

        classpath += `${process.env.PLUGIN_PATH}/${plugin}.jar:`;
    })

    // on retire le dernier ':'
    return classpath.substring(0, classpath.length-1);
}

module.exports = {tsunamiAddressOption, pluginsList}
