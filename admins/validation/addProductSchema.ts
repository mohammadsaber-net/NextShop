import { string, z } from "zod";

export const schema = z.object({
  title: z.string().nonempty("title required"),
  description: z.string().nonempty("description required"),
  price: z.string().nonempty("price required"),
  quantity: z.string().nonempty("quantity required"),
  category: z.string().nonempty("category required"),
  parent: z.string().optional(),
  properties: z.array(
    z.object({
      name: z.string().nonempty("property name required"),
      values:z.array(
        z.string()
      ).nonempty("property value required")
    })
  ).optional()
});
export const categorySchema = z.object({
  name:z.string().nonempty("category required"),
  parent:z.string().optional(),
  properties: z.array(
    z.object({
      name: z.string().nonempty("property name required"),
      values: z.string().nonempty("values is required")
    })
  ).optional()
});
export const userSchema = z.object({
  name:z.string().nonempty("name required"),
  email:z.email("invalid email"),
  image:z.instanceof(File).optional(),
  phone:z.string().nonempty("phone required"),
  role:z.string().optional(),
  password:z.string().min(6,"password must be at least 6 characters"),
});