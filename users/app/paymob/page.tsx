import Link from "next/link";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your order. Your payment has been successfully processed.
        </p>
        <p className="text-gray-600 mb-4">
          You can check your order details in your account or contact support if needed.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
