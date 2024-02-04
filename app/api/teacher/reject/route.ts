import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { id } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const teacher = await db.teacher.update({
      where: { id },
      data: { verified: false },
    });

    return NextResponse.json({ message: "Teacher Rejected" });
  } catch (error) {
    console.log("[teacher]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
