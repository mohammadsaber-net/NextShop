
"use client"
import { userSchema } from '@/validation/addProductSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, Phone, Shield, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function AddUserPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
        reset,
        setValue,
        watch
    } = useForm({
        resolver: zodResolver(userSchema),
        mode: "all",
        defaultValues: { name: "", email: "", image: undefined, phone: "", role: "", password: "" }
    });

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        const form = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'image' && data.image) {
                form.append("image", data.image);
            } else {
                form.append(key, data[key]);
            }
        });

        try {
            const { data: res } = await axios.post("/api/users", form, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (res.success) {
                toast.success("تم إضافة المستخدم بنجاح");
                router.push("/admin/users");
                reset();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "فشل في إضافة المستخدم");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className=" dark:bg-[#0f172a] bg-transparent py-4 px-4">
            <div className="max-w-3xl mx-auto">
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-indigo-600 p-2 rounded-lg">
                        <UserPlus className="text-white size-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold dark:text-white">إضافة مستخدم جديد</h2>
                        <p className="text-slate-400 text-sm">أدخل البيانات المطلوبة لإنشاء حساب جديد في النظام</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-200 dark:bg-slate-800/40 backdrop-blur-md border border-white/5 p-8 rounded-3xl shadow-2xl">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="form-label flex items-center gap-2">
                                <UserPlus className="size-4 text-indigo-400" /> الاسم الكامل
                            </label>
                            <input type="text" id='name' placeholder="أحمد محمد..." {...register("name")} className="form-input" />
                            {errors.name && <p className='text-red-400 text-xs mt-1'>{errors.name.message as string}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="form-label flex items-center gap-2">
                                <Mail className="size-4 text-indigo-400" /> البريد الإلكتروني
                            </label>
                            <input type="email" id='email' placeholder="example@mail.com" {...register("email")} className="form-input" />
                            {errors.email && <p className='text-red-400 text-xs mt-1'>{errors.email.message as string}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="form-label flex items-center gap-2">
                                <Lock className="size-4 text-indigo-400" /> كلمة المرور
                            </label>
                            <input type="password" id='password' placeholder="••••••••" {...register("password")} className="form-input" />
                            {errors.password && <p className='text-red-400 text-xs mt-1'>{errors.password.message as string}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone" className="form-label flex items-center gap-2">
                                <Phone className="size-4 text-indigo-400" /> رقم الهاتف
                            </label>
                            <input type="number" id='phone' placeholder="0123..." {...register("phone")} className="form-input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            {errors.phone && <p className='text-red-400 text-xs mt-1'>{errors.phone.message as string}</p>}
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label htmlFor="role" className="form-label flex items-center gap-2">
                                <Shield className="size-4 text-indigo-400" /> الصلاحية
                            </label>
                            <select id="role" {...register("role")} className="form-input appearance-none cursor-pointer">
                                <option value="" className="bg-slate-800">اختر الرتبة...</option>
                                <option value="CUSTOMER" className="bg-slate-800">عميل (Customer)</option>
                                <option value="MANAGER" className="bg-slate-800">مدير (Manager)</option>
                                <option value="ADMIN" className="bg-slate-800">مسؤول (Admin)</option>
                            </select>
                            {errors.role && <p className='text-red-400 text-xs mt-1'>{errors.role.message as string}</p>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image" className="form-label flex items-center gap-2">
                                <ImageIcon className="size-4 text-indigo-400" /> صورة الحساب
                            </label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    className="opacity-0 absolute inset-0 cursor-pointer"
                                    onChange={(e) => setValue("image", e.target.files?.[0], { shouldValidate: true })}
                                />
                                <label htmlFor="image" className="form-input flex items-center justify-between cursor-pointer group-hover:border-indigo-500/50">
                                    <span className="text-slate-500 text-sm truncate">
                                        <img src={watch("image") 
                                            ? URL.createObjectURL(watch("image") as Blob) : ""} 
                                            className={`size-12 rounded-full bg-white object-cover mr-2 ${watch("image") ? "block" : "hidden"}`}
                                            alt="" />
                                        {watch("image") ? (watch("image") as any).name : "اختر صورة..."}
                                    </span>
                                    <span className="bg-indigo-600 text-[10px] px-2 py-1 rounded text-white uppercase">Upload</span>
                                </label>
                            </div>
                            {errors.image && <p className='text-red-400 text-xs mt-1'>{errors.image.message as string}</p>}
                        </div>

                    </div>

                    {/* Submit Button */}
                    <div className="mt-10">
                        <button 
                            type='submit' 
                            disabled={!isValid || isSubmitting}
                            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all duration-300
                            ${!isValid || isSubmitting
                                ? "bg-slate-700 cursor-not-allowed opacity-50"
                                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-[0.98]"
                            }`}
                        >
                            {isSubmitting ? (
                                <> <Loader2 className="animate-spin size-5" /> جاري الحفظ... </>
                            ) : (
                                "إنشاء الحساب الآن"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}