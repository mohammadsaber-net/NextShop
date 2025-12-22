import mongoose, { model, models } from "mongoose";
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    images: [
        { 
            type: String, 
            required: true
         }
    ],
    quantity:{
        type:Number,
        required: true
    },
    categoryParent:{type: String}, 
    properties: [{type:Object}]

});
export const Product=models.NextProduct || model("NextProduct", schema);