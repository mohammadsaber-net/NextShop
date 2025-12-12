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
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
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
