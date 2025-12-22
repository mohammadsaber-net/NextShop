import cloudinary from "@/lib/cloudinay";
import { Product } from "@/lib/model/products";
import { mongooseConnection } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function GET(req: Request, {params}:{params:any}) {
  try {
    await mongooseConnection();
    const {id}=await params
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ success: false});
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: (error as Error).message });
  }
}
export async function PATCH(req: Request, {params}:{params:any} ) {
  try {
    await mongooseConnection();
    const formData = await req.formData();
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const quantity = formData.get("quantity") as string;
    const category = formData.get("category") as string;
    const categoryParent = formData.get("categoryParent") as string;
    const properties = JSON.parse(formData.get("properties") as string);
    const images = formData.getAll("images") as File[];
    const existingImages = formData.getAll("existingImages") as string[];
    const session=await getServerSession(authOptions) as any
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
      
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }
    let uploadedImages: string[] = [];
    if(images || existingImages){
      if((existingImages.length + images.length) >5){
        return NextResponse.json({success:false,message:"number of images shouldn't exceed 5 Images"})
      }
      for (const img of images) {
        const arrayBuffer = await img.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const upload = await cloudinary.uploader.upload(
          `data:${img.type};base64,${buffer.toString("base64")}`
        )
        uploadedImages.push(upload.secure_url);
      }
    }else{
      return NextResponse.json({ success: false,message:"please upload at least one image"});
    }
    const newImages=[...uploadedImages,...existingImages]
    if (!quantity) {
      return NextResponse.json({ success: false, message: "add at least one" });
    }
    const data={title,description,quantity,price,categoryParent:categoryParent||null,properties:properties||null,category,images:newImages}
    const {id}=await params
    const product = await Product.findByIdAndUpdate(id,data,{ new: true });
    if (!product) {
      return NextResponse.json({ success: false});
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message });
  }}
export async function DELETE(req: Request, {params}:{params:any}) {
  try {
    await mongooseConnection();
    const session=await getServerSession(authOptions) as any
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }
    const {id}=await params
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true});
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message });
  }

}