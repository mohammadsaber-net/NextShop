import {z} from "zod";
export const UserInfoSchema = z.object({
  name: z.string().optional(),
  email: z.email("Invalid email address"),
  address: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  image: z.any().optional()
});