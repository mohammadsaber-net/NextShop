import { model, models, Schema } from "mongoose";

const schema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    order:[Object],
    payment:Boolean
},{
    timestamps:true
})
export const Order=models.NextOrder||model("NextOrder",schema)