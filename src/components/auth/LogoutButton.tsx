"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("moharrek_session");
    sessionStorage.removeItem("moharrek_session");
    router.push("/login");
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="rounded-lg p-2 text-sidebar-text transition hover:bg-white/10 hover:text-white"
      title="خروج"
    >
      <LogOut className="h-4 w-4" />
    </button>
  );
}
