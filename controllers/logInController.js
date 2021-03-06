const express = require("express");
const router = express.Router();
const db = require("../models")
const bcrypt = require("bcrypt");


router.get("/login", function (req, res) {
    if(req.session.user){
        res.redirect('/movies')
    }else{
        res.render("login");
    }
})

router.post("/login", function (req, res) {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUser => {
        if (bcrypt.compareSync(req.body.password, dbUser.password)) {
            req.session.user = {
                email: dbUser.email,
                id: dbUser.id
            };

            res.redirect('/movies')
        } else {
            res.status(404).send("not working")
        }
    })
})
module.exports = router;