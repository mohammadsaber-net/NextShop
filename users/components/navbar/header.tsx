"use client"
import { RootState } from '@/redux/store'
import { MenuIcon, ShoppingCart, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SearchProduct from '../product/searchProduct'
import { usePathname } from 'next/navigation'
const navStyle=`me-5 text-lg font-medium hover:scale-95 
hover:text-gray-700 transition duration-200 transform
`
const navStyleMobile=`ps-3 p-2 text-lg font-medium
transition duration-200 transform hover:bg-white hover:text-blue-600
`
const headerStyle="flex justify-between fixed z-50 top-0 left-0 right-0 items-center p-3 bg-gradient-to-r from-purple-200 to-indigo-300"
export default function Header() {
  const pathname=usePathname()
  const [showMobile,setShowMobile]=useState(false)
  const Icon=showMobile?X:MenuIcon
  const cartIds = useSelector((state: RootState) => state.cart)
  return (
    <header className={headerStyle}>
            <Link className={navStyle} href={"/"}>ElectroShop</Link>
            <div className='items-center gap-2 flex'>

            <SearchProduct />
            <nav className='hidden items-center gap-5 md:flex'>
            <Link 
            className={`${pathname==="/"&&"!text-blue-600" } ${navStyle}`}
            href={"/"}>Home</Link>
            <Link 
            className={`${pathname.includes("/AllProducts")&&"!text-blue-600" } ${navStyle}`} 
            href={"/AllProducts"}>All Products</Link>
            <Link 
            className={`${pathname.includes("/category")&&"!text-blue-600" } ${navStyle}`}
             href={"/category"}>Categories</Link>
            <Link id="cart-icon"
             className={`${pathname.includes("/cart")&&"!text-blue-600" } ${navStyle} relative items-center flex`}
              href={"/cart"}>
              <ShoppingCart className="size-6" />
              <span className={`absolute -top-1 -right-2 ${cartIds.length===0?"bg-gray-500":"bg-red-600"} text-white text-xs rounded-full px-1`}>
                {cartIds.length}
              </span>
            </Link>
            <Link
            className={`${pathname.includes("/account")&&"!text-blue-600" } ${navStyle}`}
            href={"/account"}>Account</Link>
            </nav>
            <div className='flex md:hidden items-center gap-2'>
              <Link
              id="cart-icon"
              className={`${pathname.includes("/cart")&&"!text-blue-600" } ${navStyle} relative items-center flex`}
               href={"/cart"}>
                <ShoppingCart className="size-6" />
                <span className={`absolute -top-1 -right-2 ${cartIds.length===0?"bg-gray-500":"bg-red-600"} text-white text-xs rounded-full px-1`}>
                  {cartIds.length}
                </span>
              </Link>
              <Icon
              onClick={()=>setShowMobile(!showMobile)} 
              className='size-10 cursor-pointer'
              />
            </div>
            <nav
            className={`absolute py-2 md:hidden transition-all duration-300 top-[100%] 
            right-0 w-full flex flex-col bg-gradient-to-r z-50 from-purple-200 to-indigo-300
            ${showMobile?
            "translate-y-0 z-40 opacity-100 pointer-events-auto":
            "opacity-0 -z-40 translate-y-8 pointer-events-none"}`}>
            <Link 
            onClick={()=>setShowMobile(false)}
            className={`${pathname==="/"&&"!text-blue-600 !bg-white" } ${navStyleMobile}`} 
            href={"/"}>Home</Link>
            <Link 
            onClick={()=>setShowMobile(false)}
            className={`${pathname.includes("/AllProducts")&&"!text-blue-600 !bg-white" } ${navStyleMobile}`}
            href={"/AllProducts"}>All Products</Link>
            <Link 
            onClick={()=>setShowMobile(false)}
            className={`${pathname.includes("/category")&&"!text-blue-600 !bg-white" } ${navStyleMobile}`}
            href={"/category"}>Categories</Link>
            <Link 
            onClick={()=>setShowMobile(false)}
            className={`${pathname.includes("/account")&&"!text-blue-600 !bg-white" } ${navStyleMobile}`} 
            href={"/account"}>Account</Link>
            </nav>
            </div>
    </header>
  )
}
