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
      console.log("❌ Invalid HMAC");
      return NextResponse.json(
        { message: "Invalid HMAC — unauthorized" },
        { status: 401 }
      );
    }

    // ✅ الدفع ناجح فعلًا (مش pending)
    if (order.success === true && order.pending === false) {
      console.log("✅ Payment succeeded:", order.id);
      const paymobOrderId = Number(order.order.id);
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

// import { NextResponse } from "next/server";
// import crypto from "crypto";
// import { Order } from "@/lib/model/order";
// export async function POST(request: Request) {
//   try {
//     const data = await request.json();
//     const receivedHmac = data.hmac;
//     const order = data.obj;
//     const concatString =
//       order.amount_cents +
//       order.created_at +
//       order.currency +
//       order.error_occured +
//       order.has_parent_transaction +
//       order.id +
//       order.integration_id +
//       order.is_3d_secure +
//       order.is_auth +
//       order.is_capture +
//       order.is_refunded +
//       order.is_standalone_payment +
//       order.is_voided +
//       order.order.id +
//       order.owner +
//       order.pending +
//       order.source_data.pan +
//       order.source_data.sub_type +
//       order.source_data.type +
//       order.success;
//     const calculatedHmac = crypto
//       .createHmac("sha512", process.env.PAYMOB_HMAC!)
//       .update(concatString)
//       .digest("hex");
//     if (receivedHmac !== calculatedHmac) {
//       return NextResponse.json(
//         { message: "Invalid HMAC — unauthorized" },
//         { status: 401 }
//       );
//     }
//     if (order.success === true) {
//       console.log("Payment succeeded:", order.id);
//       await Order.findOneAndUpdate(
//         { paymobId: order.order.id },
//         { payment: true }
//       );
//     } else {
//       console.log("Payment failed:", order.id);
      
//     }
//     return NextResponse.json({ status: "received" });
//   } catch (error) {
//     console.log("Webhook Error:", error);
//     return NextResponse.json({ error: "Webhook error" }, { status: 500 });
//   }
// }
