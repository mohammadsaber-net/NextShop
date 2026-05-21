import FormModel from "@/components/products/formModel";
export default async function page({params}:{params:Promise<{id:string}>}) {
    const {id}=await params
    const data=await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`)
    .then((res)=>res.json())
    console.log(data)
  return (
    <div>
      <FormModel mode={"edit"} product={data.data}/>
    </div>
  )
}