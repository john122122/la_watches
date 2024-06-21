const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");

/**********************************
 *          REST API              *
 *********************************/

// member routers
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get("/member/:id",
    memberController.retrieveAuthMember,
    memberController.getChosenMember
)

// others 
router.get("/menu", function (req, res) {
    res.send("You'r in Menu Page");
});

router.get("/community", function (req, res) {
    res.send("You'r in Community Page");
});

module.exports = router;