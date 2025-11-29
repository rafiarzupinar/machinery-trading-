"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Settings, LogOut, Package, Menu, X } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface AdminSidebarProps {
      locale: string;
      userName?: string | null;
}

export default function AdminSidebar({ locale, userName }: AdminSidebarProps) {
      const [isOpen, setIsOpen] = useState(false);
      const pathname = usePathname();

      const toggleSidebar = () => setIsOpen(!isOpen);

      const isActive = (path: string) => pathname === path;

      const menuItems = [
            { href: `/${locale}/admin`, label: 'Dashboard', icon: LayoutDashboard },
            { href: `/${locale}/admin/machines`, label: 'Machines', icon: Package },
            { href: `/${locale}/admin/categories`, label: 'Categories', icon: Package },
            { href: `/${locale}/admin/settings`, label: 'Settings', icon: Settings },
      ];

      return (
            <>
                  {/* Mobile Header */}
                  <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
                        <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
                        <button onClick={toggleSidebar} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                              {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                  </div>

                  {/* Overlay */}
                  {isOpen && (
                        <div
                              className="fixed inset-0 bg-black/50 z-30 md:hidden"
                              onClick={() => setIsOpen(false)}
                        />
                  )}

                  {/* Sidebar */}
                  <aside className={`
                        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen
                        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                  `}>
                        <div className="p-6 border-b flex justify-between items-center">
                              <div>
                                    <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
                                    <p className="text-sm text-gray-500">Welcome, {userName}</p>
                              </div>
                              <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500">
                                    <X size={20} />
                              </button>
                        </div>

                        <nav className="p-4 space-y-2">
                              {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                          <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.href)
                                                      ? 'bg-primary text-white'
                                                      : 'text-gray-700 hover:bg-gray-50'
                                                      }`}
                                          >
                                                <Icon size={20} />
                                                <span>{item.label}</span>
                                          </Link>
                                    );
                              })}

                              <button
                                    onClick={() => signOut({ callbackUrl: `/${locale}` })}
                                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full mt-8"
                              >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                              </button>
                        </nav>
                  </aside>
            </>
      );
}
