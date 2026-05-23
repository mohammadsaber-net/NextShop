
"use client"
import { RootState } from '@/redux/store'
import { MenuIcon, ShoppingCart, X, User, Cpu } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SearchProduct from '../product/searchProduct'
import { usePathname } from 'next/navigation'
const navStyle = `relative px-2 py-1 font-semibold text-slate-100 text-md transition-all duration-300 
hover:text-indigo-400 group`

export default function Header() {
  const pathname = usePathname()
  const [showMobile, setShowMobile] = useState(false)
  const Icon = showMobile ? X : MenuIcon
  const cartIds = useSelector((state: RootState) => state.cart)
  const [scroll,setScroll]=useState(false)
  useEffect(()=>{
    const handleScroll=()=>{
      window.scrollY>50? setScroll(true):setScroll(false)
    }
    window.addEventListener("scroll",handleScroll)
    return()=>{
      window.removeEventListener("scroll",handleScroll)
    }
  },[scroll])
  return (
    <header className={`fixed z-[100] top-0 left-0 right-0 ${scroll ? 'bg-[#0f172a]/80 backdrop-blur-md' : 'bg-[#0f172a]'} border-b border-indigo-500/20 shadow-xl`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex justify-between items-center">
        <Link href={"/"} className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Cpu className="size-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            ELECTRO<span className="text-indigo-500">SHOP</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6'>
          <nav className='flex items-center gap-4'>
            {[
              { name: 'Home', path: '/' },
              { name: 'Products', path: '/AllProducts' },
              { name: 'Categories', path: '/category' },
            ].map((link) => (
              <Link 
                key={link.path}
                className={`${navStyle} ${pathname === link.path ? "text-indigo-400" : ""}`}
                href={link.path}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-500 transition-all duration-300 
                  ${pathname === link.path ? "w-full" : "w-0 group-hover:w-full"}`} 
                />
              </Link>
            ))}
          </nav>

          {/* فاصل أنيق */}
          <div className="h-8 w-px bg-slate-700/50" />

          <div className="flex items-center gap-4">
            <SearchProduct />
            
            {/* أيقونة السلة بتصميم أنيق */}
            <Link 
              href={"/cart"}
              className="relative p-2 text-slate-300 hover:bg-slate-800 rounded-full transition-all"
            >
              <ShoppingCart className="size-5" />
              {cartIds.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full size-4 flex items-center justify-center border-2 border-[#0f172a]">
                  {cartIds.length}
                </span>
              )}
            </Link>

            <Link href="/account" className="p-2 text-slate-300 hover:bg-slate-800 rounded-full transition-all">
              <User className="size-5" />
            </Link>
          </div>
        </div>
        <div className='flex md:hidden items-center gap-3'>
           <Link className="relative p-2 text-white" href={"/cart"}>
              <ShoppingCart className="size-6" />
              <span className="absolute top-1 right-1 bg-indigo-600 text-[10px] rounded-full size-4 flex items-center justify-center">
                {cartIds.length}
              </span>
           </Link>
           <button 
             onClick={() => setShowMobile(!showMobile)}
             className="p-1.5 text-white hover:bg-slate-800 rounded-lg transition-colors"
           >
             <Icon className='size-7' />
           </button>
        </div>
      </div>
      <div className={`absolute top-16 left-0 w-full bg-[#161e31] border-b border-indigo-500/20 transition-all duration-300 ease-in-out md:hidden shadow-2xl
        ${showMobile ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}>
        <nav className="flex flex-col p-4 space-y-2">
          <Link onClick={() => setShowMobile(false)} className="p-3 text-slate-200 hover:bg-indigo-600 rounded-xl transition-colors" href="/">Home</Link>
          <Link onClick={() => setShowMobile(false)} className="p-3 text-slate-200 hover:bg-indigo-600 rounded-xl transition-colors" href="/AllProducts">Products</Link>
          <Link onClick={() => setShowMobile(false)} className="p-3 text-slate-200 hover:bg-indigo-600 rounded-xl transition-colors" href="/category">Categories</Link>
          <Link onClick={() => setShowMobile(false)} className="p-3 text-slate-200 hover:bg-indigo-600 rounded-xl transition-colors" href="/account">My Account</Link>
          <div className="pt-4 border-t border-slate-700">
             <SearchProduct />
          </div>
        </nav>
      </div>
    </header>
  )
}