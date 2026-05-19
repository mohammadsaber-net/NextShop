// "use client"
// import Loading from '@/components/animations/loading';
// import { addToCart } from '@/components/hero/Hero';
// import { api } from '@/lib/axios'
// import { addOne } from '@/redux/slices/cart';
// import { X } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { useDispatch, useSelector } from 'react-redux';
// export default function page({params}:{params:any}) {
//     const cartIds=useSelector((state:any)=>state.cart)
//     const dispatch = useDispatch()
//     const [product,setProduct]=useState<any>({})
//     const [images,setImages]=useState<any>([])
//     const [stock,setStock]=useState<any>(null)
//     const [loading,setLoading]=useState(false)
//     const getProduct=async()=>{
//         setLoading(true) 
//         const {id}=await params
//         const {data}=await api.get("/api/products/"+id)
//         setImages(data.product.images[0])
//         setProduct(data.product)
//         setLoading(false)
//     }
//     useEffect(()=>{
//         getProduct()
//     },[])
//     useEffect(()=>{
//         if (!product?._id) return;
//         setStock(cartIds.filter((item:any)=>item===product._id).length)
//     },[cartIds,product._id])
//     const [close,setClose]=useState(false)
//     const [showImage,setShowImage]=useState<any>(null)
//  return !loading?(
//     <div className='w-[90%] mx-auto sm:w-[85%] min-h-[80vh] mt-4 mb-8 lg:max-w-[75%] max-w-3xl'>
//         {close&&<div onClick={()=>setClose(false)} 
//         className='fixed flex items-center justify-center bg-gray-300/70 top-0 z-50 left-0 bottom-0 right-0'>
//             <button 
//             onClick={()=>setClose(false)}
//             className='absolute border rounded z-10 top-4 right-2 cursor-pointer'>
//                 <X />
//             </button>
//             <img
//             src={showImage} className='max-w-96 w-full h-full max-h-96' alt="" />
//         </div>}
//       <div
//       className='flex gap-6 flex-col sm:flex-row'
//       >
//         <div className='flex flex-col gap-2 md:flex-row'>
//             <img 
//             onClick={()=>{setClose(true);setShowImage(images)}} 
//             src={images} 
//             className='w-60 h-68 cursor-pointer' alt={product?.title} />
//             <div 
//             className='flex gap-1 flex-row md:flex-col'>
//                 {product?.images?.map((item:any)=>(
//                     <img 
//                     key={item}
//                     src={item}
//                     onClick={()=>setImages(item)} 
//                     alt={product.title} 
//                     className='w-10 h-10 block cursor-pointer' />
//                 ))}
//             </div>
//         </div>
//         <div>
//             <h3 className='text-xl max-w-96 mb-2 md:text-2xl font-bold'>
//                 <span className='text-blue-600 tracking-wider'>Title: </span>{product.title}
//             </h3>
//             <span className='text-indigo-600'>
//                 <span className='font-bold tracking-wide'>Price: </span> {product.price} EGP
//             </span>
//             {product.properties&&<div>
//                 {product.properties.map((prop:any)=>(
//                     <div key={prop.name} className='text-indigo-600'>
//                     Available {prop.name}: {prop.values.map((item:any)=>(
//                         <span key={item} className='tracking-wide'>
//                             {item} , 
//                         </span>
//                     ))}
//                 </div>
//                 ))}
//             </div>}
//             <div className='mt-2 font-bold tracking-wide text-gray-900'>
//                Available In the Stock: 
//                <span className='text-indigo-600'> 
//                 {stock>= product.quantity?"item is no longer available in the stock":(+product.quantity - +stock).toString()}
//                 </span>
//             </div>
//             <p className='max-w-80 break-all mt-2 text-gray-700'>
//                 <span className='font-bold block tracking-wide'>Description: </span>{product.description}
//             </p>
//         </div>
//       </div>
//       <button 
//       onClick={()=>{
//         if(stock>=product.quantity){
//             toast.error("Sorry! the available amount in Stock is only "+product.quantity)
//             return
//         }
//         dispatch(addOne(product._id))}}
//       className={
//         `block m-auto mt-4 text-center max-w-96 max-h-96 w-full h-full 
//       bg-indigo-600 text-white border-none ${stock>=product.quantity?"pointer-event-none !bg-gray-800":"cursor-pointer"} p-2 rounded
//       transition hover:bg-indigo-800`}>Add To Cart
//       </button>
//     </div>
//   ):(
//     <Loading />
//   )
// }
"use client"
import Loading from '@/components/animations/loading';
import { api } from '@/lib/axios';
import { addOne } from '@/redux/slices/cart';
import { X, ShoppingCart, CheckCircle, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductPage({ params }: { params: any }) {
  const cartIds = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>({});
  const [images, setImages] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const getProduct = async () => {
    try {
      const { id } = await params;
      const { data } = await api.get(`/api/products/${id}`);
      setImages(data.product.images[0]);
      setProduct(data.product);
    } catch (e) {
      toast.error("خطأ في تحميل المنتج");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getProduct(); }, []);
  useEffect(() => {
    if (product?._id) setStock(cartIds.filter((item: any) => item === product._id).length);
  }, [cartIds, product._id]);

  if (loading) return <Loading />;

  const isOutOfStock = stock >= product.quantity;

  return (
      <div className='w-[90%] lg:max-w-6xl mx-auto'>
        {showModal && (
          <div onClick={() => setShowModal(false)} 
           className='fixed inset-0 z-[100000] flex items-center justify-center bg-black/10 backdrop-blur-sm p-4'>
            <img 
            onClick={(e)=>e.stopPropagation()}
            src={images} className='max-w-full max-h-[80vh] rounded-xl' alt="preview" />
          </div>
        )}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm'>
          <div className='flex flex-col-reverse md:flex-row gap-4'>
            <div className='flex md:flex-col gap-2'>
              {product?.images?.map((img: string) => (
                <img key={img} src={img} onClick={() => setImages(img)} 
                     className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all 
                     ${images === img ? "border-indigo-600" : "border-transparent hover:border-indigo-200"}`} />
              ))}
            </div>
            <div className='flex-1 bg-slate-100 rounded-2xl overflow-hidden'>
              <img src={images} onClick={() => setShowModal(true)} className='w-full h-96 object-contain cursor-pointer transition-transform hover:scale-105' />
            </div>
          </div>
          <div className='flex flex-col justify-center'>
            <h1 className='text-3xl md:text-4xl font-black text-slate-900 mb-4'>{product.title}</h1>
            
            <div className='flex items-center gap-4 mb-6'>
              <span className='text-3xl font-bold text-indigo-600'>{product.price} EGP</span>
              {isOutOfStock ? (
                <span className='bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold'>نفذت الكمية</span>
              ) : (
                <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1'>
                  <Package size={14} /> In Stock
                </span>
              )}
            </div>
            <p className='text-slate-600 leading-relaxed mb-6'>{product.description}</p>
            <div className='space-y-3 mb-8'>
              {product.properties?.map((prop: any) => (
                <div key={prop.name} className='flex gap-2 text-sm'>
                  <span className='font-bold text-slate-900'>{prop.name}:</span>
                  <span className='text-slate-500'>{prop.values.join(', ')}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => {
                if(isOutOfStock) return toast.error("Sorry, product not available");
                dispatch(addOne(product._id));
                toast.success("Product Added");
              }}
              disabled={isOutOfStock}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
              ${isOutOfStock ? "bg-slate-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"}`}>
              <ShoppingCart size={20} />
              {isOutOfStock ? "Not Available" : "Cart"}
            </button>
          </div>
        </div>
      </div>
  );
}