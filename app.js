console.log("Start modify WebSite");
const express = require("express");
const app = express();
const router = require("./router.js");
const router_bssr = require("./router_bssr.js");

// 1. Enter codes
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Session codes

// 3. Views codes
app.set("views", "views");
app.set("view engine", "ejs");

// 4. Routing codes
app.use("/", router);
app.use("/shop", router_bssr);

module.exports = app;