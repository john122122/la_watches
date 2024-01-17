const Definer = require("../lib/mistake");
const Member = require("../models/Member");
// const Product = require("../models/Product");
const assert = require("assert");
// const Restaurant = require("../models/Restaurant");


let shopController = module.exports;

shopController.getRestaurants = async (req, res) => {
    try {
        console.log("GET: cont/getRestaurants");
        const data = req.query,
            restaurant = new Restaurant(),
            result = await restaurant.getRestaurantsData(req.member, data);
        res.json({state: "success", data: result });    
    } catch (err) {
        console.log(`ERROR, cont/getRestaurants, ${err.message}`);
        res.json({ state: "fail", message: err.message });
    }
};

shopController.getChosenRestaurant = async (req, res) => {
    try {
        console.log("GET: cont/getChosenRestaurant");
        const id = req.params.id,
            restaurant = new Restaurant(),
            result = await restaurant.getChosenRestaurantData(req.member, id);

        res.json({ state: "success", data: result });
    } catch (err) {
        console.log(`ERROR, cont/getChosenRestaurant, ${err.message}`);
        res.json({ state: "fail", message: err.message });
    }
};

/********************************************************
 *              BSSR RELATED METHODS                    *
 *******************************************************/

// shopController.home = (req, res) => {
//     try {
//         console.log('GET: cont/home');
//         res.render('home-page');
//     } catch(err) {
//         console.log(`ERROR, cont/home, ${err.message}`);
//         res.json({ state: "fail", message: err.message });
//     }
// }

// shopController.getMyShopProduct = async (req, res) => {
//     try {
//         console.log("GET: cont/getMyShopProduct");
//         // TODO: Get my restaurant products
//         const product = new Product();
//         const data = await product.getAllProductsDataResto(res.locals.member);
//         res.render("restaurant-menu", { restaurant_data: data });
//     } catch (err) {
//         console.log(`ERROR, cont/getMyRestaurantProduct, ${err.message}`);
//         res.redirect("/resto");
//     }
// };

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
      console.log("POST: cont/signupProcess");
      assert(req.file, Definer.general_err3);

        let new_member = req.body;
        new_member.mb_type = "SHOP";
        new_member.mb_image = req.file.path;
        
          const member = new Member();
          const result = await member.signupData(new_member);
          assert(req.file, Definer.general_err1);

        req.session.member = result;
        res.redirect("/shop/products/menu");
    } catch (err) {
        console.log(`ERROR, cont/signupProcess, ${err.message}`);
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
        console.log("POST: cont/loginProcess");
        const data = req.body,
            member = new Member(),
            result = await member.loginData(data);

        req.session.member = result;
        req.session.save(function () {
            result.mb_type ==="ADMIN"
            ? res.redirect("/shop/all-shop")
            : res.redirect("/shop/products/menu");
        });
    } catch (err) {
        console.log(`ERROR: cont/loginProcess, ${err.message}`);
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

// shopController.validateAuthShop = (req, res, next) => {
//     if (req.session?.member?.mb_type === "SHOP") {
//         req.member = req.session.member;
//         next();
//     } else 
//     res.json({
//         state: "fail", 
//         message: "only authenticated members with restaurant type",
//     });
// };

// shopController.checkSessions = (req, res) => {
//     if(req.session?.member) {
//         res.json({ state: 'success', data: req.session.member })
//     } else {
//         res.json({ state: "fail", message: "You are not authenticated" });
//     }
// };

// shopController.validateAdmin = (req, res, next) => {
//     if (req.session?.member?.mb_type === "ADMIN") {
//         req.member = req.session.member;
//         next();
//     } else {
//         const html = `<script>
//             alert('Admin page: Permission denied')
//             window.location.replace('/resto')
//         </script>`;
//     res.end(html);
//     } 
// };

// shopController.getAllShops = async (req, res) => {
//    try {
//         console.log("GET: cont/getAllShops");

//         const shop = new Shop;
//         const shop_data = await shop.getAllShopsData();
//         res.render("all-shops", {shops_data: shops_data });       
//     } catch (err) {
//         console.log(`ERROR, cont/getAllShops, ${err.message}`);
//         res.json({ state: "fail", message: err.message });
//     }
// };

// shopController.updateShopByAdmin = async (req, res) => {
//     try {
//         console.log("GET cont/updateShopByAdmin");

//         const shop = new Shop();
//         const result = await shop.updateShopByAdminData(req.body);
//         await res.json({ state: "success", data: result });

//     } catch (err) {
//         console.log(`ERROR, cont/updateShopByAdmin, ${err.message} `);
//         res.json({ state: "fail", message: err.message });
//     }
// };