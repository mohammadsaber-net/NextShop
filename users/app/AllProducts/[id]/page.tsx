"use client"
import Loading from '@/components/animations/loading';
import { addToCart } from '@/components/hero/Hero';
import { api } from '@/lib/axios'
import { addOne } from '@/redux/slices/cart';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
export default function page({params}:{params:any}) {
    const dispatch = useDispatch()
    const [product,setProduct]=useState<any>({})
    const [images,setImages]=useState<any>([])
    const [loading,setLoading]=useState(false)
    const getProduct=async()=>{
        setLoading(true) 
        const {id}=await params
        const {data}=await api.get("/api/products/"+id)
        setImages(data.product.images[0])
        setProduct(data.product)
        setLoading(false)
    }
    useEffect(()=>{
        getProduct()
    },[])
    console.log(product)
    const [close,setClose]=useState(false)
    const [showImage,setShowImage]=useState<any>(null)
 return !loading?(
    <div className='w-[90%] mx-auto sm:w-[85%] mt-4 mb-8 lg:max-w-[75%] max-w-3xl'>
        {close&&<div onClick={()=>setClose(false)} 
        className='fixed flex items-center justify-center bg-gray-300/70 top-0 z-50 left-0 bottom-0 right-0'>
            <button 
            onClick={()=>setClose(false)}
            className='absolute border rounded z-10 top-4 right-2 cursor-pointer'>
                <X />
            </button>
            <img
            
            src={showImage} className='max-w-96 w-full h-full max-h-96' alt="" />
        </div>}
      <div
      className='flex gap-6 flex-col sm:flex-row'
      >
        <div className='flex flex-col gap-2 md:flex-row'>
            <img 
            onClick={()=>{setClose(true);setShowImage(images)}} 
            src={images} 
            className='w-60 h-68 cursor-pointer' alt={product?.title} />
            <div 
            className='flex gap-1 flex-row md:flex-col'>
                {product?.images?.map((item:any)=>(
                    <img 
                    key={item}
                    src={item}
                    onClick={()=>setImages(item)} 
                    alt={product.title} 
                    className='w-10 h-10 block cursor-pointer' />
                ))}
            </div>
        </div>
        <div>
            <h3 className='text-xl max-w-96 mb-2 md:text-2xl font-bold'>
                <span className='text-blue-600 tracking-wider'>Title: </span>{product.title}
            </h3>
            <span className='text-indigo-600'>
                <span className='font-bold tracking-wide'>Price: </span> {product.price} EGP
            </span>
            {product.properties&&<div>
                {product.properties.map((prop:any)=>(
                    <div key={prop.name} className='text-indigo-600'>
                    Available {prop.name}: {prop.values.map((item:any)=>(
                        <span key={item} className='tracking-wide'>
                            {item} , 
                        </span>
                    ))}
                </div>
                ))}
            </div>}
            <p className='max-w-80 break-all mt-2 text-gray-700'>
                <span className='font-bold block tracking-wide'>Description: </span>{product.description}
            </p>
        </div>
      </div>
      <button 
      onClick={()=>dispatch(addOne(product._id))}
      className={
        `block m-auto mt-4 text-center max-w-96 max-h-96 w-full h-full 
      bg-indigo-600 text-white border-none cursor-pointer p-2 rounded
      transition hover:bg-indigo-800`}>Add To Cart</button>
    </div>
  ):(
    <Loading />
  )
}
