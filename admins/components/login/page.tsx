"use client";

import { Copy, CopyCheck, CopyCheckIcon, CopySlash, EyeIcon, Goal, LucideEyeOff, Smile, TruckElectricIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const admin="m1732saber@gmail.com";
  const adminPass="gold123"
  const [copied, setCopy] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const Icon=showPassword? EyeIcon:LucideEyeOff
  async function handleLogin(e: any) {
    e.preventDefault();

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  }
  const AdminIcon=copied===admin?CopyCheckIcon:Copy
  const PassIcon=copied===adminPass?CopyCheckIcon:Copy
  const adminLogin=(data:string)=>{
    navigator.clipboard.writeText(data)
    setCopy(data)
    setTimeout(() => {
      setCopy("");
    }, 1500);
  }
  return (
    <div className="relative w-full h-full">
      <div className="w-fit shadow fixed top-2 
      dark:text-gray-200 bg-white 
      text-gray-600
      dark:bg-[#262626] left-1/2 p-2 rounded 
      -translate-x-1/2">
       <Smile className="inline"/> يمكنك استخدام البيانات دي لتسجيل الدخول  شكرا لك
        <div onClick={()=>adminLogin(admin)} className="flex mt-2 gap-5 justify-between items-center">
          {admin}<AdminIcon className="cursor-pointer"/>
        </div>
        <div 
        onClick={()=>adminLogin(adminPass)}
        className="flex gap-5 justify-between mt-2 items-center">
          {adminPass}<PassIcon className="cursor-pointer"/>
        </div>
      </div>
    <form onSubmit={handleLogin} className="flex bg-white dark:bg-[#262626] p-2 shadow-md rounded-lg flex-col gap-4 w-72 m-auto mt-20">
      <h1 className="text-xl dark:text-indigo-200 text-blue-800">Login to Shopify</h1>
      
      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 rounded-md bg-gray-100 outline-none p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative">
        <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="border border-gray-300 w-full h-full rounded-md bg-gray-100 outline-none p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      <Icon className="absolute right-2 top-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
      </div>

      <button type="submit" className="bg-blue-600 rounded-lg cursor-pointer text-white p-2">
        Login
      </button>
    </form>
    </div>
  );
}
