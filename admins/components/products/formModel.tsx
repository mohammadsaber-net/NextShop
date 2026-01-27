"use client";
import { schema } from "@/validation/addProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm} from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { ReactSortable } from "react-sortablejs";
import { getCate } from "@/app/admin/categories/controllar";
type Props = {
  mode: "add" | "edit";
  product?: {
    _id: any;
    title: string;
    description: string;
    price: string;
    parent: string;
    quantity: string;
    category: string;
    images: string[];
    properties:{ name: string; values: [string]; }[];
  };
};
type SortableImage = {
  id: string;
  url?: string;
  file?: File;
};
export default function FormModel({ mode, product }: Props) {
  const[ categoryProperty,setCategoryProperty]=useState<any>(null)
  const [category,setCategory]=useState<any>([])
  useEffect(()=>{
    getCate().then(date=>setCategory(date))
  },[])
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: product || {},
  });
  useEffect(() => {
  if (product && category.length > 0) {
    reset(product);
  }
}, [category.length]);
const router = useRouter();
const [images, setImages] = useState<SortableImage[]>(
    product?.images
    ? product.images.map((url) => ({
      id: crypto.randomUUID(),
      url,
        }))
        : []
  );
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
    }));
    
    setImages((prev) => [...prev, ...newImages]);
  };
  const sortingImages = (newState: SortableImage[]) => {
    setImages(newState);
  };
  const onSubmit = async (productData: any) => {
    const form = new FormData();
    console.log(productData)
    form.append("title", productData.title);
    form.append("description", productData.description);
    form.append("price", productData.price);
    form.append("category", productData.category);
    form.append("quantity", productData.quantity);
    form.append("categoryParent", productData.parent);
    form.append("properties", JSON.stringify(productData.properties || []));
    images.forEach((img) => {
      if (img.file) {
        form.append("images", img.file);
      } else if (img.url) {
        form.append("existingImages", img.url);
      }
    });
    if (mode === "add") {
        try {
          const { data } = await axios.post("/api/products", form,{withCredentials:true});
          if (data.success) {
            toast.success("Product added"); 
          return router.push("/admin/products");
        }
        return toast.error(data.message||"Failed to add product");
        } catch (error) {
      return toast.error((error as Error).message);
    }
      } else {
        const { data } = await axios.patch(`/api/products/${product?._id}`, form,{withCredentials:true});
        if (data.success) {
          toast.success("Product updated successfully");
          return router.push("/admin/products");
        }
        return toast.error(data.message || "Failed to update product");
      }
    
    };
    const removeImage=(id:any)=>{
      setImages(images.filter((img)=>img.id!==id))
    }
    useEffect(() => {
      if (product && category.length > 0) {
        const cat = category.find((item:any) => item.name === product.category);
        setCategoryProperty(cat || null);
      }
    }, [product, category]);

  return (
    <div>
      <h2 className="text-xl border-b sm:text-2xl text-blue-800 font-bold mb-5 lg:text-3xl">
        {mode === "add" ? "Add Product" : "Update Product"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="text-gray-800">
        <div className="mb-3">
          <label className="text-blue-600 dark:text-white block">Title</label>
          <input
            {...register("title")}
            type="text"
            placeholder="Product Title"
            className="outline-none p-2 dark:placeholder:text-gray-400 bg-gray-100 placeholder:text-gray-600 rounded-lg w-full sm:w-[70%] border border-gray-200 focus:border-gray-400"
          />
          {errors.title && (
            <p className="text-red-500  dark:text-white text-xs">{errors.title.message}</p>
          )}
        </div>
          <div  className="mb-3">
            <label className="text-blue-600 dark:text-white block">Category</label>
            <select 
              {...register("category")}
              onChange={(ev)=>{
                const data= ev.target.value as any
                setCategoryProperty(category.find(((item:any) => item.name === data)) || null)}}
              className="outline-none cursor-pointer placeholder:text-gray-600  w-full sm:w-[70%] p-2 bg-gray-100 rounded-lg border border-gray-200 focus:border-gray-400"
            >
              <option value="">Uncategorized</option>
              {
                category.length>0&&category.map((c:any)=>{
                  return <option key={c._id} value={c.name}>{c.name}</option>
                })
              }
            </select>
            {errors.category && (
              <p className="text-red-500  dark:text-white text-xs">{errors.category.message}</p>
            )}
            {categoryProperty?.parent&&<div className=" flex gap-1 items-center">
              type: <input id="parentcat" type="radio" 
              {...register("parent")} 
              checked
              value={categoryProperty?.parent.name}/>
              <label htmlFor="parentcat">{categoryProperty?.parent.name}</label>
            </div>}
            {categoryProperty?.properties?.length>0&&categoryProperty?.properties?.map((item:any,ind:any)=>{
              return (
              <div className="flex gap-5 mt-2" key={ind}>
                <div className="flex gap-5">
                  <div>
                    <input id={`item-${ind}`} type="radio" 
                    {...register(`properties.${ind}.name`)} 
                    value={item.name}/>
                    <label htmlFor={`item-${ind}`}>{item.name}</label>
                  </div>
                  <div
                  className="flex gap-2 flex-wrap"
                  >{item.values.map((item:any)=>(
                  <div key={item} className="flex items-center gap-1">
                  <input {...register(`properties.${ind}.values`)} id={item} type="checkbox" value={item}/>
                  <label htmlFor={item}> {item}
                  </label>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        <div className="mb-3 flex flex-wrap gap-1">
          <ReactSortable list={images} setList={sortingImages} className="flex gap-1 flex-wrap">
            {images.map((img) => (
              <div key={img.id} className="w-fit h-fit group relative">
                <img
                src={img.url}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="absolute top-0 opacity-0 group-hover:opacity-100 -z-10 group-hover:z-10
               left-0 bg-gray-600/50 transition dark:bg-gray-800/50 dark:text-white
              flex  items-center justify-center h-full w-full">
                <X onClick={()=>removeImage(img.id)} className="cursor-pointer"/>
              </div>
              </div>
            ))}
          </ReactSortable>
          <label
            htmlFor="productImages"
            className="flex items-center shadow-md justify-center gap-1 w-24 h-24 text-sm bg-gray-200 dark:bg-gray-700 dark:text-white cursor-pointer rounded text-gray-600"
          >
            <Upload /> Photo
            <input
              id="productImages"
              type="file"
              accept="image/*"
              multiple
              className="!hidden"
              onChange={handleImages}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="text-blue-600 dark:text-white block">Description</label>
          <textarea
            {...register("description")}
            placeholder="Description"
            className="outline-none p-2 dark:text-white bg-gray-100 dark:bg-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-400 w-full sm:w-[70%] rounded-lg border border-gray-200 resize-none h-28 focus:border-gray-400"
          ></textarea>
          {errors.description && (
            <p className="text-red-500  dark:text-white text-xs">{errors.description.message}</p>
          )}
        </div>
          <div className="mb-3">
            <label className="text-blue-600 dark:text-white block">Price</label>
            <input
              {...register("price")}
              type="number"
              placeholder="Price"
              className="outline-none dark:placeholder:text-gray-400 w-full placeholder:text-gray-600 sm:w-[70%] p-2 bg-gray-100 rounded-lg border border-gray-200 focus:border-gray-400"
            />
            {errors.price && (
              <p className="text-red-500 dark:text-white text-xs">{errors.price.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="text-blue-600 dark:text-white block">Stock</label>
            <input
              {...register("quantity")}
              type="number"
              placeholder="Stock"
              className="outline-none dark:placeholder:text-gray-400 
              w-full placeholder:text-gray-600 sm:w-[70%]
               p-2 bg-gray-100 rounded-lg border border-gray-200 focus:border-gray-400"
            />
            {errors.quantity && (
              <p className="text-red-500 dark:text-white text-xs">{errors.quantity.message}</p>
            )}
          </div>
        <button
          disabled={!isValid}
          type="submit"
          className={`mx-auto block ${
            !isValid
              ? "bg-gray-700 hover:bg-gray-700"
              : "cursor-pointer bg-blue-800 hover:bg-blue-900"
          } text-white px-3 py-1.5 rounded-lg`}
        >
          {mode === "add" ? "Add Product" : "Update Product"}
        </button>
      </form>
    </div>
  );
}
