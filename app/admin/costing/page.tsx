import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GuidedCosting from "./GuidedCosting";

export const metadata = {
  title: "Discovery Console | FirstLight OS",
  description: "Private live discovery, scoping and costing console for FirstLight AI.",
};

export const dynamic = "force-dynamic";

export default async function GuidedCostingPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("firstlight_admin")?.value === "true";

  if (!isAuthenticated) {
    redirect("/admin");
  }

  return <GuidedCosting />;
}
