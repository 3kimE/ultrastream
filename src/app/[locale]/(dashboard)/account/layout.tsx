import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profileData } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single();
  const profile = profileData as { first_name: string | null; last_name: string | null } | null;

  const name =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || user.email!;
  const initials =
    [profile?.first_name?.[0], profile?.last_name?.[0]].filter(Boolean).join("").toUpperCase() ||
    user.email![0].toUpperCase();

  return (
    <DashboardShell name={name} email={user.email!} initials={initials}>
      {children}
    </DashboardShell>
  );
}
