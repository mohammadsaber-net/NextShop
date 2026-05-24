"use client"
import { addOne } from '@/redux/slices/cart'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { animateToCart } from '../animations/animateToCart'
import toast from 'react-hot-toast'
import { ShoppingCart, Star } from 'lucide-react'
type Product = {
  _id: string,
  title: string,     
  description: string,
  category: string,
  quantity: string,
  price: number,
  rate: number,
  images: Array<string>,
  categoryParent: string,
  properties: Array<string>,
  createdAt: string,
  updatedAt: string,
  __v: 0
}
export default function ProductBox({ product, style }: { product: Product, style?: string }) {
  const dispatch = useDispatch()
  const imageRef = useRef<HTMLImageElement>(null)
  const cartIds = useSelector((state: any) => state.cart)
  const [stock, setStock] = useState<number>(0)
  useEffect(() => {
    setStock(cartIds.filter((item: any) => item === product._id).length)
  }, [cartIds, product._id]) 
  const addToCartBtn = `w-full mt-4 flex items-center 
  justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white
  font-semibold transition-all duration-300 hover:bg-indigo-600 
  hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed`;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className='group relative bg-white border border-slate-100 p-1.5 md:p-3 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300'
    >
      <Link href={"/AllProducts/" + product._id} className='relative block aspect-square overflow-hidden rounded-xl bg-slate-50'>
        <img 
          ref={imageRef}
          className={`h-full w-full object-contain transition-transform duration-500 m-auto group-hover:scale-110 
          ${style === "decrease" ? "p-2 md:p-4" : "p-3 md:p-6"}`} 
          src={product.images[0]} 
          alt={product.title} 
        />
      </Link>
      <div className='md:mt-4 mt-2 px-1'>
        <Link href={"/AllProducts/" + product._id}>
          <h3 className='font-bold text-slate-800 text-base leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors'>
            {product.title}
          </h3>
        </Link>
        <div className='mt-2 flex gap-1'>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`
                size-4 md:size-6
                ${index < product.rate
                ? "fill-yellow-500 text-yellow-500"
                : "fill-gray-700 text-gray-700"}
              `}
            />
          ))}
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium">Price</span>
            <p className='text-xl font-black text-slate-900'>
              ${product.price}
            </p>
          </div>
          <span className={`text-[10px] px-2 py-1 rounded-full ${Number(product.quantity) > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
             {Number(product.quantity) > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <button 
          onClick={() => {
            if (stock >= Number(product.quantity)) {
              toast.error("Sorry! Out of stock");
              return;
            }
            animateToCart(imageRef.current!);
            dispatch(addOne(product._id));
            toast.success("Added to cart!");
          }} 
          className={addToCartBtn}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  )
}