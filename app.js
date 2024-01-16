console.log("Start modify WebSite");
const express = require("express");
const app = express();

// Call MongoDB 
const db = require("./server").db();
const mongodb = require("mongodb");

// 1. Enter codes
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Session codes

// 3. Views codes
app.set("views", "views");
app.set("view engine", "ejs");

// 4. Routing codes

module.exports = app;