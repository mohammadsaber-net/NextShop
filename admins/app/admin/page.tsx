"use client"
import StatCard from "@/components/dashboard/StatCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function page() {
   const { data: session } = useSession();
   const [dashboard,setDashboard]=useState<any>(null)
   const getDashboard=async()=>{
    try {
      const {data}=await axios.get("/api/dashboard/")
      console.log(data)
      setDashboard(data.data)
    } catch (error) {
      console.log((error as Error).message)
    }
   }
   useEffect(()=>{
    getDashboard()
   },[])
  return (
    <div>
      <h1 className="text-base sm:text-xl md:text-2xl">Welcome to the Admin Dashboard</h1>
      <div className="flex gap-2 items-center 
      border-border-gray-300 bg-gray-100 dark:bg-gray-600 rounded px-2 p-1 
      justify-between">
        <span className="font-bold dark:text-white text-blue-600">Owner: {session?.user?.name}</span>
        <img 
        src={session?.user?.image!} 
        className="w-10 h-10 rounded-full" 
        alt="" />
        </div>
      {session && (
        <p className="mt-2 text-xs md:text-sm">Logged in as: {session.user?.email}</p>
      )}
      <div className="grid grid-cols-1 mt-4 border-t pt-2 md:grid-cols-3 gap-6">
      <StatCard title="Total Revenue" value={`${dashboard?.totalRevenue} EGP`} />
      <StatCard title="Today Revenue" value={`${dashboard?.todayRevenue} EGP`} />
      <StatCard title="Orders" value={dashboard?.totalOrders} />
      <StatCard title="Paid Orders" value={dashboard?.paidOrders} />
      <StatCard title="Users" value={dashboard?.totalUsers} />
      <StatCard title="Products" value={dashboard?.totalProducts} />
    </div>
    </div>
  )
}
