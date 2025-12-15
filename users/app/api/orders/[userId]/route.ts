import { Order } from "@/lib/model/order";
import { mongooseConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function GET(req:Request,{params}:{params:any}) {
    try {
        await mongooseConnection()
        const {userId}=await params
        const order=await Order.find({user:userId})
        console.log(order)
        if(!order){
            return NextResponse.json({success:false,message:"orders Not found"})
        }
        return NextResponse.json({success:true,order})
    } catch (error) {
        return NextResponse.json({success:false,message:(error as Error).message})
    }
}