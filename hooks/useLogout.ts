"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import Cookies from "js-cookie";
import { baseApi } from "@/redux/api/baseApi";
import { removeUser } from "@/redux/slice/authSlice";

/**
 * Ends the session, server-side and client-side.
 *
 * 1. POSTs /auth/logout (with credentials) so the server clears the httpOnly
 *    refreshToken cookie it set on login.
 * 2. Drops the local access token and persisted user, wipes the RTK Query
 *    cache and sends the visitor to /login.
 *
 * Shared by the public header and the dashboard sidebars / top navbars so
 * every logout entry point behaves identically.
 */
export default function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  return async () => {
    // Best-effort server call: a network failure must not trap the user in
    // a half-logged-in state, so we continue either way.
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { accept: "application/json" },
      });
    } catch {
      // ignore - the local session is cleared regardless
    }

    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }

    destroyCookie(null, "accessToken");
    destroyCookie(null, "refreshToken");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    // Reset the RTK Query cache so nothing from this session leaks to the next.
    dispatch(baseApi.util.resetApiState());
    dispatch(removeUser());

    router.push("/login");
  };
}
