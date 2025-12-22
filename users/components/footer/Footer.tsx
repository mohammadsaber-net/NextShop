"use client"
import Link from "next/link"
import { FaTelegramPlane,  FaWhatsapp, FaGithub, FaEnvelope } from "react-icons/fa"
export default function Footer() {
  return (
    <footer className="bg-gray-900 pb-[22px] text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Electro<span className="text-blue-500">Shop</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Your trusted online store for high-quality electronics at the best prices.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link href="/AllProducts" className="hover:text-blue-400">All Products</Link></li>
            <li><Link href="/cart" className="hover:text-blue-400">Cart</Link></li>
            <li><Link href="/category" className="hover:text-blue-400">category</Link></li>
            <li><Link href="/account" className="hover:text-blue-400">My Account</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-blue-400">Contact Us</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-blue-400">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a 
            href="https://wa.me/+201023966702" 
                target="_blank" 
                rel="noopener noreferrer"
            className="transition hover:text-green-600">
              <FaWhatsapp size={28} />
            </a>
            <a 
            href="https://t.me/@moh123ph" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-sky-500 transition">
              <FaTelegramPlane size={28} />
            </a>
            <a 
            href="https://github.com/mohammadsaber-net" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition">
              <FaGithub size={28} />
            </a>
            <a href="mailto:m4567s019283@gmail.com" className="hover:text-red-600 transition">
              <FaEnvelope size={28} />
            </a>
          </div>
        </div>

      </div>
      <div className="border-t border-gray-800 text-center py-4 text-sm">
        © {new Date().getFullYear()} ElectroShop. All rights reserved.
      </div>
    </footer>
  )
}
