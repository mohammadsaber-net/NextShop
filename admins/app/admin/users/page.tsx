"use client"
import Loading from '@/components/loading/Loading';
import DeleteProduct from '@/components/products/DeleteProduct';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
export default function page() {
  const [data,setData]=useState<any>(null)
  const { data: session, status } = useSession();
  if (status === "loading") return <Loading />; 

  if (!session || session.user.role !== "MANAGER") {
    return <p>Access Denied</p>;
  }
  useEffect(()=>{
    axios.get("/api/users")
    .then((res:any)=>setData(res.data.data))
    .catch((err)=>toast.error((err as Error).message)||"Can't Get Users")
  },[])
  return (
    <div>
      <Link href={"/admin/users/newUser"} className='text-blue-600 bg-white px-2 py-1 border-blue-600 border rounded-md
      hover:bg-blue-600 mb-5 block w-fit capitalize transition hover:text-white'>
        add new user
      </Link>
      {data?<table>
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>role</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user:any)=>(
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role || "user"}</td>
              <td><DeleteProduct id={user._id} type="user" title={user.name}/></td>
            </tr>
          ))}
        </tbody>
      </table>:<Loading />}
    </div>
  )
}
