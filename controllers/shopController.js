// const Member = require("../models/Member");

// let shopController = module.exports;

// /********************************************************
//  *              BSSR RELATED METHODS                    *
//  *******************************************************/

// shopController.getSignupMyShop = async (req, res) => {
//     try {
//         console.log("GET: cont/getSignupMyShop");
//         res.render('signup');
//     } catch (err) {
//         console.log(`ERROR, cont/getSignupMyShop, ${err.message}`);
//         res.json({ state: "fail", message: err.message });
//     }
// };

// shopController.signupProcess = async (req, res) => {
//     try {
//       console.log("POST: cont/signup");
//         const data = req.body,
//             member = new Member(),
//             new_member = await member.signupData(data);
//         res.json({ state: "succeed", data: new_member });
//     } catch (err) {
//         console.log(`ERROR, cont/signup, ${err.message}`);
//         res.json({ state: "fail", message: err.message });
//     }
// };

// shopController.getLoginMyShop = async (req, res) => {
//     try {
//         console.log("GET: cont/getLoginMyShop");
//         res.render("login-page");
//     } catch (err) {
//         console.log(`ERROR, cont/getLoginMyShop, ${err.message}`);
//         res.json({ state: "fail", message: err.message });
//     }
// };

// shopController.loginProcess = async (req, res) => {
//     try {
//         console.log("POST: cont/login");
//         const data = req.body,
//             member = new Member(),
//             result = await member.loginData(data);

//         req.session.member = result;
//         req.session.save(function () {
//             result.mb_type ==="ADMIN"
//             ? res.redirect("/shop/all-shop")
//             : res.redirect("/shop/products/menu");
//         });
//     } catch (err) {
//         console.log(`ERROR: cont/login, ${err.message}`);
//         res.json({ state: "failed", message: err.message });
//     }
// };

// shopController.logoutProcess = (req, res) => {
//     try {
//         console.log("GET cont/logout");
//         req.session.destroy(function () {
//             res.redirect("/shop");
//         });
//     } catch (err) {
//         console.log(`ERROR, cont/logout, ${err.message}`);
//         res.json({ state: "fail", message: err.message });
//     }
// };
