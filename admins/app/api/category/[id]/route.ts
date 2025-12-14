import { Category } from "@/lib/model/category";
import { mongooseConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: any  }) {
  try {
    await mongooseConnection();
    const {id}=await params
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true});
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message });
  }

}
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await mongooseConnection();
    const {name,properties,parentCategories}=await req.json()
    let property=properties&&properties.map((item:any)=>({name:item.name,values:item.values.split(" ")}))
    const {id}=await params
    await Category.findByIdAndUpdate(id,{name,properties:property||undefined,parent:parentCategories||undefined},{new:true});
    return NextResponse.json({ success: true});
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message });
  }

}