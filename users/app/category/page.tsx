import Categories from "@/components/category/Category"
import { Category } from "@/lib/model/category"

export default async function page() {
    const category = JSON.parse(JSON.stringify(await Category.find().populate("parent")))
  return (
    <div>
      <Categories category={category}/>
    </div>
  )
}
