import { Product } from "@/lib/model/products";
import { mongooseConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:any}) {
    try {
        await mongooseConnection()
        const {category}=await params
        console.log(category)
        const products=await Product.find({category:{$in:category}})
        return NextResponse.json({success:true,products})
    } catch (error) {
        console.log("errrrrrrrr",error)
        return NextResponse.json({success:false,message:(error as Error).message})
    }
}