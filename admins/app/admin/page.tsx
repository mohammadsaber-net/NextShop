"use client"
import { useSession } from "next-auth/react";

export default function page() {
   const { data: session } = useSession();
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
    </div>
  )
}
