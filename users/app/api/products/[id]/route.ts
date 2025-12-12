import { Product } from "@/lib/model/products";
import { mongooseConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:any}){
    try {
        await mongooseConnection()
        const {id}=await params
        const product=await Product.findById(id)
        return NextResponse.json({success:true,product})
    } catch (error) {
        return NextResponse.json({success:false,message:(error as Error).message})
    }
}