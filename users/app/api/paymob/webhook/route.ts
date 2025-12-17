import { NextResponse, NextRequest } from "next/server";
import { mongooseConnection } from "@/lib/mongoose";
import { Order } from "@/lib/model/order";

export async function POST(req: NextRequest) {
  try {
    await mongooseConnection();
    const secret = req.nextUrl.searchParams.get("secret");
    console.log("secret",secret)
    console.log("process.env.WEBHOOK_SECRET",process.env.WEBHOOK_SECRET)
    if (secret !== process.env.WEBHOOK_SECRET) {
      console.error("❌ Forbidden: Invalid secret");
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();
    const transaction = data.obj;
    if (!transaction) {
      console.error("❌ Invalid payload, transaction missing");
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }
    const isPaid = transaction.success === true;
    const updatedOrder = await Order.findOneAndUpdate(
       { paymobId:Number(transaction.order.id) },
       { payment: isPaid },
      { new: true }
    );
    if (!updatedOrder) {
      console.warn("⚠ Order not found or already updated:", transaction.order.id);
      console.log('they are equals===>',updatedOrder.paymobId===Number(transaction.order.id))
    } else {
      console.log("✅ Order updated successfully:", updatedOrder._id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}