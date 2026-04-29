"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { items } from "../constant/page";

const MainSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className=" w-64 bg-white border-r p-5">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-500 text-white rounded-full px-3 py-1 font-bold">
          →
        </div>
        <h1 className="text-lg font-semibold text-black">LinkSnap</h1>
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
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
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
    </aside>
  );
};

export default MainSidebar;
