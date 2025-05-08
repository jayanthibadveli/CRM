"use client"

import { useState } from 'react';
import { ChevronRight, Settings } from 'lucide-react';
import { navigationItems, Icons } from './utilis/index';
import { EmployeesPage } from './employees/page'; // Import EmployeesPage component

export default function AdminDashboard() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Summary cards data
  const summaryCards = [
    { title: 'Total Employees', value: '125', icon: Icons.Users, color: 'bg-blue-500' },
    { title: 'Present Today', value: '108', icon: Icons.Clock, color: 'bg-green-500' },
    { title: 'Tasks Completed', value: '24', icon: Icons.Check, color: 'bg-purple-500' },
    { title: 'Open Issues', value: '7', icon: Icons.Help, color: 'bg-red-500' }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Render main content based on active item
  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <DashboardContent summaryCards={summaryCards} />;
      case 'employees':
        return <EmployeesPage />;
      case 'attendance':
        return <AttendanceContent />;
      case 'tasks':
        return <TasksContent />;
      case 'payroll':
        return <PayrollContent />;
      case 'issues':
        return <IssuesContent />;
      case 'crm': 
        return <CRMContent />;
      default:
        return <DashboardContent summaryCards={summaryCards} />;
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-white shadow">
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center px-4 py-3 mt-2 text-sm rounded-lg w-full ${
                  activeItem === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveItem(item.id)}
              >
                <div className="h-5 w-5 mr-3">{item.icon}</div>
                <span>{item.title}</span>
                {activeItem === item.id && (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </button>
            ))}
          </nav>
          <div className="border-t p-4">
            <button className="flex items-center px-4 py-3 text-sm text-gray-600 rounded-lg hover:bg-gray-100 w-full">
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            <button onClick={toggleMobileMenu} className="text-gray-500 hover:text-gray-700">
              <div className="h-6 w-6"><Icons.X /></div>
            </button>
          </div>
          <nav className="px-2 py-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center px-4 py-3 mt-2 text-sm rounded-lg w-full ${
                  activeItem === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setActiveItem(item.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                <div className="h-5 w-5 mr-3">{item.icon}</div>
                <span>{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button onClick={toggleMobileMenu} className="md:hidden text-gray-500 mr-2">
                <div className="h-6 w-6"><Icons.Menu /></div>
              </button>
              <h2 className="text-lg font-medium text-gray-800">
                {navigationItems.find(item => item.id === activeItem)?.title || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium">
                    AS
                  </div>
                  <span className="ml-2 text-gray-700 hidden md:block">Admin User</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

// Dashboard content component with only summary cards
interface DashboardContentProps {
  summaryCards: { title: string; value: string; icon: React.FC; color: string }[];
}

function DashboardContent({ summaryCards }: DashboardContentProps) {
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className={`${card.color} rounded-lg p-3`}>
                <div className="h-6 w-6 text-white">
                  <card.icon />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                <p className="text-2xl font-semibold text-gray-800">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Placeholder components for other sections
function AttendanceContent() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">
          <Icons.Clock />
        </div>
        <h2 className="text-lg font-medium text-gray-800">Attendance Management</h2>
      </div>
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-gray-300 h-16 w-16">
          <Icons.Clock />
        </div>
        <p className="mt-4 text-gray-500">Attendance tracking and management interface will appear here</p>
      </div>
    </div>
  );
}

function TasksContent() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">
          <Icons.Check />
        </div>
        <h2 className="text-lg font-medium text-gray-800">Task Management</h2>
      </div>
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-gray-300 h-16 w-16">
          <Icons.Check />
        </div>
        <p className="mt-4 text-gray-500">Task management interface will appear here</p>
      </div>
    </div>
  );
}

function PayrollContent() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">
          <Icons.DollarSign />
        </div>
        <h2 className="text-lg font-medium text-gray-800">Payroll and Expenses</h2>
      </div>
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-gray-300 h-16 w-16">
          <Icons.DollarSign />
        </div>
        <p className="mt-4 text-gray-500">Payroll and expense management interface will appear here</p>
      </div>
    </div>
  );
}

function IssuesContent() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">
          <Icons.Help />
        </div>
        <h2 className="text-lg font-medium text-gray-800">Open Issues</h2>
      </div>
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-gray-300 h-16 w-16">
          <Icons.Help />
        </div>
        <p className="mt-4 text-gray-500">Issue tracking and management interface will appear here</p>
      </div>
    </div>
  );
}

// Placeholder component for CRM
function CRMContent() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <div className="text-blue-500 mr-2">
          <Icons.Briefcase />
        </div>
        <h2 className="text-lg font-medium text-gray-800">Customer Relationship Management</h2>
      </div>
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-gray-300 h-16 w-16">
          <Icons.Briefcase />
        </div>
        <p className="mt-4 text-gray-500">CRM interface will appear here</p>
      </div>
    </div>
  );
}