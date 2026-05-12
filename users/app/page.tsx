import ProductsFallback from "@/components/animations/ProductsFallback";
import Hero from "@/components/hero/Hero";
import ProductsFetching from "@/components/product/ProductsFetching";
import Link from "next/link";
import { Suspense } from "react";
export default function Page() {
  return (
    <div className="bg-zinc-100">
      <Hero />

      <div className="w-[90%] mx-auto sm:w-[85%] lg:max-w-[75%] max-w-6xl">
        {/* <h2 className="text-2xl font-semibold mt-6 mb-1">Latest Products</h2> */}

        {/* <Suspense fallback={<ProductsFallback />}>
          <div id="Latest" className="grid grid-cols-1 mb-6 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductsFetching value={"limit"}/>
          </div>
        </Suspense>
      </div> */}
      <div id="Latest" className="bg-slate-50/50 py-16">
  <div className="max-w-7xl mx-auto px-6">
    {/* عنوان القسم */}
    <div className="flex items-end justify-between mb-10">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Featured Products</h2>
        <p className="text-slate-500 mt-2">Explore our latest high-tech gadgets</p>
      </div>
      <Link href="/AllProducts" className="text-indigo-600 font-semibold hover:underline">
        View All →
      </Link>
    </div>

    <Suspense fallback={<ProductsFallback />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ProductsFetching value={"limit"}/>
      </div>
    </Suspense>
  </div>
</div>
    </div>
    </div>
  );
}