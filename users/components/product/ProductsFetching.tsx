import { mongooseConnection } from "@/lib/mongoose";
import { Product } from "@/lib/model/products";
import ProductBox from "./productBox";
import { Order } from "@/lib/model/order";
export default async function ProductsFetching({value}:{value:string}) {
  await mongooseConnection();
  let data:any;
  if(value==="limit"){
    data = JSON.parse(JSON.stringify(
    await Product.find({}).sort({ _id: 1 }).limit(10)
  ));
  }else{
    data = JSON.parse(JSON.stringify(
    await Product.find({}).sort({ _id: -1 })));
  }
  
  return (
    <>
      {data.map((product: any) => (
        <ProductBox key={product._id} product={product} />
      ))}
    </>
  );
}
