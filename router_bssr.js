const express = require("express");
const router_bssr = express.Router();
const shopController = require("./controllers/shopController");
const productController = require("./controllers/productController");
const uploader_product = require("./utils/upload-multer")("products");
const uploader_members = require("./utils/upload-multer")("members");

/**********************************
 *          REST EJS              *
 *********************************/

// member routers
router_bssr
    .get(
        "/", shopController.home);

router_bssr
    .get(
        "/signup",
        shopController.getSignupMyShop)
    .post(
        "/signup",
        uploader_members.single("shop_img"),
        shopController.signupProcess);

router_bssr
    .get(
        "/login",
        shopController.getLoginMyShop)
    .post(
        "/login",
        shopController.loginProcess);

router_bssr
    .get(
        "/logout",
        shopController.logoutProcess);
    
router_bssr
    .get(
        "/check-me",
        shopController.checkSessions);

router_bssr
    .get(
        "/products/menu",
        shopController.getMyShopProducts);

router_bssr
    .post(
        "/products/create",
        shopController.validateAuthShop,
        uploader_product.array("product_images", 5),
        productController.addNewProduct
);

router_bssr
    .post(
        "/products/edit/:id",
        shopController.validateAuthShop,
        productController.updateChosenProduct
);

router_bssr
    .get(
        "/all-shop",
        shopController.validateAdmin,
        shopController.getAllShop
);

router_bssr
    .post(
        "/all-shop/edit",
        shopController.validateAdmin,
        shopController.updateShopByAdmin
);

// router_bssr
//  .post(
//   "/events",
//   shopController.validateAuthShop,
//   eventController.eventChosenProduct
// );

module.exports = router_bssr;