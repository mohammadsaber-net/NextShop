"use client"
import { LogOut, StoreIcon } from 'lucide-react'
import PcNav from './pcNav'
import { signOut } from 'next-auth/react'


export default function ResponsiveNav({setMobile,mobile}:{setMobile:React.Dispatch<React.SetStateAction<boolean>>,mobile:boolean}) {
  
  const mobileStyle = mobile
  ? "fixed top-0 left-0 right-0 bottom-0 z-30 p-4 md:left-0"
  : "fixed -left-full md:left-0";
  return (
    <aside className={`h-screen md:static transition-all duration-300 bg-gray-100 dark:bg-gray-700 md:w-60 ${mobileStyle}`}>
      <div className='ms-4 pt-5'>
        <div className='gap-2 hidden md:flex items-center capitalize dark:text-slate-100 text-gray-700 font-bold tracking-widest justify-start'>
        <StoreIcon /> admin panel
        </div>
        <PcNav setMobile={setMobile}/>
      </div>
      
     
      
    </aside>
  )
}
