import { Suspense } from "react";
import ProductsFetching from '@/components/product/ProductsFetching';
import ProductsFallback from '@/components/animations/ProductsFallback';
export default async function page() {
  return (
    <div className="w-[90%] mx-auto sm:w-[85%] lg:max-w-[75%] max-w-3xl">
        <h2 className="text-2xl font-semibold mt-6 mb-1">All Products</h2>
        <Suspense fallback={<ProductsFallback />}>
            <div className="grid grid-cols-1 mb-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <ProductsFetching value={"all"}/>
            </div>
        </Suspense>
    </div>
  )
}
