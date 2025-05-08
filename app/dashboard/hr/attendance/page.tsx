'use client'

import { useState } from 'react';
import { Calendar, Download, Filter, Search } from 'lucide-react';

const AttendanceManagementHighContrast = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLeaveRequests, setShowLeaveRequests] = useState(false);

  // Sample data
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: '1',
      employeeName: 'John Doe',
      date: '2024-04-15',
      status: 'present',
      checkIn: '09:00',
      checkOut: '18:00',
      totalHours: 9
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      date: '2024-04-15',
      status: 'wfh',
      checkIn: '09:30',
      checkOut: '18:30',
      totalHours: 9
    }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: '1',
      employeeName: 'John Doe',
      type: 'Annual Leave',
      startDate: '2024-04-20',
      endDate: '2024-04-22',
      status: 'pending',
      reason: 'Family vacation'
    }
  ]);

  const handleLeaveRequest = (id, action) => {
    setLeaveRequests(prev =>
      prev.map(request =>
        request.id === id
          ? { ...request, status: action === 'approve' ? 'approved' : 'rejected' }
          : request
      )
    );
  };

  const generateMonthlyReport = () => {
    console.log('Generating monthly report for:', selectedMonth);
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }} className="p-6 bg-white min-h-screen">
      {/* High visibility styles with inline style backup */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black" style={{ color: '#000000' }}>
          Attendance Management
        </h1>
        <button
          onClick={() => setShowLeaveRequests(!showLeaveRequests)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          style={{ backgroundColor: '#1e40af', color: '#ffffff' }}
        >
          {showLeaveRequests ? 'View Attendance' : 'View Leave Requests'}
        </button>
      </div>

      {!showLeaveRequests ? (
        <>
          {/* Filters and Controls */}
          <div className="bg-gray-100 p-4 rounded-lg shadow mb-6" style={{ backgroundColor: '#f3f4f6' }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-black mb-1 font-medium" style={{ color: '#000000' }}>Month</label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  style={{ borderColor: '#d1d5db', color: '#000000' }}
                />
                <Calendar className="absolute right-3 top-9 h-5 w-5 text-gray-600" />
              </div>

              <div className="relative">
                <label className="block text-black mb-1 font-medium" style={{ color: '#000000' }}>Status Filter</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  style={{ borderColor: '#d1d5db', color: '#000000' }}
                >
                  <option value="all">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="on_leave">On Leave</option>
                  <option value="wfh">WFH</option>
                  <option value="wfo">WFO</option>
                </select>
                <Filter className="absolute right-3 top-9 h-5 w-5 text-gray-600" />
              </div>

              <div className="relative">
                <label className="block text-black mb-1 font-medium" style={{ color: '#000000' }}>Search</label>
                <input
                  type="text"
                  placeholder="Search employee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  style={{ borderColor: '#d1d5db', color: '#000000' }}
                />
                <Search className="absolute right-3 top-9 h-5 w-5 text-gray-600" />
              </div>

              <div className="flex flex-col justify-end">
                <button
                  onClick={generateMonthlyReport}
                  className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  style={{ backgroundColor: '#16a34a', color: '#ffffff' }}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-300" style={{ borderColor: '#d1d5db' }}>
            <table className="min-w-full divide-y divide-gray-200" style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead className="bg-gray-200" style={{ backgroundColor: '#e5e7eb' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider" style={{ color: '#000000' }}>
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider" style={{ color: '#000000' }}>
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider" style={{ color: '#000000' }}>
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider" style={{ color: '#000000' }}>
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider" style={{ color: '#000000' }}>
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider" style={{ color: '#000000' }}>
                    Total Hours
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-100" style={{ ':hover': { backgroundColor: '#f3f4f6' }}}>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200" style={{ borderBottomColor: '#e5e7eb' }}>
                        <div className="text-base font-medium text-black" style={{ color: '#000000' }}>{record.employeeName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200" style={{ borderBottomColor: '#e5e7eb' }}>
                        <div className="text-base text-black" style={{ color: '#000000' }}>{record.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200" style={{ borderBottomColor: '#e5e7eb' }}>
                        <span className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-full
                          ${record.status === 'present' ? 'bg-green-100 text-green-800' :
                            record.status === 'absent' ? 'bg-red-100 text-red-800' :
                            record.status === 'on_leave' ? 'bg-yellow-100 text-yellow-800' :
                            record.status === 'wfh' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'}`}
                          style={{ 
                            backgroundColor: record.status === 'present' ? '#dcfce7' : 
                                            record.status === 'absent' ? '#fee2e2' :
                                            record.status === 'on_leave' ? '#fef3c7' :
                                            record.status === 'wfh' ? '#dbeafe' : '#f3e8ff',
                            color: record.status === 'present' ? '#166534' : 
                                  record.status === 'absent' ? '#991b1b' :
                                  record.status === 'on_leave' ? '#92400e' :
                                  record.status === 'wfh' ? '#1e40af' : '#6b21a8'
                          }}
                        >
                          {record.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200" style={{ borderBottomColor: '#e5e7eb' }}>
                        <div className="text-base text-black" style={{ color: '#000000' }}>{record.checkIn || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200" style={{ borderBottomColor: '#e5e7eb' }}>
                        <div className="text-base text-black" style={{ color: '#000000' }}>{record.checkOut || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200" style={{ borderBottomColor: '#e5e7eb' }}>
                        <div className="text-base text-black" style={{ color: '#000000' }}>{record.totalHours || '-'}</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-base text-black" style={{ color: '#000000' }}>
                      No attendance records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {/* Leave Requests Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-300" style={{ borderColor: '#d1d5db' }}>
            <table className="min-w-full divide-y divide-gray-200" style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead className="bg-gray-200" style={{ backgroundColor: '#e5e7eb' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider" style={{ color: '#000000' }}>
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider" style={{ color: '#000000' }}>
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider" style={{ color: '#000000' }}>
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider" style={{ color: '#000000' }}>
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider" style={{ color: '#000000' }}>
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider" style={{ color: '#000000' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaveRequests.length > 0 ? (
                  leaveRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-100" style={{ ':hover': { backgroundColor: '#f3f4f6' }}}>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200" style={{ borderBottomColor: '#e5e7eb' }}>
                        <div className="text-base font-medium text-black" style={{ color: '#000000' }}>{request.employeeName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200" style={{ borderBottomColor: '#e5e7eb' }}>
                        <div className="text-base text-black" style={{ color: '#000000' }}>{request.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200" style={{ borderBottomColor: '#e5e7eb' }}>
                        <div className="text-base text-black" style={{ color: '#000000' }}>
                          {request.startDate} - {request.endDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200" style={{ borderBottomColor: '#e5e7eb' }}>
                        <div className="text-base text-black" style={{ color: '#000000' }}>{request.reason}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200" style={{ borderBottomColor: '#e5e7eb' }}>
                        <span className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-full
                          ${request.status === 'approved' ? 'bg-green-100 text-green-800' :
                            request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'}`}
                          style={{ 
                            backgroundColor: request.status === 'approved' ? '#dcfce7' : 
                                          request.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                            color: request.status === 'approved' ? '#166534' : 
                                 request.status === 'rejected' ? '#991b1b' : '#92400e'
                          }}
                        >
                          {request.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base font-medium border-b border-gray-200" style={{ borderBottomColor: '#e5e7eb' }}>
                        {request.status === 'pending' && (
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleLeaveRequest(request.id, 'approve')}
                              className="text-green-600 hover:text-green-900 font-bold"
                              style={{ color: '#16a34a' }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleLeaveRequest(request.id, 'reject')}
                              className="text-red-600 hover:text-red-900 font-bold"
                              style={{ color: '#dc2626' }}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-base text-black" style={{ color: '#000000' }}>
                      No leave requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="mt-4 text-sm text-black" style={{ color: '#000000' }}>
        © 2025 Attendance Management System
      </div>
    </div>
  );
};

export default AttendanceManagementHighContrast;