import type { Viewport } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PricingApp from "./PricingApp";

export const metadata = {
  title: "Pricing | FirstLight OS",
  description: "Private mobile pricing calculator: cost floor, value price, retainer and £200k target check.",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: "FL Pricing", statusBarStyle: "default" as const },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FBFAF7",
};

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("firstlight_admin")?.value !== "true") {
    redirect("/admin");
  }

  return <PricingApp />;
}
