import { Order } from "@/lib/model/order";
import { Product } from "@/lib/model/products";
import { User } from "@/lib/model/user";
import { mongooseConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function POST(req: Request){
    try {
      await mongooseConnection()
      let {name,email,payMethod,password,address,phone,first,product}=await req.json()
      console.log(product)
      let existUser=await User.findOne({email:email})
      if(first&& !existUser){
        return NextResponse.json({success:false,message:"user not found"})
      }
      if(existUser){
        name =existUser.name
        password =existUser.password
        address =existUser.address
        phone =existUser.phone 
      }
      if(!name||!password||!address||!phone){
        return NextResponse.json(
          {success:false,
          message:"data not completed please check your name, password, phone or address"})
      }
      const productInfo=await Product.find({_id:{$in:product}})
      let order=[]
      for (let index = 0; index < productInfo.length; index++) {
        const data={
            _id:productInfo[index]._id,
            title:productInfo[index].title,
            price:productInfo[index].price,
            amount:product.filter((id:any)=>id===productInfo[index]._id.toString()).length
        }
        order.push(data)
      }
      if(!existUser){
        existUser=await User.create({
          name,email,phone,address,image:"images/defaultProfile.png"
          ,password:password||"gold123",role:"CUSTOMER"
        })
      }
      const OrderId=await Order.create({payMethod:payMethod||"card",user:existUser._id,paymobId:123,order,payment:false})
      console.log(OrderId)
      const confirm={email,OrderId:OrderId._id,name,order,phone,address}
      return NextResponse.json({success:true,confirm})  
    } catch (error) {
      console.log("errorrrrrrrrrrrrrrr",error)
        return NextResponse.json({success:true,message:(error as Error).message}) 
    }
}