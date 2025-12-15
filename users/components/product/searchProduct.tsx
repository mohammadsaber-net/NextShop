"use client"
import { api } from "@/lib/axios";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
export default function SearchProduct() {
    const [openInput,setOpenInput]=useState<boolean>(false)
    const [products,setProducts]=useState<any>([])
    const [letter,setLetter]=useState<string>("")
    const containerRef = useRef<HTMLDivElement>(null)
    const getProducts=async()=>{
      try {
        const {data}=await api.get("/api/products")
        console.log(data)
        if(data.success){
          setProducts(data.data)
        }
      } catch (error) {
        toast.error("there a problem in searching, please try again")
      }
    }
    const router=useRouter()
    const details=(id:any)=>{
      router.push("/AllProducts/"+id)
      setLetter("")
      setOpenInput(false)
    }
    useEffect(()=>{
      !openInput&&setLetter("")
    },[openInput])
    useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenInput(false)
        setLetter("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  return (
    <div ref={containerRef} className="relative flex items-center">
       {!openInput&&
       <div onClick={()=>{getProducts();setOpenInput(true)}} 
       className="flex cursor-pointer text-gray-800 items-center">
         Search<SearchIcon/>
       </div>
       }
      <input 
      type="text"
      placeholder="Search By Name" 
      value={letter}
      onChange={(e)=>setLetter(e.target.value)}
      className={`transition-all duration-300 !rounded-b-[0] !p-0 
      ${openInput?"!w-48 !h-7 !mb-0":"!h-0 !w-0"}`} />
      <div 
      className={`top-[100%] ${letter&&"p-1"} left-0 rounded-b bg-white 
      absolute w-48 max-h-80 overflow-y-auto z-[100000]`}>
        {products.length>0&&openInput&&
        <div className="flex flex-col gap-2">
          {console.log(letter)}
          {letter&&products.filter((item:any)=>item.title.toLowerCase().includes(letter.toLowerCase()))
          .map((prod:any)=>(
            <div
            onClick={()=>details(prod._id)}
            key={prod._id} className="flex transition hover:text-indigo-600 border-b-1 border-gray-300 shadow mb-1 cursor-pointer gap-2">
              <div>
                <img src={prod?.images[0]} className="w-10 h-10" alt={prod.title} />
                <p className="text-xs md:text-sm">{prod.title}</p>
              </div>
              <small className="text-indigo-600">{prod.price} EGP</small>
            </div>
          ))}
        </div>}
        {products===0&&openInput&&<div>there no products yet</div>}
      </div>
    </div>
  )
}
