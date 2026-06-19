import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GuidedCosting from "./GuidedCosting";

export const metadata = {
  title: "Guided Costing | FirstLight OS",
  description: "Private guided scoping and costing tool for FirstLight AI.",
};

export default async function GuidedCostingPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("firstlight_admin")?.value === "true";

  if (!isAuthenticated) {
    redirect("/admin");
  }

  return <GuidedCosting />;
}
