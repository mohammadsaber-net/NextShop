import DeleteProduct from '@/components/products/DeleteProduct';
import axios from 'axios'
import Link from 'next/link'
export default async function page() {
  const res = await fetch("/api/users", { cache: 'no-store' });
  const data = await res.json();
  return (
    <div>
      <Link href={"/admin/users/newUser"} className='text-blue-600 bg-white px-2 py-1 border-blue-600 border rounded-md
      hover:bg-blue-600 mb-5 block w-fit capitalize transition hover:text-white'>
        add new user
      </Link>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>role</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((user:any)=>(
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role || "user"}</td>
              <td><DeleteProduct id={user._id} type="user" title={user.name}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
