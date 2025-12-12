"use client";

import { EyeIcon, LucideEyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
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

  return (
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
      {/* <button
        type="button"
        onClick={() => signIn("google")}
        className="bg-red-600 rounded-lg cursor-pointer text-white p-2"
      >
        Continue with Google
      </button> */}
    </form>
  );
}
