import { NextResponse } from "next/server";
import crypto from "crypto";
import { Order } from "@/lib/model/order";
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const receivedHmac = data.hmac;
    const order = data.obj;
    const concatString =
      order.amount_cents +
      order.created_at +
      order.currency +
      order.error_occured +
      order.has_parent_transaction +
      order.id +
      order.integration_id +
      order.is_3d_secure +
      order.is_auth +
      order.is_capture +
      order.is_refunded +
      order.is_standalone_payment +
      order.is_voided +
      order.order.id +
      order.owner +
      order.pending +
      order.source_data.pan +
      order.source_data.sub_type +
      order.source_data.type +
      order.success;
    const calculatedHmac = crypto
      .createHmac("sha512", process.env.PAYMOB_HMAC!)
      .update(concatString)
      .digest("hex");
    if (receivedHmac !== calculatedHmac) {
      return NextResponse.json(
        { message: "Invalid HMAC — unauthorized" },
        { status: 401 }
      );
    }
    if (order.success === true) {
      console.log("Payment succeeded:", order.id);
      await Order.findOneAndUpdate(
        { paymobId: order.id },
        { payment: true }
      );
    } else {
      console.log("Payment failed:", order.id);
      
    }
    return NextResponse.json({ status: "received" });
  } catch (error) {
    console.log("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
