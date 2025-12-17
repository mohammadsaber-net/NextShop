import { model, models, Schema, Types } from "mongoose";

const schema=new Schema({
    user: {
      type: Types.ObjectId,
      ref: "User", 
      required: true
    },
    order:[Object],
    payment:{
        type:Boolean
    },
    paymobId: {
        type: Number,
        index: true
    },
    payMethod:{
        type:String,
        enum:["card","cash"],
        default:"card"
    }
},{
    timestamps:true
})
export const Order=models.NextOrder||model("NextOrder",schema)