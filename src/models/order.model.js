import mongoose, { Schema } from "mongoose";

const Order = mongoose.model(
    "Order",
    mongoose.Schema({
        name: {
            type: String
        },
        phone: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            require: true,
        },
        cart: {
            type: Array,
            required: true
        },
        payMethod: {
            type: String,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: Number,
            required: true
        }
    }, {
        timestamps: true
    })
);

export default Order;