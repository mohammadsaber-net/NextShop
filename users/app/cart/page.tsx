"use client"
import Loading from "@/components/animations/loading"
import Loading2 from "@/components/animations/Loading2"
import UserInfo from "@/components/cart/UserInfo"
import { api } from "@/lib/axios"
import { addOne, removeOne } from "@/redux/slices/cart"
import { RootState } from "@/redux/store"
import { BabyIcon } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
export default function page() {
  const [iframeUrl, setIframeUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const btn="bg-gray-200 border-none px-2 py-1 cursor-pointer"
  const cartIds=useSelector((state:RootState)=>state?.cart)
  const [products,setProducts] = useState([])
  const dispatch=useDispatch()
  useEffect(()=>{
    if(cartIds.length===0) return
    api.get("/api/products",{params:{Ids:cartIds}}).then(res=>{
      setProducts(res.data.data)
    }).catch(err=>console.log(err))
  },[cartIds])
  const increase=(id:string)=>{
    dispatch(addOne(id))
  }
  const decrease=(id:string)=>{
    dispatch(removeOne(id))
  }
  return (
    <div className="w-[90%] mt-5 md:w-[80%] lg:w-[70%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-4">
        <div className="p-2 bg-white rounded shadow">
          <h2 className="text-xl sm:text-2xl lg:text-3xl">
            Cart Items ({cartIds.length})
          </h2>
          
         {cartIds.length>0&&products.length&&<table>
            <thead>
              <tr>
              <th>image & title</th>
              <th>amount</th>
              <th>price</th>
            </tr>
            </thead>
            <tbody>
              {products.length>0&&products?.map((product:any)=>(
                <tr key={product._id}>
                  <td className="flex gap-2 flex-col">
                    <img src={product.images[0]} alt={product.title} className="w-16 h-16 object-cover rounded" />
                    <span className="max-w-28">{product.title}</span>
                  </td>
                  <td>
                    <button onClick={()=>{
                      if(product.quantity<=cartIds.filter((id:string)=>id===product._id.toString()).length) {
                        toast.error("Sorry! the available amount in Stock is only "+product.quantity)
                        return
                      }
                      increase(product._id.toString())}
                      } className={btn}>+</button>
                    {cartIds.filter((id:string)=>id===product._id.toString()).length}
                    <button onClick={()=>decrease(product._id.toString())} className={btn}>-</button>
                  </td>
                  <td>
                    EGP{cartIds.filter((id:string)=>id===product._id.toString()).length * product.price}
                  </td>
                  </tr>
              ))}
            </tbody>
          </table>}
          {cartIds.length>0&&products.length===0&&!iframeUrl&&<Loading2 />}
          {cartIds.length===0&&<h3 className="flex gap-2 mt-4 text-indigo-600">Empty Cart <BabyIcon /></h3>}
          
        </div>
        {cartIds.length>0&&<div className="p-2 bg-white rounded shadow">
          <h2>user Info</h2>
          <UserInfo setIframeUrl={setIframeUrl} setName={setName}/>
        </div>}
      </div>
      {name&&<div className="text-indigo-600">
        Order Confirmed,<br/>
        Please Mr/Ms {name} continue your payment
      </div>}
      {iframeUrl&&<iframe
          src={iframeUrl}
          width="100%"
          height="600"
          frameBorder="0"
          allowFullScreen
        ></iframe>}
    </div>
  )
}
