import mongoose, { Schema } from "mongoose";

const Product = mongoose.model(
    "Product",
    mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        image: String,
        category: {
            type: String,
            required: true,
        },
        description: String,
        guarantee: {
            type: Number,
            required: true,
        },
        color: String,
        price: {
            type: Number,
            required: true,
        },
        available: {
            type: String,
            required: true,
        }
    }, {
        timestamps: true
    })
);

export default Product;