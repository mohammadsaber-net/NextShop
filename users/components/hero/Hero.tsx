"use client"
import {ShoppingCart} from "lucide-react"
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
export const H1Style="text-xl mt-4 text-white sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2"
export const seeMore=`hover:bg-indigo-600 transition bg-white 
          text-indigo-600 border border-indigo-600 px-4 py-2 
          rounded-md hover:text-white cursor-pointer`
export const addToCart=`px-4 py-2 border border-blue-600 rounded-md text-blue-600 bg-white
          cursor-pointer flex items-center gap-2 hover:bg-blue-600 hover:text-white`
export const MainDiv=`h-fit justify-around items-center flex
 bg-gradient-to-r from-purple-300 to-indigo-400 flex-col md:flex-row`
export default function Hero() {
    const images = [
  {
    original: "/images/shopify-hero-man.webp",
    description:"20% OFF"
  },
  {
    original: "/images/—Pngtree—young man sitting with his_4064748.jpg",
    description:" Capture Your World"
  },
  {
    original: "/images/istockphoto-1476003857-612x612.webp",
    description:`Enjoy Your AirPods ${<br />} With Best Off`
  },
];
const renderItem = (item: any) => (
    <div className={`${item.original==="/images/shopify-hero-man.webp"&&"bg-white"} 
    relative w-fit overflow-hidden h-fit`}>
      <img
        src={item.original}
        alt="slide"
        className="h-96 w-70"
      />
      <div
        className={`
        absolute bottom-28 right-0 transform bg-indigo-400
        text-white hover:bg-indigo-600 hover:backdrop-blur-md
        px-3 py-1 text-sm
        ${item.description==="20% OFF"&&"bg-red-600 animate-pulse"}
        `}
      >
        {item.description}
      </div>
    </div>
  );
  return (
    <div className={MainDiv}>
      <div>
        <h1 className={H1Style+ " max-w-400"}>
            Upgrade Your Tech. Upgrade Your Life.
        </h1>
        <p className='max-w-96 text-gray-900 mb-6'>
            Discover the latest phones, laptops, and smart devices.
             Top brands, fast delivery, and trusted quality.
        </p>
          <a 
          href="#Latest"
          className='hover:bg-indigo-600 transition bg-white 
          text-indigo-600 border border-indigo-600 px-4 py-2 
          rounded-md text-sm md:text-base hover:text-white cursor-pointer
          mb-4 m-auto block w-fit'
          >See Our Latest Product</a>
      </div>
      <div className='overflow-hidden w-80 h-96 backdrop-blur-md'>
         <ImageGallery  
         showPlayButton={false}
         showIndex={false}
         renderItem={renderItem}
         showFullscreenButton={false}
         items={images}
         autoPlay={true}
         slideDuration={300}
         useBrowserFullscreen={false}
         showNav={false}
         showThumbnails={false}
         />

      </div>
    </div>
  )
}
