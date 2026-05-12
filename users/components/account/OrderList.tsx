"use client"
import Link from 'next/link'
import { CheckCircle, XCircle, CreditCard, Package } from 'lucide-react'

export default function OrdersList({ order, user, handlePay, loading2 }: any) {
  return (
    <div className="max-h-[600px] overflow-y-auto px-2 pb-6 custom-scrollbar">
      {order?.length > 0 ? (
        <div className="space-y-6">
          {order.map((item: any) => {
            const totalOrderAmount = item.order.reduce(
              (acc: number, prod: any) => acc + prod.price * prod.amount, 0
            );

            return (
              <div key={item._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* رأس البطاقة - Header */}
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Order Date</p>
                      <p className="text-sm font-bold text-slate-800">
                        {item.createdAt && new Date(item.createdAt).toDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="text-right">
                      <p className="text-xs text-slate-500 font-medium">Status</p>
                      <span className={`flex items-center gap-1 text-sm font-bold ${item.payment ? 'text-green-600' : 'text-amber-600'}`}>
                        {item.payment ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {item.payment ? "Paid" : "Pending"}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 font-medium">Total Amount</p>
                      <p className="text-sm font-black text-indigo-600">{totalOrderAmount} EGP</p>
                    </div>
                  </div>
                </div>

                {/* جسم البطاقة - جدول المنتجات */}
                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-slate-400 text-[11px] uppercase tracking-wider border-b">
                        <th className="pb-2 font-semibold">Product</th>
                        <th className="pb-2 font-semibold text-center">Qty</th>
                        <th className="pb-2 font-semibold text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {item.order.map((prod: any) => (
                        <tr key={prod.title} className="text-sm group">
                          <td className="py-3 font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                            {prod.title}
                          </td>
                          <td className="py-3 text-center text-slate-500">
                            x{prod.amount}
                          </td>
                          <td className="py-3 text-right font-semibold text-slate-800">
                            {prod.price * prod.amount} EGP
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* تذييل البطاقة - زر الدفع */}
                {!item.payment && (
                  <div className="bg-indigo-50/50 p-3 flex justify-end items-center">
                    <p className="text-xs text-indigo-700 mr-4 font-medium italic">Complete your purchase to receive your order</p>
                    <button 
                      onClick={() => handlePay(item._id, totalOrderAmount, user.email, user.name, user.phone, user.address, item._id)}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-indigo-200"
                    >
                      {loading2 === item._id ? "Processing..." : (
                        <>
                          <CreditCard size={16} />
                          Pay Now
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        order?.length===0 &&user && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
               <Package className="text-slate-300" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No orders yet</h3>
            <p className="text-slate-500 mb-6">Looks like you hasn't made your choice yet.</p>
            <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all">
              Start Shopping
            </Link>
          </div>
        )
      )}
    </div>
  )
}