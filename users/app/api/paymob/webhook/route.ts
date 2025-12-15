// /app/api/paymob/webhook/route.ts
// (المسار يجب أن يكون هو نفسه الذي قمت بتعيينه في إعدادات Paymob Webhook)

import { Order } from "@/lib/model/order";
import { mongooseConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { createHmac } from "crypto";

export async function POST(request: Request) {
    try {
        await mongooseConnection();

        const { searchParams } = new URL(request.url);
        const receivedHmac = searchParams.get("hmac"); // ✅ HMAC الذي أرسلته Paymob

        // **1. قراءة بيانات المعاملة من Query Parameters**
        // في الـ Webhook، جميع الحقول تأتي مباشرة في Query Parameters
        const getParam = (key: string) => searchParams.get(key) || "";

        const order: any = {
            amount_cents: getParam("amount_cents"),
            created_at: getParam("created_at"),
            currency: getParam("currency"),
            error_occured: getParam("error_occured"),
            has_parent_transaction: getParam("has_parent_transaction"),
            id: getParam("id"), // Transaction ID
            integration_id: getParam("integration_id"),
            is_3d_secure: getParam("is_3d_secure"),
            is_auth: getParam("is_auth"),
            is_capture: getParam("is_capture"),
            is_refund: getParam("is_refunded"), // تصحيح الاسم ليتوافق مع Paymob
            is_standalone_payment: getParam("is_standalone_payment"),
            is_void: getParam("is_voided"), // تصحيح الاسم ليتوافق مع Paymob
            owner: getParam("owner"),
            pending: getParam("pending"),
            success: getParam("success") === "true", // تحويلها لقيمة boolean
            order: { id: getParam("order") }, // Paymob Order ID (تم محاكاة بنية obj.order.id)
            // حقول source_data تأتي مسطحة (Flat) في الـ Query Params
            source_data: {
                pan: getParam("source_data_pan"),
                type: getParam("source_data_type"),
                sub_type: getParam("source_data_sub_type"),
            }
        };

        console.log("Received HMAC:", receivedHmac);

        // **2. حساب HMAC باستخدام الحقول المجمعة**
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
            String(order.is_refund) +
            String(order.is_standalone_payment) +
            String(order.is_void) +
            String(order.order.id) +
            String(order.owner) +
            String(order.pending) +
            String(order.source_data?.pan || "") +
            String(order.source_data?.type || "") +
            String(order.source_data?.sub_type || "") +
            String(order.success);


        const calculatedHmac = createHmac("sha512", process.env.PAYMOB_HMAC_SECRET!) // تأكد من استخدام المتغير الصحيح
            .update(concatString)
            .digest("hex");

        // **3. التحقق من التوقيع**
        if (receivedHmac !== calculatedHmac) {
            console.log("Calculated HMAC:", calculatedHmac);
            console.log("❌ Invalid HMAC");
            console.log("calculatedHmac", calculatedHmac);
            // الرد بـ 200 لتجنب إعادة الإرسال المتكرر
            return NextResponse.json({ message: "Invalid HMAC" }, { status: 200 });
        }

        console.log("✅ HMAC VALID");

        // **4. تحديث حالة الطلب**
        if (order.success === true) {
            // Paymob Order ID هو القيمة العددية
            const paymobOrderId = Number(order.order.id);

            const updatedOrder = await Order.findOneAndUpdate(
                { paymobId: paymobOrderId },
                { payment: true}, // أضفت حقل حالة لتكون أكثر وضوحاً
                { new: true }
            );

            console.log("✅ Order updated:", updatedOrder);
        } else {
             console.log("⚠️ Payment was not successful. Status:", order.pending ? "Pending" : "Failed");
        }

        // الرد بـ 200 OK لتأكيد استلام الـ Webhook
        return NextResponse.json({ status: "received" }, { status: 200 });
    } catch (err: any) {
        console.log("Webhook error:", err.message);
        // الرد بـ 200 OK لتجنب إعادة الإرسال المتكرر حتى في حالة الخطأ
        return NextResponse.json({ error: "Webhook error" }, { status: 200 });
    }
}