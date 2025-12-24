# ElectroShop – User Store

ElectroShop User Store is the customer-facing application of the ElectroShop e-commerce platform.
It allows users to browse electronics products, manage their cart, complete purchases securely and manage ther account.

## 🔗 Live Demo
https://next-shop-ns5b.vercel.app/

---

## 🚀 Features
- User authentication with **NextAuth**
- Browse electronics products
- Product details & image gallery
- Shopping cart with Redux Toolkit
- Persistent cart using Redux Persist
- Secure checkout with **Paymob**
- Image handling with **Cloudinary**
- Smooth animations using **Framer Motion**
- Form validation with **React Hook Form** and **Zod**

---

## 🛠 Tech Stack
- **Next.js**
- **React**
- **TypeScript**
- **MongoDB & Mongoose**
- **Redux Toolkit**
- **NextAuth**
- **Tailwind CSS**
- **Paymob Payment Gateway**

---

## 📦 Installation

Clone the repository and navigate to the user app:
cd user
npm install
Run the development server:

bash
npm run dev
The app will run on:
http://localhost:3000

🔑 Environment Variables
Create a .env file and add:

env
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=

COULD_API_KEY=
COULD_SECRET_KEY=
COULD_NAME=

PAYMOB_API_KEY=
PAYMOB_INTEGRATION_ID=
WEBHOOK_SECRET=
IFRAME_ID=
All environment variables must be set correctly for authentication and payments to work.

📁 Scripts
npm run dev – Run development server

npm run build – Build for production

npm run start – Start production server

npm run lint – Run ESLint

📌 Notes
This is the customer-facing application.

Payment integration is handled using Paymob.

Designed as a real-world scalable e-commerce frontend.

👨‍💻 Author
Mohammad Saber
