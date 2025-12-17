"use client"
import { Home, List, LogOut, Package, Settings, ShoppingCart, User } from 'lucide-react'
import { signOut } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from "next/navigation";
export default function PcNav({setMobile}:{setMobile:React.Dispatch<React.SetStateAction<boolean>>}) {
  const pathname=usePathname()
  const active=" bg-white dark:bg-gray-500 dark:text-cyan-300 text-blue-600 "
  return (
    <nav className='capitalize flex-col flex gap-2 mt-10'>
        <Link onClick={()=>setMobile(false)} href={"/admin"} 
        className={`flex p-2 rounded-s-md transition hover:bg-white hover:dark:bg-gray-500 items-center gap-2 ${pathname==="/admin"&&active}`}>
        <Home /> dashboard
        </Link>
        <Link onClick={()=>setMobile(false)} href={"/admin/products"} 
        className={`flex p-2 rounded-s-md transition hover:bg-white hover:dark:bg-gray-500 items-center gap-2 ${pathname.includes("/admin/products")&&active}`}>
        <Package /> products
        </Link>
        <Link onClick={()=>setMobile(false)} href={"/admin/categories"} 
        className={`flex p-2 rounded-s-md transition hover:bg-white hover:dark:bg-gray-500 items-center gap-2 ${pathname.includes("/admin/categories")&&active}`}>
        <List /> categories
        </Link>
        <Link onClick={()=>setMobile(false)} href={"/admin/orders"} 
        className={`flex p-2 rounded-s-md transition hover:bg-white hover:dark:bg-gray-500 items-center gap-2 ${pathname==="/admin/orders"&&active}`}>
        <ShoppingCart /> orders 
        </Link>
        <Link onClick={()=>setMobile(false)} href={"/admin/users"} 
        className={`flex p-2 rounded-s-md transition hover:bg-white hover:dark:bg-gray-500 items-center gap-2 ${pathname==="/admin/users"&&active}`}>
        <User /> users 
        </Link>
        <div onClick={()=>signOut()} className='flex p-2 cursor-pointer transition hover:bg-white hover:dark:bg-gray-500 rounded-s-md items-center gap-2 '>
         <LogOut />
          Logout
        </div>
    </nav>
  )
}
