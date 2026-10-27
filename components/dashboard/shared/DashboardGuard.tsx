"use client";
import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { selectCurrentUser } from "@/redux/slice/authSlice";

type DashboardGuardProps = {
  /** Which dashboard shell is being protected. */
  area: "user" | "admin";
  children: ReactNode;
};

/**
 * Keeps visitors out of the dashboards:
 *
 *  - not logged in      -> redirected to /login
 *  - wrong role          -> redirected to their own dashboard
 *
 * The auth state comes from redux/slice/authSlice, which redux/store.ts
 * persists, and PersistGate blocks rendering until it is rehydrated - so the
 * check is accurate on first render. Nothing is rendered while redirecting,
 * so protected content never flashes on screen.
 */
export default function DashboardGuard({ area, children }: DashboardGuardProps) {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();

  const isLoggedIn = Boolean(user?._id);
  const isAdmin = user?.role === "ADMIN";
  const hasAccess = area === "admin" ? isAdmin : !isAdmin;

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
    if (!hasAccess) {
      router.replace(isAdmin ? "/admin/dashboard" : "/user/dashboard");
    }
  }, [isLoggedIn, hasAccess, isAdmin, router]);

  if (!isLoggedIn || !hasAccess) return null;

  return <>{children}</>;
}
