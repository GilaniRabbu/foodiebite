"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const ClientHeader = () => {
  const pathname = usePathname();
  const hideHeader =
    pathname.startsWith("/user") || pathname.startsWith("/admin");

  if (hideHeader) return null;
  return <Header />;
};

export default ClientHeader;
