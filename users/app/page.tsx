// import { Suspense } from "react";
// import Hero from "@/components/hero/Hero";
// import { mongooseConnection } from "@/lib/mongoose"
// import ProductBox from "@/components/product/productBox";
// import { Product } from "@/lib/model/products"
// export default async function page() {
//   await mongooseConnection()
//   const data = JSON.parse(JSON.stringify (await Product.find({}).sort({_id:1}).limit(10)))
//   return (
//     <div className="bg-gray-50">
//         <Hero />
//         <div className="w-[90%] mx-auto sm:w-[85%] lg:max-w-[75%] max-w-3xl">
//           <h2 className="text-2xl font-semibold mt-6 mb-1">Latest Products</h2>
//           <Suspense>
//           <div className="grid grid-cols-1 mb-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {data.map((product:any)=>(
//               <ProductBox key={product._id} product={product}/>
//             ))}
//           </div>
//         </Suspense>
//         </div>
//     </div>
//   )

import ProductsFallback from "@/components/animations/ProductsFallback";
import Hero from "@/components/hero/Hero";
import ProductsFetching from "@/components/product/ProductsFetching";
import { Suspense } from "react";

// }
export default function Page() {
  return (
    <div className="">
      <Hero />

      <div className="w-[90%] mx-auto sm:w-[85%] lg:max-w-[75%] max-w-3xl">
        <h2 className="text-2xl font-semibold mt-6 mb-1">Latest Products</h2>

        <Suspense fallback={<ProductsFallback />}>
          <div id="Latest" className="grid grid-cols-1 mb-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductsFetching value={"limit"}/>
          </div>
        </Suspense>
      </div>
    </div>
  );
}