"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { isAdmin } from "@/lib/admin";
import { useEffect, useState } from "react";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const [isUserTeacher, setIsTeacher] = useState(false);
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isAdminPage = pathname?.startsWith("/admin");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  useEffect(() => {
    isTeacher(userId).then((res) => {
      setIsTeacher(res);
    });
  }, [userId]);
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage || isAdminPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isUserTeacher ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        {!isAdminPage && isAdmin(userId) && (
          <Link href="/admin">
            <Button size="sm" variant="ghost">
              Admin mode
            </Button>
          </Link>
        )}

        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
