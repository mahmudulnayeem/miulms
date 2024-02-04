"use server";

import { db } from "./db";

export const isTeacher = async (userId?: string | null) => {
  const teacher = await db.teacher.findFirst({
    where: {
      teacherId: userId!,
    },
  });

  return !!teacher;
};
