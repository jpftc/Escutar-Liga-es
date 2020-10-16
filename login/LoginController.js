const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const session = require("express-session");
const Users = require("../classes/controllers/Users");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
    res.render("login")
});

router.post("/authenticate", (req, res) => {
    var login = req.body.user;
    var password = req.body.password;

    Users.GetUser(login).then(user => {
        if (user != []) {

            var passwordBd = user[0].senha.trim();

            if (password == passwordBd) {
                req.session.user = {
                    user: user[0].nome
                }
                res.redirect("/recorder")
            } else {
                res.redirect("/")
            }
        } else {
            res.redirect("/")
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