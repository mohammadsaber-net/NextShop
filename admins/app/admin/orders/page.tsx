
import { Order } from "@/lib/model/order"
import { mongooseConnection } from "@/lib/mongoose"

export default async function Orders() {
  await mongooseConnection()
  const orders=JSON.parse (JSON.stringify(await Order.find().populate("user",("name email phone address"))))
  console.log(orders)
  return (
    <div>
      <h2 className="text-xl md:text-3xl mb-2 font-semibold border-b border-gray-300">
        Orders
      </h2>
      <div className="overflow-x-auto md:max-w-6xl max-w-[600px]">
      <table>
        <thead>
          <tr>
            <th>
              Date
            </th>
            <th>
              Customer
            </th>
            <th>
              Products
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item:any)=>(
            <tr key={item._id}>
              <td>
                {item.createdAt&&new Date(item.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </td>
              <td >
                {item.user?<div>
                  {item?.user?.name}<br />
                  {item?.user?.email}<br />
                  {item?.user?.phone}<br />
                  {item?.user?.address}<br />
                </div>
                :"user deleted"}
              </td>
              <td>
                    <table>
                      <thead>
                        <tr  className="border-none">
                          <th>title</th>
                          <th>amount</th>
                          <th>price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.order.map((order:any, ind:any) => (
                          <tr  className="border-none" key={ind}>
                            <td>{order.title}</td>
                            <td>{order.amount}</td>
                            <td>{order.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}
