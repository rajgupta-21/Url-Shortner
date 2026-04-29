"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { navItems } from "../constant/page";
import Button from "./button";
type NavbarProps = {
  className?: string;
};

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const router = useRouter();

  return (
    <div
      className={`bg-white text-black h-16 px-6 flex items-center ${className}`}
    >
      <div className="flex justify-between w-full items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          Link Snap
        </Link>

        {/* Nav Links */}
        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className=" hover:bg-blue-100 hover:text-blue-700 p-3 rounded-xl"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Button
          className="px-6"
          buttonText="Sign Up"
          onClick={() => {
            router.push("/components/register");
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
