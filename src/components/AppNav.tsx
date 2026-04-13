"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/",            label: "Joining Circular", icon: "📋" },
  { href: "/birthday",    label: "Birthday",          icon: "🎂" },
  { href: "/anniversary", label: "Anniversary",       icon: "🏆" },
  { href: "/history",     label: "History",           icon: "🕐" },
];

export default function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Left: Logo + divider + product name */}
        <div className="flex items-center gap-3">
          <Image src="/aeonx-logo-dark.png" alt="AeonX" height={36} width={120} style={{ height: 36, width: "auto" }} />
          <div className="w-px h-6 bg-gray-200" />
          <span className="text-sm text-gray-400 font-medium">HR Tools</span>
        </div>

        {/* Right: Nav links */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-orange-50 text-orange-700 font-semibold"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
