import { Product } from "@/lib/model/products";
import { mongooseConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
 try {
  await mongooseConnection()
  const {searchParams}=new URL(req.url)
  const Ids=searchParams.getAll("Ids[]")    
  const data=await Product.find({_id:{$in:Ids}})
  return NextResponse.json({ success: true,data });
 } catch (error) {
  console.log("errrrrrrrrrrrrrr",error)
 }
}