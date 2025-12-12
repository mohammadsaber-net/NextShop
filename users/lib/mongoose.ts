import mongoose from "mongoose";
export function mongooseConnection(){
    const url=process.env.MONGODB_URI!
    if(mongoose.connection.readyState===1) return
    return mongoose.connect(url)
}