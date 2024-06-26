var express = require("express");
var router = express.Router();
var exe = require("./../connection");

router.get("/", function (req, res) {
    res.render("user/Home.ejs");
});
router.get("/faculty",async function (req, res) {
    var faculty_detail = await exe(`SELECT * FROM faculty_detail`)
    var obj = {"faculty_detail":faculty_detail}
    res.render("user/faculty.ejs",obj);
});

router.get("/about", function (req, res) {
    res.render("user/About.ejs");
});

router.get("/addmission", function (req, res) {
    res.render("user/Addmission.ejs");
});

router.get("/application", function (req, res) {
    res.render("user/Application.ejs");
});
router.get("/contact", function (req, res) {
    res.render("user/Contact.ejs");
});
module.exports = router;