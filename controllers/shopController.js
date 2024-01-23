const Member = require("../models/Member");

let shopController = module.exports;

shopController.getMyShopData = async (req, res) => {
    try {
        console.log("GET: cont/getMyShopData");

        res.render('shop-menu');
    } catch (err) {
        console.log(`ERROR, cont/getMyShopData, ${err.message}`);
        res.json({ state: "fail", message: err.message });
    }
};


/********************************************************
*              BSSR RELATED METHODS                    *
********************************************************/

shopController.getSignupMyShop = async (req, res) => {
    try {
        console.log("GET: cont/getSignupMyShop");
        res.render('signup');
    } catch (err) {
        console.log(`ERROR, cont/getSignupMyShop, ${err.message}`);
        res.json({ state: "fail", message: err.message });
    }
};

shopController.signupProcess = async (req, res) => {
    try {
      console.log("POST: cont/signup");
        const data = req.body,
            member = new Member(),
            new_member = await member.signupData(data);
        
        req.session.member = new_member;
        res.redirect("/shop/products/menu");
        
    } catch (err) {
        console.log(`ERROR, cont/signup, ${err.message}`);
        res.json({ state: "fail", message: err.message });
    }
};

shopController.getLoginMyShop = async (req, res) => {
    try {
        console.log("GET: cont/getLoginMyShop");
        res.render("login-page");
    } catch (err) {
        console.log(`ERROR, cont/getLoginMyShop, ${err.message}`);
        res.json({ state: "fail", message: err.message });
    }
};

shopController.loginProcess = async (req, res) => {
    try {
        console.log("POST: cont/login");
        const data = req.body,
            member = new Member(),
            result = await member.loginData(data);

        // req.session.member = result;
        // req.session.save(function () {
        //     result.mb_type ==="ADMIN"
        //     ? res.redirect("/shop/all-shop")
        //     : res.redirect("/shop/products/menu");
        // });

        req.session.member = result;
        req.session.save(function () {
            res.redirect("/shop/products/menu");
        });
    } catch (err) {
        console.log(`ERROR: cont/login, ${err.message}`);
        res.json({ state: "failed", message: err.message });
    }
};

shopController.logoutProcess = (req, res) => {
    try {
        console.log("GET cont/logout");
        req.session.destroy(function () {
            res.redirect("/shop");
        });
    } catch (err) {
        console.log(`ERROR, cont/logout, ${err.message}`);
        res.json({ state: "fail", message: err.message });
    }
};

shopController.validateAuthShop = (req, res, next) => {
    if (req.session?.member?.mb_type === "SHOP") {
        req.member = req.session.member;
        next();
    } else 
    res.json({
        state: "fail", 
        message: "only authenticated members with shop type",
    });
};

shopController.checkSessions = (req, res) => {
    if (req.session?.member) {
        res.json({ state: "succeed", data: req.session.member });
    } else {
        res.json({ state: "fail", message: "You are not authenticated" });
    }
};