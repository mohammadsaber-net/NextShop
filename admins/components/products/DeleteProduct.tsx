"use client"
import axios from 'axios'
import{ useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation"
export default function DeleteProduct({id,title,type}:{id:string,title:string,type?:string}) {
    const [confirm,setConfirm]=useState(false)
    const router = useRouter()
    const handleDelete=async()=>{
      if(type==="user"){
      try {
       const {data}=await axios.delete(`/api/users/${id}`,{withCredentials:true})
       if(data.success) {
        router.refresh()
        toast.success("user deleted successfully")
        setConfirm(false) 
       }else{
           return toast.error("failed to delete user")
       }
       } catch (error) {
        console.log(error)
       toast.error((error as Error).message||"failed to delete user") 
     }
     return
      }
        try {
       const {data}=await axios.delete(`/api/products/${id}`,{withCredentials:true})
       if(data.success) {
        router.refresh()
        toast.success("product deleted successfully")
        setConfirm(false) 
       }else{
           return toast.error("failed to delete product")
       }
       } catch (error) {
       toast.error((error as Error).message) 
     }
    }
  return (
    <>
    <button onClick={()=>setConfirm(true)}
    className='p-1 cursor-pointer rounded-md bg-red-600 
    text-white'>Delete
    </button>
    {confirm&&<div onClick={()=>setConfirm(false)} className='flex shadow-md items-center justify-center fixed top-0 left-0 bottom-0 right-0 bg-gray-300/50'>
        <div onClick={(e) => e.stopPropagation()} className='w-fit dark:bg-gray-800/60 bg-white p-4 rounded-lg'>

                <div className='mb-10'>
                are you sure that you want to delete "{title}" ?
            </div>
            <div className='flex justify-around'>
                <button onClick={()=>setConfirm(false)} className='cursor-pointer transition hover:bg-blue-700 bg-blue-600 text-white px-2 py-1 rounded'>cancel</button>
                <button onClick={()=>handleDelete()} className='cursor-pointer transition hover:bg-red-700 bg-red-600 text-white px-2 py-1 rounded'>delete</button>
            </div>
            
        </div>
    </div>}
    </>
  )
}
