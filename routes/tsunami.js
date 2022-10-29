const express = require('express');
const fs = require('fs');
const router = express.Router();
const plugins = require("../modele/plugins");
const command = require("../modele/OSCommand");
const control = require("../modele/control");

/*Appelle GET qui permet de lancer l'analyse d'une adresse et de récupérer le rapport généré par tsunami*/

router.get('/', async function (req, res, next) {
    // vérification de l'existance du parametre host
    if(req.query.host === undefined)
        return next({
            status:403,
            msg:"la requête necessite host"
        });

    // vérification du contenu du parametre plugins
    let pluginsList = req.query.plugins;
    if(pluginsList === undefined || pluginsList === "")
        pluginsList = "*";

    const addressOption = control.tsunamiAddressOption(req.query.host);
    const classpath = `${process.env.TSUNAMI_PATH}/tsunami.jar:` + plugins.listRequest(pluginsList);

    // vérifivation de la validité de l'adresse (ne vérifie pas si elle existe)
    if(addressOption === undefined)
        return next({
            status:500,
            msg:`l'adresse '${req.query.host}' n'est pas valide`
        });

    // Lancement de tsunami
    if (await command.java(
        classpath,
        "com.google.tsunami.main.cli.TsunamiCli",
        addressOption,
        "--scan-results-local-output-format=JSON",
        `--scan-results-local-output-filename=${process.env.RESULT_PATH}/tsunami-result.json`)) {
        let file = fs.readFileSync(`${process.env.RESULT_PATH}/tsunami-result.json`);
        // Success
        res.json(JSON.parse(file));
    } else {
        // Failed
        return next({
            status:500,
            msg:"la commande n'a pu être exécuté"
        });
    }
});

module.exports = router;