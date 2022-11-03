const express = require('express');
const fs = require('fs');
const router = express.Router();
const command = require("../models/commandOS");
const control = require("../models/processingRequest");

/*Appelle GET qui permet de lancer l'analyse d'une adresse et de récupérer le rapport généré par tsunami*/
router.get('/', async function (req, res, next) {
    const pathResult = `${process.env.RESULT_PATH}/tsunami-result.json`;

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

    console.log(pluginsList);

    const addressOption = control.tsunamiAddressOption(req.query.host);
    const classpath = `${process.env.TSUNAMI_PATH}/tsunami.jar:` + control.pluginsList(pluginsList);

    // vérifivation de la validité de l'adresse (ne vérifie pas si elle existe)
    if(addressOption === undefined)
        return next({
            status:500,
            msg:`l'adresse '${req.query.host}' n'est pas valide`
        });

    if(control.fileExiste(pathResult) && !command.rm(pathResult)){
        return next({
            status:500,
            msg:`une erreur sur la supression de l'ancien résultat a échoué`
        });
    }

    // Lancement de tsunami
    await command.java(
        classpath,
        "com.google.tsunami.main.cli.TsunamiCli",
        addressOption,
        "--scan-results-local-output-format=JSON",
        `--scan-results-local-output-filename=${pathResult}`);

    
    if(!control.fileExiste(pathResult)) {
        return next({
            status: 500,
            msg: "la commande java n'a fournie aucun résultat"
        });
    }

    let file = fs.readFileSync(pathResult);
    res.json(JSON.parse(file));
});

module.exports = router;