"use client"
import { userSchema } from '@/validation/addProductSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";   

export default function page() {
    const router=useRouter()
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
        reset,
        setValue
      } = useForm({
        resolver: zodResolver(userSchema),
        mode: "all",
        defaultValues: { name: "", email: "", image: undefined, phone: "", role: "", password: "" }
      });
        const onSubmit = async(data:any)=>{
            const form=new FormData();
            form.append("name",data.name);
            form.append("email",data.email);
            form.append("phone",data.phone);
            form.append("role",data.role || "");
            form.append("password",data.password);
            if(data.image){
                form.append("image",data.image);
            }
            try {
                const {data}=await axios.post("/api/users",form,{
                    headers: {
                        withCredentials: "true",
                        "Content-Type": "multipart/form-data",
                    }})
                if(data.success){
                    toast.success("User added successfully");
                    router.push("/admin/users")
                    reset();
                }else{
                    toast.error(data.message||"failed to add user");
                }
            } catch (error) {
                toast.error((error as Error).message||"failed to add user");
            }
        }
  return (
    <div>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className='mb-2'>
            <label htmlFor="name" className='text-blue-500'>Name</label>
            <input type="text" id='name' {...register("name")}/>
            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>
        <div className='mb-2'>
            <label htmlFor="email" className='text-blue-500'>Email</label>
            <input type="text" id='email' {...register("email")}/>
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        </div>
        <div className='mb-2'>
            <label htmlFor="password" className='text-blue-500' >password</label>
            <input type="text" id='password' {...register("password")}/>
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        </div>
        <div className='mb-2'>
            <label className='text-blue-500' htmlFor="phone">phone</label>
            <input type="number" id='phone' {...register("phone")}/>
            {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
        </div>
        <div className='mb-2'>
            <label htmlFor="image" className='text-blue-500'>image</label>
            <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => {
                setValue("image", e.target.files?.[0], { shouldValidate: true });
                }}
            />
            {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
        </div>
        <div className='mb-2'>
            <label className='text-blue-500 block' htmlFor="role">role</label>
            <select className='border border-gray-300 rounded-md p-1 bg-gray-100 block focus:outline-none focus:ring-blue-500 focus:border-transparent' {...register("role")} id="role">
                <option value="">no User Selected</option>
                <option value="CUSTOMER">CUSTOMER</option>
                <option value="MANAGER">MANAGER</option>
                <option value="ADMIN">ADMIN</option>
            </select>
            {errors.role && <p className='text-red-500'>{errors.role.message}</p>}
        </div>
        <button 
        type='submit' 
        disabled={!isValid}
        className={`mx-auto block ${
            !isValid
              ? "bg-gray-700 hover:bg-gray-700"
              : "cursor-pointer bg-blue-800 hover:bg-blue-900"
          } text-white px-3 py-1.5 rounded-lg`}>Submit</button>
        </form>
    </div>
  )
}
