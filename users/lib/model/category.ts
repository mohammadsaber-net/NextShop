import mongoose, { model, models } from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    properties: {type:[Object]},
    parent:{type:mongoose.Types.ObjectId,ref:'NextCategory',default:null}
});
export const Category=models.NextCategory || model("NextCategory", schema);