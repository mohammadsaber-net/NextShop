import { main_title } from "@/components/ccsStyles"
import { Order } from "@/lib/model/order"
import { mongooseConnection } from "@/lib/mongoose"

export default async function Orders() {
  await mongooseConnection()
  const orders=JSON.parse (JSON.stringify(await Order.find()))
  return (
    <div>
      <h2 className={main_title}>
        Orders
      </h2>
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
              <td className="text-start">
                {item.name}<br />
                {item.email}<br />
                {item.phone}<br />
                {item.address}<br />
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
  )
}
