"use client";

import React, { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname, useRouter } from 'next/navigation';
import { Icons, navigationItems } from '@/app/dashboard/admin/utilis/index';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}

// Sidebar Component
function Sidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  
  // Find the active item based on the current path
  const getActiveItemFromPath = () => {
    for (const item of navigationItems) {
      if (pathname === item.path || pathname.startsWith(item.path + '/')) {
        return item.id;
      }
    }
    return 'dashboard'; // Default fallback
  };
  
  // Use state with a function initializer to set the initial active item
  const [activeItem, setActiveItem] = useState(() => {
    if (typeof window !== 'undefined') {
      // Try to get from localStorage if available
      const saved = localStorage.getItem('activeNavItem');
      return saved || getActiveItemFromPath();
    }
    return getActiveItemFromPath();
  });
  
  // Update localStorage when activeItem changes
  useEffect(() => {
    localStorage.setItem('activeNavItem', activeItem);
  }, [activeItem]);
  
  // Update active item when pathname changes
  useEffect(() => {
    const currentActiveItem = getActiveItemFromPath();
    setActiveItem(currentActiveItem);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-purple-800 to-purple-900 text-white transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-purple-700">
          <div className={`flex items-center ${!sidebarOpen && 'justify-center w-full'}`}>
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center">
                <span className="text-purple-800 font-bold">G</span>
              </div>
            </div>
            {sidebarOpen && (
              <div className="ml-2 text-xl font-semibold">GenAILakes</div>
            )}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-purple-700 p-1 rounded">
            {sidebarOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>
        <nav className="mt-5">
          <ul className="space-y-2 px-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem(item.id);
                    router.push(item.path);
                  }}
                  className={`flex items-center p-3 rounded-lg w-full transition-all duration-200 ${
                    activeItem === item.id
                      ? 'bg-purple-600 shadow-lg'
                      : 'hover:bg-purple-700'
                  } relative group`}
                >
                  <div className={`${!sidebarOpen && 'mx-auto'} ${
                    activeItem === item.id ? 'text-white' : 'text-purple-200'
                  }`}>{item.icon}</div>
                  {sidebarOpen && (
                    <span className={`ml-3 ${
                      activeItem === item.id ? 'font-medium' : ''
                    }`}>{item.title}</span>
                  )}
                  {sidebarOpen && activeItem === item.id && (
                    <span className="ml-auto bg-white rounded-full p-1">
                      <span className="text-purple-600 h-3 w-3">
                        <Icons.Check />
                      </span>
                    </span>
                  )}
                  {!sidebarOpen && (
                    <div className="absolute left-full ml-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-100">
                      {item.title}
                    </div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {children}
      </div>
    </div>
  );
}