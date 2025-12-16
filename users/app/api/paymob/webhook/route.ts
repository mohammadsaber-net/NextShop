import { NextResponse } from "next/server";
import crypto from "crypto";
import { mongooseConnection } from "@/lib/mongoose";
import { Order } from "@/lib/model/order";

export async function POST(req: Request) {
  try {
    await mongooseConnection();

    const data = await req.json();

    console.log("PAYMOB CALLBACK:", data); // مهم جدًا أول مرة

    const receivedHmac = data.hmac;
    const transaction = data.obj;
    // 🔐 HMAC
    const concatString =
      transaction.amount_cents +
      transaction.created_at +
      transaction.currency +
      transaction.error_occured +
      transaction.has_parent_transaction +
      transaction.id +
      transaction.integration_id +
      transaction.is_3d_secure +
      transaction.is_auth +
      transaction.is_capture +
      transaction.is_refunded +
      transaction.is_standalone_payment +
      transaction.is_voided +
      transaction.order.id +
      transaction.owner +
      transaction.pending +
      transaction.source_data.pan +
      transaction.source_data.sub_type +
      transaction.source_data.type +
      transaction.success;

    const calculatedHmac = crypto
      .createHmac("sha512", process.env.PAYMOB_HMAC!)
      .update(concatString)
      .digest("hex");

    if (calculatedHmac !== receivedHmac) {
      console.error("❌ HMAC NOT MATCH");
      return NextResponse.json({ message: "Invalid HMAC" }, { status: 401 });
    }

    // 🧠 تحديث الأوردر
    const isPaid = transaction.success === true;

    await Order.findOneAndUpdate(
    { paymobId: transaction.order.id },
        {
            payment: isPaid,
        }
        );


    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
