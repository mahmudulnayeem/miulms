import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = async () => {
  const { userId } = auth();
  const isUserTeacher = await isTeacher(userId);
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full  flex-grow">
        <SidebarRoutes />
        {!isUserTeacher && (
          <div className="flex flex-col justify-end  flex-grow">
            <Link
              href="/request"
              className="text-center text-muted-foreground text-sm py-4 cursor-pointer hover:text-teal-600 hover:underline"
            >
              Want to join as teacher?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
