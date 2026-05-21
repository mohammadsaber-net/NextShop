import { Product } from "@/lib/model/products";
import { mongooseConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
 try {
  await mongooseConnection()
  const [data]=await Product.aggregate([
    {$sample:{size:1}}
  ])
  return NextResponse.json(
    { success: true,data },
    {
        headers:{
            "Cache-Control":
            "public, s-maxage=86400, stale-while-revalidate=59"
        }
    }
);
 } catch (error) {
  console.log("errrrrrrrrrrrrrr",error)
 }
}