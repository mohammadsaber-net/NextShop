import cloudinary from "@/lib/cloudinay";
import { User } from "@/lib/model/user";
import { mongooseConnection } from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import { NextResponse} from "next/server";
export async function GET() {
  await mongooseConnection()
    const data=await User.find()
  return NextResponse.json({ success: true,data });
}
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image") as File;
    const phone = formData.get("phone") as string;
    const role = formData.get("role") as string;
    let uploadedImages: string = "";
    if(image){
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const upload = await cloudinary.uploader.upload(
        `data:${image.type};base64,${buffer.toString("base64")}`
        );
        uploadedImages = upload.secure_url;
    }
  await mongooseConnection()
  const existingEmail= await User.findOne({email})
  if(existingEmail){
    return NextResponse.json({ success: false, message: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({name,email,password: hashedPassword,phone,role,image:uploadedImages})
  
  return NextResponse.json({ success: true});
} catch (error) {
    console.error("POST /api/user ERRtttttttttttttttttttttttttOR:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
