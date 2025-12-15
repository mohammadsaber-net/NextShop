import { Order } from "@/lib/model/order";
import { mongooseConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { createHmac } from "crypto";

export async function POST(request: Request) {
  try {
    await mongooseConnection();

    const { searchParams } = new URL(request.url);
    const receivedHmac = searchParams.get("hmac"); // ✅ الصح

    const data = await request.json();
    const order = data.obj;

    console.log("Received HMAC:", receivedHmac);

    const concatString =
      String(order.amount_cents) +
      String(order.created_at) +
      String(order.currency) +
      String(order.error_occured) +
      String(order.has_parent_transaction) +
      String(order.id) +
      String(order.integration_id) +
      String(order.is_3d_secure) +
      String(order.is_auth) +
      String(order.is_capture) +
      String(order.is_refunded) +
      String(order.is_standalone_payment) +
      String(order.is_voided) +
      String(order.order.id) +
      String(order.owner) +
      String(order.pending) +
      String(order.source_data?.pan || "") +
      String(order.source_data?.sub_type || "") +
      String(order.source_data?.type || "") +
      String(order.success);

    const calculatedHmac = createHmac("sha512", process.env.PAYMOB_HMAC!)
      .update(concatString)
      .digest("hex");

      
      if (receivedHmac !== calculatedHmac) {
      console.log("Calculated HMAC:", calculatedHmac);
      console.log("❌ Invalid HMAC");
      console.log("calculatedHmac",calculatedHmac)
      return NextResponse.json({ message: "Invalid HMAC" }, { status: 401 });
    }

    console.log("✅ HMAC VALID");

    if (order.success === true) {
      const paymobOrderId = Number(order.order.id);

      const updatedOrder = await Order.findOneAndUpdate(
        { paymobId: paymobOrderId },
        { payment: true },
        { new: true }
      );

      console.log("✅ Order updated:", updatedOrder);
    }

    return NextResponse.json({ status: "received" });
  } catch (err) {
    console.log("Webhook error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
