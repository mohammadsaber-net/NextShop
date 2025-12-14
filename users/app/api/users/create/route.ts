import bcrypt from "bcryptjs";
import cloudinary from "@/lib/cloudinay";
import { User } from "@/lib/model/user";
import { mongooseConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        await mongooseConnection()
        const formData = await req.formData()
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const phone = formData.get("phone") as string
        const password = formData.get("password") as string
        const address = formData.get("address") as string
        const image = formData.get("image") as File | null
        const oldUser=await User.findOne({email})
        if(oldUser){
            return NextResponse.json({success:false,message:"This Email Is Already Used"})
        }
        let uploadedImages: string = '';
            if (image && image.size > 0) {
                const arrayBuffer = await image.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const upload = await cloudinary.uploader.upload(
                    `data:${image.type};base64,${buffer.toString("base64")}`
                );
                uploadedImages = upload.secure_url;
            }
        let hashedPassword = await bcrypt.hash(password, 10);
        const user=await User.create({name,email,address,password: hashedPassword,phone,role:"CUSTOMER",image:uploadedImages})
        return NextResponse.json({success:true,user})
    } catch (error) {
        return NextResponse.json({success:false,message:(error as Error).message})
    }
}