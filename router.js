const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.send("You'r in Home Page");
});

router.get("/menu", function (req, res) {
    res.send("You'r in Menu Page");
});

router.get("/community", function (req, res) {
    res.send("You'r in Community Page");
});

module.exports = router;