import { User } from "@/lib/model/user";
import { mongooseConnection } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await mongooseConnection();
    const session=await getServerSession(authOptions) as any
    console.log(session)
        if (!session) {
          return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
                console.log(session?.user?.role );
          return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
        }
    const {id}=await params
    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true});
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message });
  }

}