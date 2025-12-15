import { NextResponse } from "next/server";
import crypto from "crypto";
import { Order } from "@/lib/model/order";
import { mongooseConnection } from "@/lib/mongoose";

export async function POST(request: Request) {
  try {
    await mongooseConnection()
    const data = await request.json();
    const receivedHmac = data.hmac;
    const order = data.obj;

    // ✅ HMAC concat (بالترتيب الرسمي + safe casting)
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

    const calculatedHmac = crypto
      .createHmac("sha512", process.env.PAYMOB_HMAC!)
      .update(concatString)
      .digest("hex");

    // ❌ HMAC مش مطابق
    if (receivedHmac !== calculatedHmac) {
      console.log("Received HMAC:", receivedHmac);
      console.log("Calculated HMAC:", calculatedHmac);
      console.log("Concat string:", concatString);

      console.log("❌ Invalid HMAC");
      return NextResponse.json(
        { message: "Invalid HMAC — unauthorized" },
        { status: 401 }
      );
    }
    if (order.success === true) {
      console.log("✅ Payment succeeded:", order.id);
      const paymobOrderId = Number(order.order.id);
      const myOrder=await Order.findOne({paymobId: paymobOrderId})
      console.log(myOrder)
      await Order.findOneAndUpdate(
        { paymobId: paymobOrderId},
        {
          payment: true,
        }
      );
    } else {
      console.log("❌ Payment failed or pending:", order.id);
    }

    return NextResponse.json({ status: "received" });
  } catch (error) {
    console.log("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}