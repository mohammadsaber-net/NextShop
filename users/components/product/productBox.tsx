// "use client"
// import { addToCart} from '@/components/hero/Hero'
// import { addOne } from '@/redux/slices/cart'
// import Link from 'next/link'
// import { useEffect, useRef, useState } from 'react'
// import { motion } from "framer-motion"
// import { useDispatch, useSelector } from 'react-redux'
// import { animateToCart } from '../animations/animateToCart'
// import toast from 'react-hot-toast'
// type Product={
//       _id: string,
//       title: string,     
//       description: string,
//       category: string,
//       quantity: string,
//       price: '31000',
//       images: Array<string>,
//       categoryParent: string,
//       properties: Array<string>,
//       createdAt: string,
//       updatedAt: string,
//       __v: 0
// }
// export default function ProductBox({product,style}:{product:Product,style?:string}) {
//     const dispatch=useDispatch()
//     const imageRef=useRef<HTMLImageElement>(null)
//     const cartIds=useSelector((state:any)=>state.cart)
//     const [stock,setStock]=useState<any>(null)
//     useEffect(()=>{
//       setStock(cartIds.filter((item:any)=>item===product._id).length)
//     },[cartIds])
//   return (
//     <motion.div 
//     initial={{ opacity: 0, y: 40 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{
//        once: true,
//        amount:0.2
//      }}
//     transition={{ duration: 0.6, ease: "easeOut" }}
//     className='bg-gray-100 p-2 mx-auto w-full shadow rounded-md'>
//       <Link href={"/AllProducts/"+product._id} className='flex justify-center'>
//         <img 
//         ref={imageRef}
//         className={`md:w-full ${style==="decrease"?"w-12 h-20":"h-56 w-48 "}`} src={`${product.images[0]}`} alt={product.title} />
//       </Link>
//       <div className='mt-2'>
//         <Link href={"/AllProducts/"+product._id}><h3 
//         className={`transition underline hover:text-blue-600
//         cursor-pointer ${style==="decrease"?"font-normal text-sm h-14":"font-semibold text-lg h-20 "} overflow-hidden`}>{product.title}
//         </h3></Link>
//         <div 
//         className='flex justify-between'>
//             <p 
//             className='text-indigo-600 font-bold mt-2'>${product.price}
//             </p>
//             <button 
            
//             onClick={()=>{
//               if(stock>=product.quantity){
//                 toast.error("Sorry! the available amount in Stock is only "+product.quantity)
//                 return
//               }
//               animateToCart(imageRef.current!);dispatch(addOne(product._id))
//             }} 
//             className={addToCart}>
//               Cart
//             </button>
//         </div>
//       </div>
//     </motion.div>
//   )
// }
"use client"
import { addOne } from '@/redux/slices/cart'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { animateToCart } from '../animations/animateToCart'
import toast from 'react-hot-toast'
import { ShoppingCart } from 'lucide-react'
import image1 from "./../../public/images/istockphoto-1476003857-612x612.webp"
type Product = {
  _id: string,
  title: string,     
  description: string,
  category: string,
  quantity: string,
  price: number,
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
      className='group relative bg-white border border-slate-100 p-3 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300'
    >
      <Link href={"/AllProducts/" + product._id} className='relative block aspect-square overflow-hidden rounded-xl bg-slate-50'>
        <img 
          ref={imageRef}
          className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 
          ${style === "decrease" ? "p-4" : "p-6"}`} 
          src={product.images[0]} 
          alt={product.title} 
        />
      </Link>
      <div className='mt-4 px-1'>
        <Link href={"/AllProducts/" + product._id}>
          <h3 className='font-bold text-slate-800 text-base leading-tight h-12 line-clamp-2 group-hover:text-indigo-600 transition-colors'>
            {product.title}
          </h3>
        </Link>
        
        <div className='mt-3 flex items-center justify-between'>
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