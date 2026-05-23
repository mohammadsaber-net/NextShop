// "use client"
// import { api } from "@/lib/axios";
// import { useEffect, useState } from "react";
// import ImageGallery from "react-image-gallery";
// // @ts-ignore
// import "react-image-gallery/styles/css/image-gallery.css";
// export const H1Style = "text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6";
// export const seeMore = `group relative inline-flex items-center justify-center px-8 py-3 
//           font-bold text-indigo-600 transition-all duration-300 bg-white 
//           rounded-full hover:bg-indigo-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] 
//           active:scale-95 cursor-pointer`;

// export const addToCart = `px-6 py-2.5 border-2 border-white/30 rounded-lg text-white 
//           bg-white/10 backdrop-blur-md cursor-pointer flex items-center gap-2 
//           hover:bg-white hover:text-indigo-600 transition-all duration-300`;

// export default function Hero() {
//   const [product,setProduct]=useState<any>()
//   useEffect(()=>{
//     const getOneProduct=async()=>{
//       const {data} = await api.get("/api/products/discount")
//       setProduct(data?.data)
//     }
//     getOneProduct()
//   },[])
//   console.log(product)
//   const images = [
//     {
//       original: "/images/shopify-hero-man.webp",
//       description: "Smart Living 2026",
//       discount: "20% OFF"
//     },
//     {
//       original: "/images/—Pngtree—young man sitting with his_4064748.jpg",
//       description: "Capture Your World",
//       discount: "Limited Edition"
//     },
//     {
//       original: "/images/istockphoto-1476003857-612x612.webp",
//       description: "Pure Audio Experience",
//       discount: "Best Seller"
//     },
//   ];

//   const renderItem = (item:any) => (
//     <div className="relative group overflow-hidden rounded-3xl">
//       <img
//         src={item.original}
//         alt="slide"
//         className="h-[450px] w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent opacity-60" />
//       <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
//         <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">
//           {item.discount}
//         </span>
//         <p className="text-lg font-medium text-white truncate">
//           {item.description}
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="relative -mt-8 min-h-[70vh] flex items-center overflow-hidden bg-[#0f172a]">
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
//       <div className="w-[90%] mx-auto lg:max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center relative z-10 py-12">
//         <div className="text-center md:text-left">
//           <span className="inline-block  px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-400/10 border border-indigo-400/20 rounded-full">
//             Next Gen Electronics
//           </span>
//           <h1 
//           className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
//             Upgrade Your 
//             <span 
//             className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
//             >Tech</span>. 
//             <br />
//             Level Up Your Life.
//           </h1>
//           <p className="max-w-lg text-slate-400 md:text-lg mb-8 leading-relaxed">
//             Experience the future of connectivity with our curated collection of high-performance devices and premium accessories.
//           </p>
          
//           <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
//             <a href="#Latest" className={seeMore}>
//               Shop the Collection
//             </a>
//             <button className={addToCart}>
//               View Offers
//             </button>
//           </div>
//         </div>
//         <div className="relative w-[70%] md:w-[85%] max-w-xl m-auto group">
//           <div className="absolute w-fit -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
//           <div className="relative w-fit bg-slate-900 rounded-[2rem] p-2 border border-white/10 shadow-2xl overflow-hidden">
//             <ImageGallery
//               showPlayButton={false}
//               showIndex={false}
//               renderItem={renderItem}
//               showFullscreenButton={false}
//               items={images}
//               autoPlay={true}
//               slideDuration={800}
//               showNav={false}
//               additionalClass="md:h-80 h-44 sm:h-60"
//               showThumbnails={false}
//             />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
"use client";

import { api } from "@/lib/axios";
import { addOne } from "@/redux/slices/cart";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImageGallery from "react-image-gallery";
// @ts-ignore
import "react-image-gallery/styles/css/image-gallery.css";
import { useDispatch, useSelector } from "react-redux";

export const H1Style =
  "text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6";

export const seeMore = `group relative inline-flex items-center justify-center px-8 py-3 
font-bold text-indigo-600 transition-all duration-300 bg-white 
rounded-full hover:bg-indigo-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] 
active:scale-95 cursor-pointer`;

export const addToCart = `px-6 py-2.5 border-2 border-white/30 rounded-lg text-white 
bg-white/10 backdrop-blur-md cursor-pointer flex items-center gap-2 
hover:bg-white hover:text-indigo-600 transition-all duration-300`;

