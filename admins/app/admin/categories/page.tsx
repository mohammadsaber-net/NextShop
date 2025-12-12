"use client"

import { categorySchema } from "@/validation/addProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { deleteCategory, getCate } from "./controllar";
import axios from "axios";
import toast from "react-hot-toast";
import { main_title } from "@/components/ccsStyles";

export default function Page() {
  const [showUpdate, setShowUpdate] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    getCate().then(data => setCategories(data));
  }, []);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
    control
  } = useForm({
    resolver: zodResolver(categorySchema),
    mode: "all",
    defaultValues: { name: "", parent: "", properties: [] }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties"
  });
  const clearProperties = () => {
    fields.forEach((_, i) => remove(i));
  };
  useEffect(() => {
    if (showUpdate) {
      reset({
        name: showUpdate.name,
        parent: showUpdate.parent?._id || "",
        properties: showUpdate.properties.map((item: any) => ({
          name: item.name,
          values: item.values.join(" ")
        }))
      });
    }
  }, [showUpdate, reset]);
  const handleProperty = () => append({ name: "", values: "" });
  const onSubmit = async (data: any) => {
    const parentCategories = data.parent || undefined;
    const dataToBeSent = {
      name: data.name,
      properties: data.properties,
      parentCategories
    };
    try {
      if (showUpdate) {
        const { data: res } = await axios.patch(`/api/category/${showUpdate._id}`, dataToBeSent);
        if (res.success) {
          toast.success("Category updated successfully");
          getCate().then(d => setCategories(d));
          reset({ name: "", parent: "", properties: [] });
          clearProperties();
          return setShowUpdate(null);
        } else {
          toast.error(res.message || "Failed to update category");
        }
      } else {
        const { data: res } = await axios.post("/api/category", dataToBeSent);
        if (res.success) {
          toast.success("Category added successfully");
          getCate().then(d => setCategories(d));
          reset({ name: "", parent: "", properties: [] });
          return clearProperties();
        } else {
          toast.error(res.message || "Failed to add category");
        }
      }
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong");
    }
  };

  const updateData = (item: any) => setShowUpdate(item);
  return (
    <div>
      <h2 className={main_title}>
        Categories
      </h2>
      <div className="text-blue-600 dark:text-white capitalize mb-3">
        {showUpdate ? `Update category: ${showUpdate.name}` : "Add new category"}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-1 mb-2">
          <div className="flex-1">
            <input
              {...register("name")}
              type="text"
              placeholder="Category name"
              className="w-full p-2 rounded-lg border border-gray-200 bg-gray-100 dark:bg-gray-700 focus:border-gray-400 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message?.toString()}</p>
            )}
          </div>
          <select
            {...register("parent")}
            className="p-2 h-10 rounded-lg cursor-pointer border border-gray-200 bg-gray-100 focus:border-gray-400 outline-none"
          >
            <option value="">Uncategorized</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <button
            type="button"
            onClick={handleProperty}
            className="bg-zinc-500 dark:bg-zinc-700 cursor-pointer hover:bg-zinc-600 text-white px-5 py-1 rounded-lg mb-1 transition"
          >
            Add New Property
          </button>

          {fields.length > 0 &&
            fields.map((item, index) => (
              <div key={index} className="flex gap-1 mb-1">
                <div>
                  <input
                  {...register(`properties.${index}.name`)}
                  placeholder="Property name (like: color)"
                  className="flex-1 p-1 w-full rounded border border-gray-200 bg-gray-100 outline-none"
                />
                </div>
                <div>

                <input
                  {...register(`properties.${index}.values`)}
                  placeholder="Property value (like: red)"
                  className="flex-1 p-1 w-full rounded border border-gray-200 bg-gray-100 outline-none"
                  />
                  </div>
                <button
                  type="button"
                  onClick={() => {
                    remove(index)
                  }}
                  className="bg-red-600 cursor-pointer text-white px-3 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!isValid}
            className={`px-5 py-1 h-10 cursor-pointer rounded-lg text-white ${
              isValid ? "bg-blue-800 hover:bg-blue-900" : "bg-gray-700 cursor-not-allowed"
            }`}
          >
            Save
          </button>
          {showUpdate && (
            <button
              type="button"
              onClick={() => {
                setShowUpdate(null);
                clearProperties();
                reset({ name: "", parent: "", properties: [] });}}
              className="px-5 py-1 h-10 cursor-pointer rounded-lg bg-gray-400 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {!showUpdate && (
        <div className="mt-5">
          <h3 className="text-base sm:text-xl lg:text-2xl font-bold bg-blue-300 rounded-md my-2 p-2">
            Categories List
          </h3>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-1">Category</th>
                <th className="border p-1">Parent</th>
                <th className="border p-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length ? (
                categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                    <td className="border p-1">{cat.name}</td>
                    <td className="border p-1">{cat.parent?.name || "-"}</td>
                    <td className="flex gap-1 border p-1">
                      <button
                        onClick={() => updateData(cat)}
                        className="flex-1 cursor-pointer bg-blue-600 text-white rounded px-2 py-1"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteCategory(cat._id, setCategories)}
                        className="flex-1 cursor-pointer bg-red-600 text-white rounded px-2 py-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    No categories
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
