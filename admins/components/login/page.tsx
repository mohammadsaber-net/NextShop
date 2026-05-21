"use client";

import { Copy, CopyCheck, CopyCheckIcon, CopySlash, EyeIcon, Goal, LucideEyeOff, Smile, TruckElectricIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const admin="mssfo2006@gmail.com";
  const adminPass="gold123"
  const [copied, setCopy] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const Icon=showPassword? EyeIcon:LucideEyeOff
  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true)
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
    setLoading(false)
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
  <div
    className="
    min-h-screen
    flex items-center justify-center
    py-2
    dark:text-gray-100 
    bg-gradient-to-br
    from-indigo-100
    via-white
    rounded
    to-cyan-100
    dark:from-[#0f172a]
    dark:via-[#111827]
    dark:to-[#1e1b4b]
    relative overflow-hidden
  "
  >
    <div className="absolute w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl -top-10 -left-10" />
    <div className="absolute w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl bottom-0 right-0" />

    <div
      className="
      w-full max-w-md
      backdrop-blur-xl
      bg-white/70 dark:bg-white/5
      border border-white/30 dark:border-white/10
      rounded-3xl
      shadow-2xl
      py-4 px-6
      z-10
      "
    >
      <div className="text-center mb-6">
        <div className="
        w-16 h-16
        mx-auto
        rounded-2xl
        bg-indigo-100
        dark:bg-indigo-500/20
        flex items-center justify-center
        ">
          <TruckElectricIcon className="text-indigo-600" />
        </div>

        <h1 className="text-2xl font-bold mt-4 dark:text-white">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Sign in to continue
        </p>
      </div>
      <div className="
      mb-6
      rounded-2xl
      p-4
      bg-indigo-50
      dark:bg-indigo-500/10
      border border-indigo-200
      dark:border-indigo-500/20
      ">
        <div className="flex items-center gap-2 mb-3">
          <Smile className="w-4 h-4 text-indigo-500" />
          <p >استخدم الداتا التالية لتسجيل الدخول</p>
        </div>

        <div
          onClick={() => adminLogin(admin)}
          className="
          p-3 rounded-xl
          bg-white dark:bg-gray-800
          flex justify-between items-center
          cursor-pointer
          mb-2
          hover:scale-[1.02]
          transition
        "
        >
          <div>
            <p className="text-xs text-gray-400">
              Email
            </p>

            <p className="text-sm font-medium">
              {admin}
            </p>
          </div>

          <AdminIcon className="w-5 cursor-pointer" />
        </div>

        <div
          onClick={() => adminLogin(adminPass)}
          className="
          p-3 rounded-xl
          bg-white dark:bg-gray-800
          flex justify-between items-center
          cursor-pointer
          hover:scale-[1.02]
          transition
        "
        >
          <div>
            <p className="text-xs text-gray-400">
              Password
            </p>

            <p className="text-sm font-medium">
              {adminPass}
            </p>
          </div>

          <PassIcon className="w-5 cursor-pointer" />
        </div>
      </div>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          p-3 rounded-xl
          bg-white dark:bg-gray-800
          border border-gray-200
          dark:border-gray-700
          outline-none
          focus:ring-2
          focus:ring-indigo-500
          "
        />

        <div className="relative">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
            p-3 rounded-xl
            w-full
            bg-white dark:bg-gray-800
            border border-gray-200
            dark:border-gray-700
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
          />

          <Icon
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            cursor-pointer
            text-gray-500
          "
          />
        </div>

        <button
        disabled={loading}
          type="submit"
          className="
          mt-2
          disabled:bg-gray-400
          disabled:pointer-events-none
          focus:from-indigo-700
          focus:from-cyan-600
          rounded-xl
          p-3
          text-white
          font-medium
          bg-gradient-to-r
          from-indigo-600
          to-cyan-500
          hover:scale-[1.02]
          transition
          "
        >
          {loading?"Loading...":"Login"}
        </button>
      </form>
    </div>
  </div>
);
}
