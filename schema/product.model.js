const mongoose = require("mongoose");
const {
    product_collection_enums,
    product_status_enums,
    product_size_enums,
    product_volume_enums,
} = require("../lib/config");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        product_name: {
            type: String,
            required: true,
        },
        product_collection: {
            type: String,
            required: true,
            enum: {
                values: product_collection_enums,
                message: "{VALUES} is not among permitted values",
            },
        },
        product_status: {
            type: String,
            required: false,
            default: "PROCESS",
            enum: {
                values: product_status_enums,
                message: "{VALUES} is not among permitted values",
            },
        },
        product_price: {
            type: Number,
            required: true,
        },
        product_discount: {
            type: Number,
            required: true,
            default: 0,
        },
        product_left_cnt: {
            type: Number,
            required: true,
        },
        product_size: {
            type: String,
            required: function () {
                const sized_list = [
                    "s",
                    "m",
                    "l",
                    "ml",
                    "set"
                ];
                return sized_list.includes(this.product_collection);
            },
            default: "normal",
            enum: {
                values: product_size_enums,
                message: "{VALUES} is not among permitted values",
            },
        },
        product_volume: {
            type: String,
            required: function () {
                return this.product_collection === "perfume";
            },
            default: 1,
            enum: {
                values: product_volume_enums,
                message: "{VALUES} is not among permitted values",
            },
        },
        product_description: {
            type: String,
            required: false,
        },
        product_images: {
            type: Array,
            required: true,
            default: [],
        },
        product_views: {
            type: Number,
            required: false,
            default: 0,
        },
        product_likes: {
            type: Number,
            required: false,
            default: 0,
        },
        shop_mb_id: {
            type: Schema.Types.ObjectId,
            ref: "Member",
            required: false,
        },
    },
    { timestamps: true }
);

productSchema.index(
    {
        shop_mb_id: 1,
        product_name: 1,
        product_size: 1,
        product_volume: 1,
    },
    { unique: true }
);

module.exports = mongoose.model("Product", productSchema);