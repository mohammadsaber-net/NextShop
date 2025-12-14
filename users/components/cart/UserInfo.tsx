"use client"

import { api } from "@/lib/axios";
import { removeAll } from "@/redux/slices/cart";
import { RootState } from "@/redux/store";
import { UserInfoSchema } from "@/validations/UserInfo"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm} from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loading2 from "../animations/Loading2";
type Props={
  setIframeUrl:any,
  setName:any
}
export default function UserInfo({setIframeUrl,setName}:Props) {
  const [loading,setLoading]=useState(false)
  const [firstOrder,setFristOrder]=useState(false)
  const cartIds=useSelector((state:RootState)=>state?.cart)
    const {
    register,
    handleSubmit,
    formState:{errors ,isValid},
    reset
  }=useForm({
    resolver:zodResolver(UserInfoSchema),
    mode:"all"
  })
  async function handlePay(
    amount: any,email: any,name: any,phone: 
    any,address: any) {
    const {data} = await api.post("/api/paymob/token",
      {
        amount,
        email,
        name,
        phone,
        address 
      },);
      setIframeUrl(data.iframe_url);
      setName(name)
      toast.success(`mr/ms ${name} Please Complete Your Payment`)
    }
  const dispatch=useDispatch()
  const onSubmit=async (e:any)=>{
    setLoading(true)
  let order={...e,product:cartIds,first:false}
  if(!firstOrder){
    order={...e,product:cartIds,first:true}
  }
  try {
    const {data}=await api.post("/api/orders",order)
    let amount = 0 as number
    if(data.success){
      toast.success("Order Confirmed, Please Wait...")
      data.confirm.order.forEach((item:any)=>{
        amount += +item.price * +item.amount
      })
      reset()
      dispatch(removeAll())
      if(!firstOrder){
       return handlePay(
        amount,
        data.confirm.email,
        data.confirm.name,
        data.confirm.phone,
        data.confirm.address
        )
      }
      return handlePay(
        amount,
        data.confirm.email,
        data.confirm.name,
        data.confirm.phone,
        data.confirm.address
      )
    }else{
      toast.error(data.message||"Order Confirmation Failed")
    }
  } catch (error) {
    toast.error((error as Error).message||"Order Confirmation Failed")
  }
    setLoading(false)
  }
  return (
    <>
      {!firstOrder&&<form onSubmit={handleSubmit(onSubmit)}>
      <input 
      placeholder="email" 
      type="email"
      {...register("email")}/>
      <button
      className="bg-gray-900 transition cursor-pointer disabled:opacity-50
      hover:bg-blue-600 px-2 py-1 border-none rounded text-white">
        {loading?<Loading2 />:"continue Payments"}
      </button>
    </form>}
    {firstOrder&&<form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="name" type="text" {...register("name")}/>
      <input placeholder="email" type="email" {...register("email")}/>
      <input placeholder="address" type="text" {...register("address")}/>
      <input placeholder="password" type="text" {...register("password")}/>
      <input placeholder="phone" type="text" {...register("phone")}/>
      <button disabled={!isValid} 
      className="bg-gray-900 transition cursor-pointer disabled:opacity-50
      hover:bg-blue-600 px-2 py-1 border-none rounded text-white">
        continue Payments
      </button>
    </form>}
      <div 
      onClick={()=>setFristOrder(!firstOrder)}
      className="text-gray-700 text-sm md:text-base transition 
      hover:text-blue-700 mt-4 cursor-pointer">
        {!firstOrder?"is that your first order ?":
        "Have you Ordered before ? add your email"}
      </div> 
    </>
  )
}
