// "use client"
// import { api } from "@/lib/axios";
// import { SearchIcon } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation"
// export default function SearchProduct() {
//     const [openInput,setOpenInput]=useState<boolean>(false)
//     const [products,setProducts]=useState<any>([])
//     const [letter,setLetter]=useState<string>("")
//     const containerRef = useRef<HTMLDivElement>(null)
//     const getProducts=async()=>{
//       try {
//         const {data}=await api.get("/api/products")
//         console.log(data)
//         if(data.success){
//           setProducts(data.data)
//         }
//       } catch (error) {
//         toast.error("there a problem in searching, please try again")
//       }
//     }
//     const router=useRouter()
//     const details=(id:any)=>{
//       router.push("/AllProducts/"+id)
//       setLetter("")
//       setOpenInput(false)
//     }
//     useEffect(()=>{
//       !openInput&&setLetter("")
//     },[openInput])
//     useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
//         setOpenInput(false)
//         setLetter("")
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])
//   return (
//     <div ref={containerRef} className="relative flex items-center">
//        {!openInput&&
//        <div onClick={()=>{getProducts();setOpenInput(true)}} 
//        className="flex cursor-pointer text-white items-center">
//          ابحث<SearchIcon/>
//        </div>
//        }
//       <input 
//       type="text"
//       placeholder="Search By Name" 
//       value={letter}
//       onChange={(e)=>setLetter(e.target.value)}
//       className={`transition-all duration-300 !p-0 
//       ${openInput?"!h-7 opacity-100 !mb-0":"!h-0 opacity-0 !w-0"}`} />
//       <div 
//       className={`top-[100%] ${letter&&"p-1 pt-4"} left-0 rounded-md shadow bg-gray-200 
//       absolute w-full max-h-80 overflow-y-auto z-[100000]`}>
//         {products.length>0&&openInput&&
//         <div className="flex flex-col gap-2">
//           {console.log(letter)}
//           {letter&&products.filter((item:any)=>item.title.toLowerCase().includes(letter.toLowerCase()))
//           .map((prod:any)=>(
//             <div
//             onClick={()=>details(prod._id)}
//             key={prod._id} className="flex transition hover:text-indigo-600 border-b-1 border-gray-300 shadow mb-1 cursor-pointer gap-2">
//               <div className="w-full">
//                 <img src={prod?.images[0]} className="w-10 h-10" alt={prod.title} />
//                 <p className="text-xs md:text-sm">{prod.title.slice(0,30)}...</p>
//               </div>
//               <small className="text-indigo-600">{prod.price} EGP</small>
//             </div>
//           ))}
//         </div>}
//         {products===0&&openInput&&<div>there no products yet</div>}
//       </div>
//     </div>
//   )
// }
"use client"
import { api } from "@/lib/axios";
import { SearchIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"

export default function SearchProduct() {
  const [openInput, setOpenInput] = useState(false)
  const [products, setProducts] = useState([])
  const [letter, setLetter] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const getProducts = async () => {
    if (products.length > 0) return;
    try {
      const { data } = await api.get("/api/products")
      if (data.success) setProducts(data.data)
    } catch (error) { console.error("Search error") }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenInput(false); setLetter("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filtered = letter 
    ? products.filter((item: any) => item.title.toLowerCase().includes(letter.toLowerCase())).slice(0, 5) 
    : [];

  return (
    <div ref={containerRef} className="relative">
      {/* حقل البحث: بسيط وهادئ */}
      <div 
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300
        ${openInput ? "bg-slate-800 border-slate-600 w-48 md:w-64" : "bg-transparent border-transparent w-24"}`}
        onClick={() => { getProducts(); setOpenInput(true); }}
      >
        {!openInput&&<SearchIcon className="size-4 text-slate-400 shrink-0" />}
        <input 
          type="text"
          placeholder="بحث..." 
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          className={`bg-transparent outline-none text-sm text-gray-900 w-full ${!openInput && "cursor-pointer"}`}
        />
        {letter && <X className="size-3 text-slate-500 cursor-pointer" onClick={() => setLetter("")} />}
      </div>

      {/* نتائج البحث: حجم صغير ومنظم */}
      {openInput && letter && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-[#1e293b] border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="flex flex-col">
            {filtered.length > 0 ? (
              filtered.map((prod: any) => (
                <div
                  key={prod._id}
                  onClick={() => { router.push("/AllProducts/" + prod._id); setOpenInput(false); }}
                  className="flex items-center gap-3 p-2.5 hover:bg-slate-700 transition-colors cursor-pointer border-b border-slate-700/50 last:border-none"
                >
                  <img src={prod?.images[0]} className="size-10 rounded bg-white object-contain" alt="" />
                  <div className="flex flex-col min-w-0">
                    <h4 className="text-[13px] text-slate-200 truncate font-medium">{prod.title}</h4>
                    <span className="text-[11px] text-indigo-400 font-semibold">{prod.price} EGP</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">لا توجد نتائج</div>
            )}
          </div>
          
          {filtered.length > 0 && (
            <button 
              onClick={() => router.push(`/AllProducts?search=${letter}`)}
              className="w-full py-2 text-[11px] bg-slate-900/50 text-slate-400 hover:text-white transition-colors"
            >
              عرض الكل
            </button>
          )}
        </div>
      )}
    </div>
  )
}