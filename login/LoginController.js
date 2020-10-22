const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Users = require("../classes/controllers/Users");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
    err = [
        {
            err: false
        }
    ]
    res.render("login", {err: err})
});

router.post("/authenticate", (req, res) => {
    var login = req.body.user;
    var password = req.body.password;

    Users.GetUser(login).then(user => {
        if (user != []) {

            var passwordBd = user[0].senha.trim();

            if (password == passwordBd) {
                req.session.user = {
                    username: user[0].nome
                }
                res.redirect("/recorder")
            } else {
                err = [
                    {
                        err: true
                    }
                ]
                res.render("login", {err: err})
            }
        } else {
            res.render("login", {err: err})
        }
    }).catch(err => {
        console.log(err);
    })

});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
});

module.exports = router;