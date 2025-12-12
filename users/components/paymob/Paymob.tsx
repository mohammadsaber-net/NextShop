"use client"

import { X } from "lucide-react"

type Props={
    iframeUrl:string,
    setPay:any
}
export default function Paymob({iframeUrl,setPay}:Props) {
  return (
    <div 
    className="fixed inset-0 bg-gray-300/50 z-50 flex items-center justify-center">
     <div className="w-full mt-20 relative">
        <button
        className="border-none text-white bg-red-600
        cursor-pointer p-1 rounded absolute z-10 top-2 right-2"
        onClick={()=>setPay(false)}>
            <X />
        </button>
      {iframeUrl&&<iframe
          src={iframeUrl}
          width="100%"
          height="600px"
          frameBorder="0"
          allowFullScreen
        ></iframe>}
    </div>
    </div>
  )
}
