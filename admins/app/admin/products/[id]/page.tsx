import FormModel from "@/components/products/formModel";
import axios from "axios";
export default async function page({params}:{params:any}) {
    const {id}=await params
    const data=await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`)
    .then((res)=>res.json())

  return (
    <div>
      <FormModel mode={"edit"} product={data.data}/>
    </div>
  )
}