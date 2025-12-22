"use client"
import Loading2 from "@/components/animations/Loading2"
import Paymob from "@/components/paymob/Paymob"
import Update from "@/components/user/Update"
import { api } from "@/lib/axios"
import { Eye, EyeClosedIcon } from "lucide-react"
import Link from "next/link"
import {useState } from "react"
import toast from "react-hot-toast"
export default function page() {
  const btn="text-white px-2 mb-3 py-1 rounded cursor-pointer"
  const [email,setEmail]=useState<string>("")
  const [iframeUrl, setIframeUrl] = useState<string>("");
  const [password,setPassword]=useState<string>("")
  const [user,setUser]=useState<any>(null)
  const [pay,setPay]=useState<boolean>(false)
  const [addUser,setAddUser]=useState<boolean>(false)
  const [update,setUpdate]=useState<boolean>(false)
  const [loading,setLoading]=useState<boolean>(false)
  const [loading2,setLoading2]=useState<any>(null)
  const [order,setOrder]=useState<any>(null)
  const [pass,setPass]=useState<boolean>(false)
  const Icon=pass?Eye:EyeClosedIcon
  const getUser=async()=>{
    setLoading(true)
    try {
      const {data}=await api.post("/api/users",{email,password})
      if(data.success){
        setUser(data.user)
        toast.success("welcome ",data.user.name)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
    setLoading(false)
  }   
  const getOrders=async(userId:any)=>{
    setLoading(true)
    try {
      const {data}=await api.get("/api/orders/"+userId)
    if(data.success){
      setOrder(data.order)
      toast.success("Data Fetched Successfully")
    }else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error((error as Error).message)
    }
    setLoading(false)
  }
  async function handlePay(
    itemId:any,amount: any,email: any,name: any,phone: 
    any,address: any,OrderId:any) {
      setLoading2(itemId)
      try {
        const {data} = await api.post("/api/paymob/token",
        {
        amount,email,name,phone,address,OrderId
      },);
        setIframeUrl(data.iframe_url);
        setPay(true)
        toast.success("Please Complete Your Payment")
      }catch (error) {
        toast.error((error as Error).message)
      }
      setLoading2(null)
    }
  return (
    <div className="w-[90%] mx-auto sm:w-[85%] lg:max-w-[75%] max-w-3xl">
      {pay&&<Paymob 
      iframeUrl={iframeUrl}
      setPay={setPay}/>}
      {update&&<Update 
      setUpdate={setUpdate} 
      user={user} 
      btn={btn} 
      update={update}
      addUser={addUser}
      setUser={setUser}/>}
        <h2 className="text-2xl font-semibold mt-6 mb-2 tracking-wider">
            My Account
        </h2>
      {!user&&<div>
      <input
      className="w-full"
      placeholder="Add Your Email" 
      type="email" 
       onChange={(e)=>setEmail(e.target.value)}/>
      
      <div className="relative">
        <input 
        onChange={(e)=>setPassword(e.target.value)} 
        type={pass?"text":"password"} 
        placeholder="Add Your Password" 
        className="w-full"/>
          <Icon 
          onClick={()=>setPass(!pass)}
          className="absolute top-2 right-2 cursor-pointer"/>
      </div>
      <button 
      className="bg-gray-700 text-white px-2 py-1 rounded cursor-pointer"
      type="button" 
      onClick={getUser}>
        {loading?<Loading2/>:"Send"}
      </button>
      <div className="text-gray-700">
        don't have an account? <button
        className="cursor-pointer text-blue-700"
        onClick={()=>{setUpdate(true);setAddUser(true)}}
        >Create One</button>
      </div>
      </div>}
      {user&&<div className="mt-4 border-t rounded pt-2">
        <p className="text-indigo-600">welcome mr/ms: <span className="font-semibold">{user.name}</span></p>
        <div className="w-20 h-20 overflow-hidden rounded-full">
          <img src={user.image||"/images/user-1756384189933.jpeg"} alt={user.name} className="w-full h-full contain-cover" />
        </div>
        <p className="text-gray-600 mb-2">Address: {user.address}</p>
        <p className="text-gray-600 mb-2">phone Number: {user.phone}</p>
        <div className="flex items-center justify-between">
          <button
          onClick={()=>{setUpdate(true);setAddUser(false)}}
          className={btn+" bg-blue-700 "}>
            Update Info
          </button>
        <button 
        onClick={()=>getOrders(user._id)}
        className={btn+" bg-gray-700 "}>
          {loading?<Loading2 />:"Show Your Orders"}
        </button>
        </div>
      </div>}
      <div className="max-h-[400px] overflow-auto">
      {order?.length>0&&(
    <div className="min-w-[600px] overflow-x-auto">
      <table className="min-w-[450px]">
        <thead>
          <tr>
            <th>Date</th>
            <th>Order</th>
            <th>Paid</th>
            <th>Received</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item:any)=>(
            <tr key={item._id}>
              <td>{item.createdAt&&(new Date(item.createdAt).toDateString())}</td>
              <td>
                <div className="overflow-x-auto">

                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.order.map((prod:any)=>(
                      <tr key={prod.title}>
                      <td>
                        {prod.title}
                      </td>
                      <td>
                        {prod.amount}
                      </td>
                      <td>
                        {prod.price * prod.amount} EGP
                      </td>
                    </tr>))}
                  </tbody>
                </table>
                </div>
              </td>
              <td>
                {item.payment?"Paid":"Not Paid"}
              </td>
              <td>
                <div className="mb-4 border-b">
                  {item.payment?"yes":"Not Yet"}
                </div>
                {!item.payment&&
                <button 
                onClick={() => {const amount = item.order.reduce(
                (acc: number, prod: any) => {return acc + prod.price * prod.amount;}, 0);
                handlePay(item._id,
                amount,user.email,user.name,user.phone,user.address,item._id);}}
                className="bg-indigo-700 text-white p-1 rounded cursor-pointer">
                  {loading2===item._id?<Loading2 />:"Complete Payment?"}
                </button>}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>
      )
        }
        {user&&order?.length===0&&<div className="text-gray-700 mt-5 border-t text-center">
        Opps! There Are No Orders 
        <div>
          <Link  className="text-blue-700 text-semibold" href={"/"}>Browse Now!</Link>  and see our Latest products
        </div> 
        </div>}
      </div>
    </div>
  )
}
