const express = require("express");
const router_bssr = express.Router();
const shopController = require("./controllers/shopController");
const productController = require("./controllers/productController");
const uploader_product = require("./utils/upload-multer")("products");

/**********************************
 *          REST EJS              *
 *********************************/

// member routers
router_bssr
    .get("/signup", shopController.getSignupMyShop)
    .post("/signup", shopController.signupProcess);

router_bssr
    .get("/login", shopController.getLoginMyShop)
    .post("/login", shopController.loginProcess);

router_bssr
    .get("/logout", shopController.logoutProcess);
    
router_bssr
    .get("/check-me", shopController.checkSessions);


router_bssr
    .get("/products/menu", shopController.getMyShopData);

router_bssr.post("/products/create",
    shopController.validateAuthShop,
    uploader_product.array("product_images", 5),
    productController.addNewProduct);

router_bssr.post("products/edit/:id", productController.updateChosenProduct);


module.exports = router_bssr;