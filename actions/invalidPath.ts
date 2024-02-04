"use server";
import { revalidatePath } from "next/cache";

export const invalidPath = (path: string) => {
  revalidatePath(path);
};
