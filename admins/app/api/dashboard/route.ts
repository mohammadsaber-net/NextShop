import { NextResponse } from "next/server"
import { mongooseConnection } from "@/lib/mongoose"
import { Order } from "@/lib/model/order"
import { User } from "@/lib/model/user"
import { Product } from "@/lib/model/products"

export async function GET() {
  await mongooseConnection()

  const totalOrders = await Order.countDocuments()
  const paidOrders = await Order.countDocuments({ payment: true })


  const revenue = await Order.aggregate([
  { $match: { payment: true } },
  { $unwind: "$order" },
  {
    $group: {
      _id: null,
      total: {
        $sum: {
          $multiply: [
            { $toDouble: "$order.price" },
            "$order.amount"
          ]
        }
      }
    }
  }
])


  const todayRevenue = await Order.aggregate([
  {
    $match: {
      payment: true,
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    }
  },
  { $unwind: "$order" },
  {
    $group: {
      _id: null,
      total: {
        $sum: {
          $multiply: [
            { $toDouble: "$order.price" },
            "$order.amount"
          ]
        }
      }
    }
  }
])


  return NextResponse.json(
    {success:true,data:{
    totalRevenue: revenue[0]?.total || 0,
    todayRevenue: todayRevenue[0]?.total || 0,
    totalOrders,
    paidOrders,
    totalUsers: await User.countDocuments(),
    totalProducts: await Product.countDocuments()
  }})
}