export default function Hero() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const dispatch= useDispatch<AppDispatch>()
  const cartIds = useSelector((state: any) => state.cart)
  const [stock, setStock] = useState<number>(0)
  useEffect(() => {
    setStock(cartIds.filter((item: any) => item === product?._id).length)
  }, [cartIds, product?._id])
  useEffect(() => {
    const getOneProduct = async () => {
      try {
        const { data } = await api.get("/api/products/discount");
        setProduct(data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getOneProduct();
  }, []);

  const images =
    product?.images?.map((img: string) => ({
      original: img,
      description: product?.title,
      discount: `${product?.rate} ⭐`,
    })) || [];

  const renderItem = (item: any) => (
    <div className="relative group overflow-hidden rounded-3xl">
      <img
        src={item.original}
        alt={item.description}
        className="w-full h-full
          object-contain transform group-hover:scale-105 transition-all duration-700
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent opacity-60" />

      <div className="absolute md:bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">
          {item.discount}
        </span>

        <p className="md:text-lg font-normal text-sm md:font-medium text-white truncate">
          {item.description}
        </p>
      </div>
    </div>
  );
  return (
    <div className="relative -mt-8 min-h-[70vh] flex items-center overflow-hidden bg-[#0f172a]">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="w-[90%] mx-auto lg:max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center relative z-10 py-12">
        {/* Left */}
        <div className="text-center md:text-left">
          {loading ? (
            <>
              <div className="h-8 w-36 rounded-full bg-slate-700 animate-pulse mb-4" />

              <div className="space-y-3 mb-6">
                <div className="h-10 w-[80%] rounded bg-slate-700 animate-pulse" />
                <div className="h-10 w-[60%] rounded bg-slate-700 animate-pulse" />
              </div>

              <div className="space-y-2 mb-8">
                <div className="h-4 rounded bg-slate-700 animate-pulse" />
                <div className="h-4 w-[90%] rounded bg-slate-700 animate-pulse" />
                <div className="h-4 w-[70%] rounded bg-slate-700 animate-pulse" />
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-40 rounded-full bg-slate-700 animate-pulse" />
                <div className="h-12 w-28 rounded-lg bg-slate-700 animate-pulse" />
              </div>
            </>
          ) : (
            <>
              <span
                className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider
                text-indigo-400 uppercase bg-indigo-400/10 border border-indigo-400/20 rounded-full"
              >
                {product?.category}
              </span>

              <h1 className={H1Style}>
                {product?.title}
              </h1>

              <div className="max-w-lg text-slate-400 md:text-lg mb-4 leading-relaxed line-clamp-4">
                {product?.description.slice(0, 150)}... 
                <Link href={`/AllProducts/${product?._id}`} className="text-indigo-400 inline hover:underline">
                  Read More
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start mb-6">

                <div className="
                  px-2 py-1 rounded-2xl
                  bg-white/10 backdrop-blur-md
                  border border-white/10
                  shadow-lg
                ">
                  <p className="text-xs text-slate-400 mb-1">
                    Price
                  </p>

                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-white">
                      {Number(product?.price).toLocaleString()}
                    </span>

                    <small className="text-indigo-300 mb-1">
                      EGP
                    </small>
                  </div>
                </div>

                <div className="
                  px-2 py-1 rounded-2xl
                  bg-white/10 backdrop-blur-md
                  border border-white/10
                  shadow-lg
                ">
                  <p className="text-xs text-slate-400 mb-1">
                      Rating
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-xl">
                    ⭐
                  </span>
                    <p className="text-2xl font-bold text-white">
                      {product?.rate}/5
                    </p>
                  </div>
                </div>

              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">

                <a 
                href="#Latest"
                className={seeMore}>
                  Shop More Products
                </a>

                <button 
                onClick={()=>{
                  if (stock >= Number(product.quantity)) {
                    toast.error("Sorry! Out of stock");
                    return;
                  }
                  dispatch(addOne(product._id));
                  toast.success("Added to cart!")
                }}
                className={addToCart}>
                  Add To Cart
                </button>

              </div>
            </>
          )}
        </div>
        <div className="relative w-[70%] md:w-[85%] max-w-xl m-auto group">
          <div className="absolute w-fit -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative w-fit bg-slate-900 rounded-[2rem] p-2 border border-white/10 shadow-2xl overflow-hidden">
            {loading ? (
              <div className="w-[300px] md:w-[450px] h-[250px] md:h-[450px] rounded-3xl bg-slate-700 animate-pulse"/>
            ) : (
              <ImageGallery
                showPlayButton={false}
                showIndex={false}
                renderItem={renderItem}
                showFullscreenButton={false}
                items={images}
                autoPlay
                slideDuration={800}
                showNav={false}
                additionalClass="md:h-80 h-44 sm:h-60"
                showThumbnails={false}
              />
            )}

          </div>
        </div>

      </div>
    </div>
  );
}