"use client";
import { usePathname } from "next/navigation";
import { SiteAmbience } from "@/components/site-ambience";
import { Analytics } from "@vercel/analytics/next";
export function SiteExtras() {
  const path = usePathname();
  if (
    path === "/survey" ||
    path.startsWith("/survey/") ||
    path.startsWith("/admin/survey")
  )
    return null;
  return (
    <>
      <SiteAmbience />
      {process.env.NODE_ENV === "production" && <Analytics />}
    </>
  );
}
