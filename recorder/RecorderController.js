const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Adm = require("../classes/controllers/Adm");
const Call = require("../classes/controllers/Call");
const auth = require("../middlewares/auth");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/recorder", auth, (req, res) => {
    Adm.GetAdms().then(adms => {
        var listAdms = Adm.RemoveDuplicates(adms);
        var fields = [{}];
        Call.GetCalls().then(calls => {
            res.render("recorder", { adms: adms, calls: calls, listAdms: listAdms, fields: fields });
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    })
});

router.post("/recorder/filtered", auth, (req, res) => {
    Adm.GetAdms().then(adms => {
        var listAdms = Adm.RemoveDuplicates(adms);
        theme = req.body.darkTheme;
        //dtInicio = req.body.dataInicio + " 00:00:00";
        dtIniField = req.body.dataInicio;
        dtInicio = req.body.dataInicio.replace(/T/, " ");
        dtInicio2 = dtInicio.replace(/-/g, "");
        //dtFim = req.body.dataFim + " 23:59:59";
        dtFimField = req.body.dataFim;
        dtFim = req.body.dataFim.replace(/T/, " ");
        dtFim2 = dtFim.replace(/-/g, "");
        adm = req.body.admHidden;
        cConect = req.body.adm;
        ramal = req.body.ramalHidden;
        grupo = req.body.grupo;
        cota = req.body.cota;
        tel = req.body.telefone;
        tel2 = tel.replace(/-/g, "");
        var fields = [
            {
                dtInicio: dtIniField,
                dtFim: dtFimField,
                adm: adm,
                cConect: cConect,
                ramal: ramal,
                grupo: grupo,
                cota: cota,
                tel: tel,
                theme: theme
            }
        ]
        Call.GetCallsFiltered(dtInicio2, dtFim2, adm, ramal, grupo, cota, tel2).then(calls => {
            res.render("recorder", { adms: adms, calls: calls, listAdms: listAdms, fields: fields });
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;