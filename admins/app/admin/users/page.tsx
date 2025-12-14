import DeleteProduct from '@/components/products/DeleteProduct';
import { User } from '@/lib/model/user';
import { mongooseConnection } from '@/lib/mongoose';
import Link from 'next/link'
export default async function page() {
  await mongooseConnection();
  const data=JSON.parse(JSON.stringify(await User.find()))
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
          {data.map((user:any)=>(
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
