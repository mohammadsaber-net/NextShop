import { Order } from "@/lib/model/order";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { amount,orderId, email,name, phone,address } = await request.json();
    const authRes = await axios.post(
      "https://accept.paymob.com/api/auth/tokens",
      { api_key: process.env.PAYMOB_API_KEY }
    );
    const authToken = authRes.data.token;
    const orderRes = await axios.post(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        auth_token: authToken,
        delivery_needed: "false",
        amount_cents: amount * 100,
        currency: "EGP",
        items: [],
      }
    );

    const paymobOrderId = orderRes.data.id;
    const localOrder = await Order.findById(orderId);
    if (!localOrder) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }
    await Order.findByIdAndUpdate(orderId, {
        paymobId:paymobOrderId
      });
    const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
        return NextResponse.json(
            { error: "Invalid amount" },
            { status: 400 }
        );
        }
    const paymentKeyRes = await axios.post(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        auth_token: authToken,
        amount_cents: numericAmount * 100,
        expiration: 3600,
        order_id: paymobOrderId,
        currency: "EGP", 
        billing_data: {
            apartment: "NA",
            email: email,
            floor: "NA",
            first_name: name,
            last_name: "Customer",
            street: address,
            building: "NA",
            phone_number: phone,
            shipping_method: "NA",
            postal_code: "NA",
            city: "NA",
            country: "Egypt",
            state: "NA"
        },
        integration_id: process.env.PAYMOB_INTEGRATION_ID,
        redirect_url: "https://next-shop-ns5b.vercel.app/paymob"
      }
    );

    return NextResponse.json({
      payment_token: paymentKeyRes.data.token,
      iframe_url: `https://accept.paymob.com/api/acceptance/iframes/${process.env.IFRAME_ID}?payment_token=${paymentKeyRes.data.token}`,
    });
  } catch (err: any) {
    console.log("PAYMOB ERROR:", err.response?.data);
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: 500 }
    );
  }
}
