"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (!token && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, [pathname, router]);


  const isActive = (path: string) => {
    return pathname === path;
  };

  if (!isAuthenticated && pathname === "/admin/login") {
    return <div className="min-h-screen bg-primary">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Top Navigation */}
      <nav className="bg-primary shadow-sm border-b px-4 py-2 flex justify-between items-center fixed w-full top-0 z-10">
        <div className="flex items-center">
          <Image
            src="/bird-logo.svg"
            alt="The City Nook Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <span className="font-semibold text-lg">Admin Panel</span>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("authToken");
            window.location.href = "/admin/login";
          }}
          className="text-gray-600 hover:text-gray-900"
        >
          Logout
        </button>
      </nav>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className="w-64 bg-primary shadow-sm fixed h-full">
          <nav className="mt-4">
            <Link
              href="/admin/dashboard"
              className={`flex items-center px-6 py-3 ${isActive("/admin/dashboard") ? "bg-secondary border-r-4 border-yellow-500 text-yellow-700" : "text-primary hover:bg-secondary"}`}
            >
              <svg
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </Link>
            <Link
              href="/admin/enquiries"
              className={`flex items-center px-6 py-3 ${isActive("/admin/enquiries") ? "bg-secondary border-r-4 border-yellow-500 text-yellow-700" : "text-primary hover:bg-secondary"}`}
            >
              <svg
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Enquiries
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}