"use client"
import { signOut, useSession} from "next-auth/react";
import ResponsiveNav from "@/components/nav/responsiveNav";
import ProgressBar from "@/components/progress/ProgressBar";
import { Toaster } from "react-hot-toast";
import LoginPage from "@/components/login/page";
import { MenuIcon, StoreIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session,status } = useSession();
  const [mobile,setMobile]=useState(false)
  const Icon=mobile?X:MenuIcon
  if(status==="loading"){
    return null
  }
  if (!session) {
    return (
      <div 
      className="flex min-h-screen items-center bg-zinc-100 
      text-gray-900 dark:text-white font-sans dark:bg-[#121212]">
        <div className="mx-auto">
          <LoginPage />
        </div>
      </div>
    );
  }
  return (
    <div>
      <ProgressBar />
      <div className="relative bg-gray-100 dark:bg-gray-700  z-40 shadow px-5 py-4 flex justify-between md:hidden">
        <Icon onClick={()=>setMobile(!mobile)} className={`transition-all cursor-pointer dark:text-white duration-300 ${mobile?"text-blue-600":"text-gray-900"}`}/>
        <div className='flex gap-2 items-center capitalize dark:text-slate-100 text-gray-700 font-bold tracking-widest justify-start'>
        <StoreIcon /> admin panel
        </div>
      </div>
      <div className="text-gray-900 dark:text-white bg-gray-200 dark:bg-black flex">
        <ResponsiveNav setMobile={setMobile} mobile={mobile}/>
        <div className="bg-white dark:bg-gray-500
         h-screen w-full overflow-auto p-2">
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
}
