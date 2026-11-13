import { Suspense, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DmsShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <aside className="fixed inset-y-0 right-0 z-40 w-[272px] bg-sidebar" />
        }
      >
        <Sidebar />
      </Suspense>
      <div className="dms-main mr-[272px] min-h-screen">
        <Topbar title={title} subtitle={subtitle} />
        <main className="px-5 py-6 lg:px-8 lg:py-7">{children}</main>
      </div>
    </div>
  );
}
