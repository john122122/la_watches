const path = require("path");
const multer = require("multer");
const uuid = require("uuid");

const product_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/products");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const extension = path.parse(file.originalname).ext;
    const random_name = uuid.v4() + extension;
    cb(null, random_name);
  },
});

module.exports.uploadProductImage = multer({ storage: product_storage });
 