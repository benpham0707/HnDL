'use client';
import { Navbar } from "@/components/nav/app/app-navbar";
import { Sidebar } from "@/components/nav/app/app-sidebar";
import { ReactNode } from "react";
import { Footer } from "@/components/nav/app/app-footer";

export default function SplashPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
      <div className="min-h-screen bg-background flex flex-col w-full">
        <Navbar path={location.pathname} />
        <div className="flex-1 flex w-full">
          <Sidebar />
          <main className="flex-1 p-4 ml-12 w-full">
            {children}
          </main>
        </div>
        <Footer />
      </div>
  );
}
