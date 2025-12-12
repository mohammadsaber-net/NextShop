import axios from "axios";
export const api =axios.create({
    baseURL:process.env.NEXTAUTH_URL || "http://localhost:3000"
})
