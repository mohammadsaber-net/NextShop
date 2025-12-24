ElectroShop – Admin Dashboard

ElectroShop is an admin dashboard for managing an electronics e-commerce store.
It allows managers and admins to manage products, categories, orders, and users (users managing are specified only for managers) with secure authentication.

🔗 Live Demo

Admin Panel:
https://next-shop-xamf.vercel.app/admin

🚀 Features

Admin authentication using NextAuth

Product management (Create, Update, Delete)

Image upload with Cloudinary

Order management
 
Stock management

Daily and total Revenue management

User-friendly dashboard UI

Secure password hashing with bcrypt

Form validation using React Hook Form and Zod

🛠 Tech Stack

Next.js

React

TypeScript

MongoDB & Mongoose

NextAuth

Tailwind CSS

Cloudinary

Axios

📦 Installation

Clone the repository:

git clone https://github.com/mohammadsaber-net/NextShop.git
cd electroshop


Install dependencies:

npm install


Run the development server:

npm run dev


The app will run on:
http://localhost:3000

🔑 Environment Variables

Create a .env file in the root directory and add:

MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=

COULD_API_KEY=
COULD_SECRET_KEY=
COULD_NAME=


Make sure all environment variables are correctly set before running the project.

📁 Scripts

npm run dev – Run development server

npm run build – Build for production

npm run start – Start production server

npm run lint – Run ESLint

📌 Notes

This project represents the admin side only of the ElectroShop e-commerce system.

Designed for scalability and real-world usage.

Ideal for learning or portfolio projects.

👨‍💻 Author

Mohammad Saber