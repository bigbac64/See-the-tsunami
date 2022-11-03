const express = require('express');
const router = express.Router();
const command = require("../models/commandOS");

/*Appelle GET qui permet de récupérer la liste des plugins pour tsunami*/
router.get('/', async function(req, res, next) {
    const files = await command.ls(process.env.PLUGIN_PATH);
    if(files){
        res.send(await command.ls(process.env.PLUGIN_PATH));
    }else {
        return next({
            status:500,
            msg:"la commande ls n'a pu être exécuté"
        });
    }
});

module.exports = router;