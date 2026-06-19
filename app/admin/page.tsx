import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "FirstLight OS | Admin",
  description: "Private FirstLight AI admin and Beacon delivery dashboard.",
};

const AUTH_COOKIE = "firstlight_admin";

async function login(formData: FormData) {
  "use server";

  const submittedPassword = String(formData.get("password") || "");
  const adminPassword = process.env.FIRSTLIGHT_ADMIN_PASSWORD || "beacon-os";

  if (submittedPassword !== adminPassword) {
    redirect("/admin?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, "true", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

async function logout() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  redirect("/admin");
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(AUTH_COOKIE)?.value === "true";
  const params = await searchParams;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#FBFAF7] px-6 py-16 text-[#18140D]">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="w-full max-w-xl rounded-[2rem] border border-[#EADFCA] bg-white p-8 shadow-[0_24px_80px_rgba(38,31,18,0.08)]">
            <div className="mb-8 flex items-center gap-3">
              <span className="relative flex h-8 w-8 items-center justify-center text-[#BA7517]">
                <span className="absolute h-px w-8 bg-current" />
                <span className="absolute h-8 w-px bg-current" />
                <span className="absolute h-5 w-5 rotate-45 border border-current" />
              </span>
              <div>
                <p className="font-semibold tracking-[0.18em]">FIRSTLIGHT OS</p>
                <p className="text-sm text-[#6B604D]">Private admin area</p>
              </div>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#BA7517]">
              Secure access
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Sign in to manage Beacon projects and costing.
            </h1>
            <p className="mt-5 leading-7 text-[#6B604D]">
              This area is for tracking client progress through the Beacon Framework and estimating project costs.
            </p>

            {params?.error ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                Incorrect password. Try again.
              </div>
            ) : null}

            <form action={login} className="mt-8 grid gap-4">
              <input
                name="password"
                type="password"
                required
                className="rounded-2xl border border-[#D8C99F] bg-[#FBFAF7] p-4 outline-none transition focus:border-[#D4AF37]"
                placeholder="Admin password"
              />
              <button className="rounded-2xl bg-[#BA7517] px-6 py-4 font-semibold text-white transition hover:bg-[#18140D]">
                Enter FirstLight OS
              </button>
            </form>

            <p className="mt-6 text-xs leading-5 text-[#6B604D]">
              Temporary MVP password fallback: beacon-os. Set FIRSTLIGHT_ADMIN_PASSWORD in Vercel for a private production password.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return <AdminDashboard logoutAction={logout} />;
}
