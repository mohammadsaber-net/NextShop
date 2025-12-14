import ProductsFallback from "@/components/animations/ProductsFallback";
import Hero from "@/components/hero/Hero";
import ProductsFetching from "@/components/product/ProductsFetching";
import { Suspense } from "react";
export default function Page() {
  return (
    <div className="">
      <Hero />

      <div className="w-[90%] mx-auto sm:w-[85%] lg:max-w-[75%] max-w-3xl">
        <h2 className="text-2xl font-semibold mt-6 mb-1">Latest Products</h2>

        <Suspense fallback={<ProductsFallback />}>
          <div id="Latest" className="grid grid-cols-1 mb-6 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductsFetching value={"limit"}/>
          </div>
        </Suspense>
      </div>
    </div>
  );
}