"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  FileText,
  Menu,
  X
} from 'lucide-react';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard/hr',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    title: 'Employee Management',
    href: '/dashboard/hr/EmployeeManagement',
    icon: <Users className="w-5 h-5" />
  },
  {
    title: 'Attendance',
    href: '/dashboard/hr/attendance',
    icon: <Calendar className="w-5 h-5" />
  },
  {
    title: 'Payroll',
    href: '/dashboard/hr/payroll',
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    title: 'Onboarding',
    href: '/dashboard/hr/onboarding',
    icon: <FileText className="w-5 h-5" />
  }
];

export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md lg:hidden"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 border-b px-4">
            <h1 className="text-2xl font-bold text-indigo-600">HR Portal</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-3">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-6 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-4">{item.icon}</span>
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-6 border-t">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-base font-medium text-indigo-600">HR</span>
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-700">HR Admin</p>
                <p className="text-sm text-gray-500">hr@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-200 ${isSidebarOpen ? 'lg:ml-72' : ''}`}>
        <div className="min-h-screen p-6">
          {children}
        </div>
      </main>
    </div>
  );
}