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
       { paymobId: transaction.order.id },
       { payment: isPaid },
      { new: true }
    );
    if (!updatedOrder) {
      console.warn("⚠ Order not found or already updated:", transaction.order.id);
    } else {
      console.log("✅ Order updated successfully:", updatedOrder._id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import crypto from "crypto";
// import { mongooseConnection } from "@/lib/mongoose";
// import { Order } from "@/lib/model/order";

// export async function POST(req: Request) {
//   try {
//     await mongooseConnection();

//     const data = await req.json();
//     const transaction = data.obj;
//     const receivedHmac = data.hmac;

//     if (!transaction) {
//       console.error("❌ Invalid payload, transaction missing");
//       return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
//     }

//     // 🔐 تحقق HMAC إذا موجود
//     if (!receivedHmac) {
//       console.error("❌ HMAC missing");
//       return NextResponse.json({ message: "Missing HMAC" }, { status: 401 });
//     }

//     const concatString =
//       transaction.amount_cents +
//       transaction.created_at +
//       transaction.currency +
//       transaction.error_occured +
//       transaction.has_parent_transaction +
//       transaction.id +
//       transaction.integration_id +
//       transaction.is_3d_secure +
//       transaction.is_auth +
//       transaction.is_capture +
//       transaction.is_refunded +
//       transaction.is_standalone_payment +
//       transaction.is_voided +
//       transaction.order.id +
//       transaction.owner +
//       transaction.pending +
//       transaction.source_data.pan +
//       transaction.source_data.sub_type +
//       transaction.source_data.type +
//       transaction.success;

//     const calculatedHmac = crypto
//       .createHmac("sha512", process.env.PAYMOB_HMAC!)
//       .update(concatString)
//       .digest("hex");
//       console.error("calculatedHmac",calculatedHmac);
//       console.error("receivedHmac",receivedHmac);
//     if (calculatedHmac !== receivedHmac) {
//       console.error("❌ HMAC NOT MATCH");
//       return NextResponse.json({ message: "Invalid HMAC" }, { status: 401 });
//     }

//     // 🧠 تحديث الأوردر
//     const isPaid = transaction.success === true;

//     const updatedOrder = await Order.findOneAndUpdate(
//       { paymobId: transaction.order.id, payment: { $ne: true } }, // يمنع duplicate update
//       { payment: isPaid, paidAt: new Date() },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       console.warn("⚠ Order not found or already updated:", transaction.order.id);
//     } else {
//       console.log("✅ Order updated successfully:", updatedOrder._id);
//     }

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Webhook Error:", err);
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }

// // import { NextResponse } from "next/server";
// // import { mongooseConnection } from "@/lib/mongoose";
// // import { Order } from "@/lib/model/order";
// // export async function POST(req: Request) {
// //   try {
// //     await mongooseConnection();

// //     const data = await req.json();
// //     const transaction = data.obj;

// //     if (!transaction) {
// //       console.error("❌ Invalid payload, transaction missing");
// //       return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
// //     }

// //     // 🧠 تحديث الأوردر بناءً على حالة الدفع
// //     const isPaid = transaction.success === true;

// //     const updatedOrder = await Order.findOneAndUpdate(
// //       { paymobId: transaction.order.id },
// //       { payment: isPaid },
// //       { new: true } // optional: ترجع لك الأوردر بعد التحديث
// //     );

// //     if (!updatedOrder) {
// //       console.error("❌ Order not found for paymobId:", transaction.order.id);
// //     } else {
// //       console.log("✅ Order updated successfully:", updatedOrder._id);
// //     }

// //     // ✅ رجّع 200 دايمًا حتى لو الأوردر مش موجود
// //     return NextResponse.json({ success: true });
// //   } catch (err) {
// //     console.error("Webhook Error:", err);
// //     return NextResponse.json({ success: false }, { status: 500 });
// //   }
// // }
