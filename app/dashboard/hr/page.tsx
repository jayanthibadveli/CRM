"use client";

import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface DashboardCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
  textColor: string;
}

interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export default function HRDashboard() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      type: 'Annual Leave',
      startDate: '2024-04-15',
      endDate: '2024-04-18',
      status: 'pending',
      reason: 'Family vacation'
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      type: 'Sick Leave',
      startDate: '2024-04-16',
      endDate: '2024-04-17',
      status: 'approved',
      reason: 'Medical appointment'
    }
  ]);

  const dashboardCards: DashboardCard[] = [
    {
      title: 'New Joinees This Month',
      value: 5,
      icon: <Users className="w-6 h-6" />,
      change: { value: 2, isPositive: true },
      color: 'bg-blue-600',
      textColor: 'text-blue-800'
    },
    {
      title: 'Pending Onboardings',
      value: 3,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-800'
    },
    {
      title: 'Attendance Rate',
      value: '96%',
      icon: <Clock className="w-6 h-6" />,
      change: { value: 2, isPositive: true },
      color: 'bg-green-600',
      textColor: 'text-green-800'
    },
    {
      title: 'Leave Requests',
      value: 2,
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-purple-600',
      textColor: 'text-purple-800'
    },
    {
      title: 'Payroll Status',
      value: 'Processed',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-indigo-600',
      textColor: 'text-indigo-800'
    }
  ];

  const handleLeaveRequest = (id: string, action: 'approve' | 'reject') => {
    setLeaveRequests(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: action === 'approve' ? 'approved' : 'rejected' }
          : request
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">HR Dashboard</h1>
      
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {dashboardCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${card.color} text-white`}>
                {card.icon}
              </div>
              {card.change && (
                <div className={`flex items-center ${card.change.isPositive ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>
                  {card.change.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span className="text-sm font-bold">{card.change.value}%</span>
                </div>
              )}
            </div>
            <h3 className="text-gray-700 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Leave Requests Section */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Recent Leave Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.employeeName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-800">{request.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-800">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-800">{request.reason}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full 
                      ${request.status === 'approved' ? 'bg-green-100 text-green-800 border border-green-300' : 
                        request.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-300' : 
                        'bg-yellow-100 text-yellow-800 border border-yellow-300'}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {request.status === 'pending' && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleLeaveRequest(request.id, 'approve')}
                          className="text-green-600 hover:text-green-900"
                          aria-label="Approve request"
                        >
                          <CheckCircle className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => handleLeaveRequest(request.id, 'reject')}
                          className="text-red-600 hover:text-red-900"
                          aria-label="Reject request"
                        >
                          <XCircle className="w-6 h-6" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}