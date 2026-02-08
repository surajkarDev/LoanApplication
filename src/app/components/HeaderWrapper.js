"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Hide header on homepage ('/')
  if (pathname === "/") {
    return null;
  }

  return <Header />;
}
