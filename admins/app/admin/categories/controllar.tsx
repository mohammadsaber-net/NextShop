import axios from "axios"
import toast from "react-hot-toast"
export const getCate=async()=>{
    const {data}= await axios.get("/api/category")
    return data.data
}
export const deleteCategory=async(id:any,setCategories:any)=>{
      try{const {data}=await axios.delete("/api/category/"+id)
      if(data.success){
        toast.success("category deleted successfully")
        return getCate().then(date=>setCategories(date))
      }else{
        return toast.error(data.message||"failded to delete category")
      }
      } catch (error) {
        return toast.error((error as Error).message||"failded to add category")
        }
    }