import bcrypt from "bcryptjs";
import cloudinary from "@/lib/cloudinay";
import { User } from "@/lib/model/user";
import { mongooseConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:any}){
    try {
        await mongooseConnection()
        const {id}=await params
        const oldUser = await User.findById(id);
        if (!oldUser) {
            return NextResponse.json({ success: false, message: "User not found" });
        }
        const formData = await req.formData()
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const phone = formData.get("phone") as string
        const password = formData.get("password") as string
        const address = formData.get("address") as string
        const image = formData.get("image") as File | null
        let uploadedImages: string = oldUser.image;
            if (image && image.size > 0) {
                const arrayBuffer = await image.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const upload = await cloudinary.uploader.upload(
                    `data:${image.type};base64,${buffer.toString("base64")}`
                );
                uploadedImages = upload.secure_url;
            }
        let hashedPassword = oldUser.password;
        if (password && password.trim() !== "") {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        const user=await User.findByIdAndUpdate(id,
            {name,email,address,password: hashedPassword,phone,role:"CUSTOMER",image:uploadedImages}
            ,{ new: true, runValidators: true }
        )
        return NextResponse.json({success:true,user})
    } catch (error) {
        return NextResponse.json({success:false,message:(error as Error).message})
    }
}