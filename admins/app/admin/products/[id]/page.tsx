import FormModel from "@/components/products/formModel";
import axios from "axios";
export default async function page({params}:{params:any}) {
    const {id}=await params
    console.log("id in page ",id)
    const {data}=await axios.get(`${process.env.NEXTAUTH_URL}/api/products/${id}`) 

  return (
    <div>
      <FormModel mode={"edit"} product={data.data}/>
    </div>
  )
}