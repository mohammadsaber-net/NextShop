import Link from 'next/link'
import { Product } from "@/lib/model/products";
import { mongooseConnection } from "@/lib/mongoose";
import DeleteProduct from '../../../components/products/DeleteProduct'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
export default async function Products() {
  const session = await getServerSession(authOptions);
  console.log("session in products page",session);
  if (!session) {
    return <div>Unauthorized</div>;
  }
  await mongooseConnection();
  const data = await Product.find();
  return (
    <div>
      <Link href={"/admin/products/newProduct"} className='text-blue-600 bg-white px-2 py-1 border-blue-600 border rounded-md
      hover:bg-blue-600 mb-5 block w-fit capitalize transition hover:text-white'>
        add new product
      </Link>
      <table className=''>
        <thead>
          <tr className='capitalize font-bold p-1'>
            <th>
              title
            </th>
            <th>
              price
            </th>
            <th>
              category
            </th>
            <th>
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item:any)=>{
           return(
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td className='flex flex-col gap-1'><Link href={`/admin/products/${item._id}`}
              className='p-1 cursor-pointer rounded-md bg-blue-600 
              text-white'>Update</Link>
              <DeleteProduct id={item._id.toString()} title={item.title}/>
              </td>
            </tr>
           ) 
          })}
        </tbody>
      </table>
    </div>
  )
}
