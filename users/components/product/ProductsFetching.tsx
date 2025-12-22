import { mongooseConnection } from "@/lib/mongoose";
import { Product } from "@/lib/model/products";
import ProductBox from "./productBox";
export default async function ProductsFetching({value}:{value:string}) {
  await mongooseConnection();
  let data:any;
  if(value==="limit"){
    data = JSON.parse(JSON.stringify(
    await Product.find({}).sort({ _id: 1 }).limit(10)
  ));
  }else{
    data = JSON.parse(JSON.stringify(
    await Product.aggregate([{$sample:{size:await Product.countDocuments()}}])))
  }
  
  return (
    <>
      {data.map((product: any) => {
        return product.quantity>0&&(
        <ProductBox key={product._id} product={product} />
      )})}
    </>
  );
}
