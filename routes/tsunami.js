const express = require('express');
const fs = require('fs');
const router = express.Router();
const plugins = require("../modele/plugins");
const command = require("../modele/OSCommand");
const control = require("../modele/control");

/**/
router.get('/', async function (req, res, next) {
    const classpath = `${process.env.TSUNAMI_PATH}/tsunami.jar:` + plugins.listRequest(req.query.plugins);

    if (await command.java(
        classpath,
        "com.google.tsunami.main.cli.TsunamiCli",
        control.tsunamiAddressOption(req.query.host),
        "--scan-results-local-output-format=JSON",
        `--scan-results-local-output-filename=${process.env.RESULT_PATH}/tsunami-result.json`)) {
        let file = fs.readFileSync(`${process.env.RESULT_PATH}/tsunami-result.json`);
        res.json(JSON.parse(file));
    } else {
        res.json("error");
    }
});

module.exports = router;