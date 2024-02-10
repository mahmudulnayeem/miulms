import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const {
      courseName,
      teacherName: name,
      educationalQualification,
      experience,
      fieldOfExpertise,
      cirtification,
    } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (await isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const teacher = await db.teacher.create({
      data: {
        teacherId: userId,
        courseName,
        name,
        educationalQualification,
        experience: experience || undefined,
        fieldOfExpertise,
        cirtification: cirtification || undefined,
      },
    });

    return NextResponse.json(teacher);
  } catch (error) {
    console.log("[teacher]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
