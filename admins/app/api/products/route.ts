import cloudinary from "@/lib/cloudinay";
import { Product } from "@/lib/model/products";
import { mongooseConnection } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse} from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
export async function GET(req: Request) {
 try {
  await mongooseConnection()
  const res = new Response();
  const data=await Product.find()
  return NextResponse.json({ success: true,data });
 } catch (error) {
  console.log("errrrrrrrrrrrrrr",error)
 }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    await mongooseConnection()
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const quantity = formData.get("quantity") as string;
    const category = formData.get("categoryParent") as string;
    const categoryParent = formData.get("categoryParent") as string;
    const properties = JSON.parse(formData.get("properties") as string);
    const images = formData.getAll("images") as File[];
    const session=await getServerSession(authOptions) as any
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }
    let uploadedImages: string[] = [];
    if(images.length>0){
      for (const img of images) {
        const arrayBuffer = await img.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const upload = await cloudinary.uploader.upload(
          `data:${img.type};base64,${buffer.toString("base64")}`
        );
        uploadedImages.push(upload.secure_url);
      }
    }else{
      return NextResponse.json({ success: false,message:"please upload at least one image"});
    }
    if (!quantity) {
          return NextResponse.json({ success: false, message: "add at least one" });
        }
  const product=await Product.create({title,description,quantity,category,price,categoryParent:categoryParent||null,properties:properties||null,images:uploadedImages})
  
  return NextResponse.json({ success: true,product});
} catch (error) {
    console.error("POST /api/products ERRtttttttttttttttttttttttttOR:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
