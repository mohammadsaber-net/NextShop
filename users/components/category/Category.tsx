// "use client"
// import { api } from "@/lib/axios";
// import { Divide } from "lucide-react";
// import { useState } from "react";
// import ProductBox from "../product/productBox";
// export default function Categories({ category }: { category: any }) {
//   const [openCategory, setOpenCategory] = useState<string | null>(null);
//   const [openProperty, setOpenProperty] = useState<string | null>(null);
//   const [products,setProducts]=useState<any>([])
//   const toggleCategory = (id: string) => {
//     setOpenCategory(openCategory === id ? null : id);
//     setOpenProperty(null);
//   };
//   const toggleProperty = (propName: string) => {
//     setOpenProperty(openProperty === propName ? null : propName);
//   };
//   const getProducts=async(category:any)=>{
//     console.log(category)
//     const {data}=await api.get("/api/category/"+category)
//     setProducts(data.products)
//   }
//   return (
//     <div className="w-[90%] min-h-screen mx-auto sm:w-[85%] lg:max-w-[75%] max-w-4xl py-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Categories</h2>
//       {products.length===0&&<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {category.map((item: any) =>{
//         return item.parent&&( 
//               <div
              
//               key={item._id}
//               className="bg-white relative shadow-md hover:shadow-lg transition rounded-xl p-4 border border-gray-200"
//           >
//             <div 
//               className="flex justify-between items-center"
//               onClick={() => toggleCategory(item._id)}
//             >
//               <h3 className="text-xl font-semibold text-indigo-600">{item.name}</h3>
//               <span className="cursor-pointer">Properties{openCategory === item._id ? "-" : "+"}</span>
//             </div>
//             {item.parent && (
//               <p className="text-sm text-gray-500 mt-1">
//                 Main Class: <span className="text-gray-700 font-medium">{item.parent.name}</span>
//               </p>
//             )}
//             {openCategory === item._id && item.properties.length > 0 && (
//               <div className="mt-3 mb-6 space-y-2 border-t border-gray-200 pt-2">
//                 {item.properties.map((prop: any ,ind:any) => (
//                   <div key={ind}>
//                     <div 
//                       className="flex justify-between items-center cursor-pointer bg-gray-100 px-2 py-1 rounded"
//                       onClick={() => toggleProperty(prop.name)}
//                       >
//                       <span className="text-sm font-medium">{prop.name}</span>
//                       <span>{openProperty === prop.name ? "▲" : "▼"}</span>
//                     </div>
//                     {openProperty === prop.name && (
//                         <div className="mt-1 ml-4 space-y-1">
//                         {prop.values.map((val: any, idx: number) => (
//                             <p key={idx} className="text-gray-700 text-sm bg-gray-50 px-2 py-1 rounded">
//                             {val}
//                           </p>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//             <button 
//             onClick={()=>getProducts(item.name)}
//             className="text-indigo-600 border border-indigo-600 absolute right-2 bottom-0
//             p-1 rounded transition hover:text-white hover:bg-indigo-800 cursor-pointer">
//               show products
//             </button>
//           </div>
//         )})}
//       </div>}
//       {products.length>0&&<div>
//         <button
//         onClick={()=>setProducts([])}
//           className="block p-1 rounded transition text-center w-full mb-4
//           hover:text-white hover:bg-indigo-800 cursor-pointer
//           text-indigo-600 border border-indigo-600">
//           Return To Categories
//         </button>
//       <div 
//       className="grid grid-cols-1 max-w-3xl gap-4 sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-3">
//         {products.length>0&&products.map((product:any)=>{
//           return (
//             <ProductBox key={product._id} product={product}/>)
//           })}
//       </div>
//       </div>}
//     </div>
//   );
// }
"use client"
import { api } from "@/lib/axios";
import { useState } from "react";
import ProductBox from "../product/productBox";
import { ChevronDown, ChevronUp, LayoutGrid, ArrowLeft, Settings2 } from "lucide-react"; // أيقونات لو متوفرة

export default function Categories({ category }: { category: any }) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openProperty, setOpenProperty] = useState<string | null>(null);
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
    setOpenProperty(null);
  };

  const toggleProperty = (propName: string) => {
    setOpenProperty(openProperty === propName ? null : propName);
  };

  const getProducts = async (categoryName: any) => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/category/" + categoryName);
      console.log("data",data)
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] min-h-screen mx-auto sm:w-[85%] lg:max-w-7xl py-12">
      <div className="flex items-center gap-3 mb-10 border-b pb-4">
        <LayoutGrid className="text-indigo-600" size={32} />
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Explore Categories</h2>
      </div>

      {products.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.map((item: any) => {
            if (!item.parent) return null; 
            const isExpanded = openCategory === item._id;
            return (
              <div
                key={item._id}
                className={`group bg-white border-2 transition-all duration-300 rounded-3xl p-6 relative
                ${isExpanded ? 'border-indigo-500 shadow-xl' : 'border-slate-100 hover:border-indigo-200 hover:shadow-lg'}`}
              >
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full mb-2 inline-block">
                    {item.parent.name}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {item.name}
                  </h3>
                </div>
                {item.properties.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={() => toggleCategory(item._id)}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      <Settings2 size={16} />
                      {isExpanded ? "Hide Properties" : "View Properties"}
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isExpanded && (
                      <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        {item.properties.map((prop: any, ind: any) => (
                          <div key={ind} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                            <div
                              className="flex justify-between items-center cursor-pointer p-3 hover:bg-slate-100 transition-colors"
                              onClick={() => toggleProperty(prop.name)}
                            >
                              <span className="text-xs font-bold text-slate-700 uppercase">{prop.name}</span>
                              {openProperty === prop.name ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </div>
                            
                            {openProperty === prop.name && (
                              <div className="px-3 pb-3 flex flex-wrap gap-2">
                                {prop.values.map((val: any, idx: number) => (
                                  <span key={idx} className="text-[11px] bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-600 font-medium">
                                    {val}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-8 flex gap-2 flex-col md:flex-row">
                  <button
                    onClick={() => getProducts(item.name)}
                    className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold text-sm 
                    hover:bg-indigo-600 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                  >
                    Explore {item.name} Products
                  </button>
                  <button
                    onClick={() => getProducts(item.parent.name)}
                    className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold text-sm 
                    hover:bg-indigo-600 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                  >
                    Explore {item.parent.name} Products
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          <button
            onClick={() => setProducts([])}
            className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all"
          >
            <ArrowLeft size={20} />
            Back to All Categories
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductBox key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}