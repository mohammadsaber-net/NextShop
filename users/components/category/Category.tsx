"use client"
import { api } from "@/lib/axios";
import { Divide } from "lucide-react";
import { useState } from "react";
import ProductBox from "../product/productBox";
export default function Categories({ category }: { category: any }) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openProperty, setOpenProperty] = useState<string | null>(null);
  const [products,setProducts]=useState<any>([])
  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
    setOpenProperty(null);
  };
  const toggleProperty = (propName: string) => {
    setOpenProperty(openProperty === propName ? null : propName);
  };
  const getProducts=async(category:any)=>{
    console.log(category)
    const {data}=await api.get("/api/category/"+category)
    setProducts(data.products)
  }
  return (
    <div className="w-[90%] min-h-screen mx-auto sm:w-[85%] lg:max-w-[75%] max-w-4xl py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Categories</h2>
      {products.length===0&&<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.map((item: any) =>{
        return item.parent&&( 
              <div
              
              key={item._id}
              className="bg-white relative shadow-md hover:shadow-lg transition rounded-xl p-4 border border-gray-200"
          >
            <div 
              className="flex justify-between items-center"
              onClick={() => toggleCategory(item._id)}
            >
              <h3 className="text-xl font-semibold text-indigo-600">{item.name}</h3>
              <span className="cursor-pointer">Properties{openCategory === item._id ? "-" : "+"}</span>
            </div>
            {item.parent && (
              <p className="text-sm text-gray-500 mt-1">
                Main Class: <span className="text-gray-700 font-medium">{item.parent.name}</span>
              </p>
            )}
            {openCategory === item._id && item.properties.length > 0 && (
              <div className="mt-3 mb-6 space-y-2 border-t border-gray-200 pt-2">
                {item.properties.map((prop: any ,ind:any) => (
                  <div key={ind}>
                    <div 
                      className="flex justify-between items-center cursor-pointer bg-gray-100 px-2 py-1 rounded"
                      onClick={() => toggleProperty(prop.name)}
                      >
                      <span className="text-sm font-medium">{prop.name}</span>
                      <span>{openProperty === prop.name ? "▲" : "▼"}</span>
                    </div>
                    {openProperty === prop.name && (
                        <div className="mt-1 ml-4 space-y-1">
                        {prop.values.map((val: any, idx: number) => (
                            <p key={idx} className="text-gray-700 text-sm bg-gray-50 px-2 py-1 rounded">
                            {val}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <button 
            onClick={()=>getProducts(item.name)}
            className="text-indigo-600 border border-indigo-600 absolute right-2 bottom-0
            p-1 rounded transition hover:text-white hover:bg-indigo-800 cursor-pointer">
              show products
            </button>
          </div>
        )})}
      </div>}
      {products.length>0&&<div>
        <button
        onClick={()=>setProducts([])}
          className="block p-1 rounded transition text-center w-full mb-4
          hover:text-white hover:bg-indigo-800 cursor-pointer
          text-indigo-600 border border-indigo-600">
          Return To Categories
        </button>
      <div 
      className="grid grid-cols-1 max-w-3xl gap-4 sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-3">
        {products.length>0&&products.map((product:any)=>{
          return (
            <ProductBox key={product._id} product={product}/>)
          })}
      </div>
      </div>}
    </div>
  );
}
