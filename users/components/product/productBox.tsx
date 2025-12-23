"use client"
import { addToCart} from '@/components/hero/Hero'
import { addOne } from '@/redux/slices/cart'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { animateToCart } from '../animations/animateToCart'
import toast from 'react-hot-toast'
type Product={
      _id: string,
      title: string,     
      description: string,
      category: string,
      quantity: string,
      price: '31000',
      images: Array<string>,
      categoryParent: string,
      properties: Array<string>,
      createdAt: string,
      updatedAt: string,
      __v: 0
}
export default function ProductBox({product,style}:{product:Product,style?:string}) {
    const dispatch=useDispatch()
    const imageRef=useRef<HTMLImageElement>(null)
    const cartIds=useSelector((state:any)=>state.cart)
    const [stock,setStock]=useState<any>(null)
    useEffect(()=>{
      setStock(cartIds.filter((item:any)=>item===product._id).length)
    },[cartIds])
  return (
    <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{
       once: true,
       amount:0.2
     }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className='bg-gray-100 p-2 mx-auto w-full shadow rounded-md'>
      <Link href={"/AllProducts/"+product._id} className='flex justify-center'>
        <img 
        ref={imageRef}
        
        className={`md:w-full ${style==="decrease"?"w-12 h-20":"h-56 w-48 "}`} src={`${product.images[0]}`} alt={product.title} />
      </Link>
      <div className='mt-2'>
        <Link href={"/AllProducts/"+product._id}><h3 
        className={`transition underline hover:text-blue-600
        cursor-pointer ${style==="decrease"?"font-normal text-sm h-14":"font-semibold text-lg h-20 "} overflow-hidden`}>{product.title}
        </h3></Link>
        <div 
        className='flex justify-between'>
            <p 
            className='text-indigo-600 font-bold mt-2'>${product.price}
            </p>
            <button 
            
            onClick={()=>{
              if(stock>=product.quantity){
                toast.error("Sorry! the available amount in Stock is only "+product.quantity)
                return
              }
              animateToCart(imageRef.current!);dispatch(addOne(product._id))
            }} 
            className={addToCart}>
              Cart
            </button>
        </div>
      </div>
    </motion.div>
  )
}
