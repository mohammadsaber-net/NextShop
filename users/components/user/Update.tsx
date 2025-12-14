"use client"

import { api } from "@/lib/axios"
import { UserInfoSchema } from "@/validations/UserInfo"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosedIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Loading2 from "../animations/Loading2"

type Props={
    setUpdate:any,
    setUser:any,
    btn:string,
    addUser:boolean,
    user?:{
        name?:string,
        _id?:any,
        email?:string,
        password?:string,
        phone?:string,
        address?:string,
        image?:any
    },
    update:boolean
}
export default function Update({setUpdate,update,setUser,addUser,user,btn}:Props) {
    const [preview, setPreview] = useState(
    typeof user?.image === "string" ? user.image : ""
    );
    const [loading,setLoading]=useState<boolean>(false)
    const [mounted, setMounted] = useState(false);
    const [pass,setPass]=useState<boolean>(false)
    const Icon=pass?Eye:EyeClosedIcon
    useEffect(() => {
        setTimeout(() => setMounted(true), 1);
    }, []);
    const {
        register,
        handleSubmit,
        setValue
    }=useForm({
        resolver:zodResolver(UserInfoSchema),
        mode:"all",
        defaultValues:{
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        image: user?.image,
        password:""
        }
    })
    const onSubmit=async(e:any)=>{
        setLoading(true)
        try {
        const updated=new FormData()
        updated.append("name",e.name)
        updated.append("email",e.email)
        updated.append("phone",e.phone)
        updated.append("password",e.password)
        updated.append("address",e.address)
        updated.append("image",e.image)
        if(addUser){
            const {data}=await api.post("/api/users/create",updated)
            if(data.success){
                toast.success("Account Created Successfully")
                setUser(data.user)
                setUpdate(false)
            }else{
                toast.error(data.message)
            }
        }else{
            const {data}=await api.patch("/api/users/"+user?._id,updated)
            if(data.success){
                toast.success("Data Updated Successfully")
                setUser(data.user)
                setUpdate(false)
            }else{
                toast.error(data.message)
            }
            }} catch (error) {
                console.log(error)
                toast.error((error as Error).message)
            }
            setLoading(false)
    }
  return (
    <div onClick={()=>setUpdate(false)} className='fixed z-50 flex items-center justify-center inset-0 bg-gray-300/50'>
      <div 
      onClick={(e) => e.stopPropagation()}
      className={`shadow bg-white pt-4 transition-all duration-300
        delay-400 mb-2 border transform border-gray-400 px-6 rounded w-fit
        ${update&&mounted ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
        <form autoComplete="new-password" onSubmit={handleSubmit(onSubmit)} action="">
            <input {...register("name")} type="text" placeholder='name' />
            <input {...register("email")} type="email" placeholder='email' />
            <div className="relative">
                <input autoComplete="new-password" {...register("password")} type={pass?"text":"password"} placeholder='password' />
                <Icon 
                onClick={()=>setPass(!pass)}
                className="absolute top-2 right-2 cursor-pointer"/>
            </div>
            <input {...register("phone")} type="text" placeholder='phone number' />
            <input {...register("address")} type="text" placeholder='address' />
            <div className="flex gap-2 items-center">
                {preview&&<img src={preview} className="w-14 h-14" alt="" />}
                <label className="block w-fit rounded p-4 text-white cursor-pointer bg-indigo-500" htmlFor="image">
                image
            <input 
            onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setValue("image", file);
                setPreview(URL.createObjectURL(file));
            }}
            id="image" 
            type="file" 
            accept='/image*' className="!hidden"/>
            </label>
            </div>
            <button 
            type="submit"
            className={btn+" bg-blue-700 mt-4"}
            >{loading?<Loading2/>:addUser?"Create Account":"Update"}</button>
        </form>
      </div>
    </div>
  )
}
