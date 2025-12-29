import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "@/lib/model/user";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";
import { mongooseConnection } from "@/lib/mongoose";
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
}
export const authOptions: AuthOptions ={
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
            return null;
          };
          await mongooseConnection()
          const user = await User.findOne({ email: credentials.email });
          if (!user || !user.password) {
          return null
        };
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
        if(user.role!=="MANAGER"){
          return null
        }
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image || null,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt",maxAge:60 * 60 },
  jwt:{
    maxAge:60 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
    if (user) {
      token.role = (user as any).role;
    }
      return token;
    },
    async session({ session, token }) {
      if (token) {
      session.user.id = token.sub as string;
      session.user.role = token.role as string;
    }
      return session;
    },
  },
};
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
