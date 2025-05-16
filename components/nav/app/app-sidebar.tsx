import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Receipt,
  FileText,
  Building2,
  Settings,
  LogOut,
  User,
  Calendar, // Add Calendar icon for Booking
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserMenu } from "../UserMenu";

export function Sidebar() {
  const user = { name: 'Guest User', email: 'guest@example.com' };
  const [isExpanded, setIsExpanded] = useState(false);
  const navigationItems = [
    {
      icon: Building2,
      label: "Business & Legal",
      href: "/dashboard/setup",
    },
    {
      icon: Globe,
      label: "Web Development",
      href: "/dashboard/web-development",
    },
    {
      icon: Receipt,
      label: "Finances",
      href: "/dashboard/finances",
    },
    {
      icon: Calendar,
      label: "Booking",
      href: "/dashboard/booking",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen border-r bg-background transition-all duration-300 ease-in-out z-30",
        isExpanded ? "w-56" : "w-12",
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-3 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="HnDL Logo" className="w-6 h-6 rounded-md object-contain rotate-45 transform transition-transform duration-500 hover:rotate-0" />
          {isExpanded && <span className="font-semibold text-sm">HnDL</span>}
        </Link>
      </div>
      <nav className="p-1 space-y-1">
        {navigationItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors"
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {isExpanded && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-2 border-t bg-background">
        <div className="flex items-center space-x-2 py-1.5">
          <UserMenu>
              <div className="flex-1">
                <p className="text-xs font-medium">Menu</p>
              </div>
          </UserMenu>

          {isExpanded && (
              <div className="flex-1">
                <p className="text-xs font-medium">{user?.name || 'Unnamed User'}</p>
                <p className="text-xs text-muted-foreground overflow-hidden">{user?.email || ''}</p>
              </div>
            )}
        </div>
      </div>
    </aside>
  );
}
