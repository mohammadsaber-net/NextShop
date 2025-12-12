import mongoose, { model, models } from "mongoose";
const schema=new mongoose.Schema({
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
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    role:{
        type:String,
        enum:["CUSTOMER","ADMIN","MANAGER"],
        default:"CUSTOMER"
    },
    image:{
        type:String,
        default:"images/defaultProfile.png"
    }
})
export const User = models.User || model("User", schema);
