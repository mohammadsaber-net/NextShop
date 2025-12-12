import { Category } from "@/lib/model/category";
import { mongooseConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function GET() {
    try {
        await mongooseConnection()
        const data=await Category.find().populate("parent")
        return NextResponse.json({success:true,data})
    } catch (error) {
        return NextResponse.json({success:false,message:(error as Error).message})
    }
}
export async function POST(req: Request){
    try {
        await mongooseConnection()
        const {name ,properties, parentCategories}=await req.json() as any
        let property=properties&&properties.map((item:any)=>({name:item.name,values:item.values.split(" ")}))
        if(!name){
            return NextResponse.json({success:false,message:"failed to send category"})
        }
        const data=await Category.create({name,properties:property||undefined,parent:parentCategories||undefined})
        return NextResponse.json({success:true,data})
    } catch (error) {
        return NextResponse.json({success:false,message:(error as Error).message})
    }
}