"use client";

import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { items } from "../constant/constants";

const MainSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("userID");
      localStorage.removeItem("email");
      setIsOpen(false);
      router.push("/components/login");
    }
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b bg-white p-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-blue-500 px-3 py-1 font-bold text-white">
            →
          </div>
          <h1 className="text-lg font-semibold text-black">LinkSnap</h1>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Backdrop (mobile only, when drawer is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar / drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white p-5 transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-500 px-3 py-1 font-bold text-white">
              →
            </div>
            <h1 className="text-lg font-semibold text-black">LinkSnap</h1>
          </div>

          <button
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1 text-gray-700 hover:bg-gray-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.link || pathname.startsWith(item.link + "/");

            return (
              <Link
                key={item.id}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition
                ${
                  isActive
                    ? "bg-blue-100 font-semibold text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }
              `}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <button
          onClick={handleLogout}
          className="mt-auto flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default MainSidebar;
