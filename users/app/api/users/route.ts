import { User } from "@/lib/model/user";
import { mongooseConnection } from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(req:Request) {
    try {
        await mongooseConnection()
        const {email,password}=await req.json()
        const user=await User.findOne({email:{$in:email}})
        if(!user){
            return NextResponse.json({success:false,message:"user Not Found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({success:false,message:"password is incrrect"})
        }
        const userObj = user.toObject();
        delete userObj.password;
        return NextResponse.json({success:true,user:userObj})
    } catch (error) {
        return NextResponse.json({success:false,message:(error as Error).message})
    }
}