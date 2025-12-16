import { NextResponse } from "next/server";
import { mongooseConnection } from "@/lib/mongoose";
import { Order } from "@/lib/model/order";

export async function POST(req: Request) {
  try {
    await mongooseConnection();

    const data = await req.json();
    const transaction = data.obj;

    if (!transaction) {
      console.error("❌ Invalid payload, transaction missing");
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    // 🧠 تحديث الأوردر بناءً على حالة الدفع
    const isPaid = transaction.success === true;

    const updatedOrder = await Order.findOneAndUpdate(
      { paymobId: transaction.order.id },
      { payment: isPaid },
      { new: true } // optional: ترجع لك الأوردر بعد التحديث
    );

    if (!updatedOrder) {
      console.error("❌ Order not found for paymobId:", transaction.order.id);
    } else {
      console.log("✅ Order updated successfully:", updatedOrder._id);
    }

    // ✅ رجّع 200 دايمًا حتى لو الأوردر مش موجود
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
