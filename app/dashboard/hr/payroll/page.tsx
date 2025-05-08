'use client'

import { useState } from 'react';
import { Download, Plus, Search } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  department: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
}

interface Reimbursement {
  id: string;
  employeeName: string;
  type: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
}

export default function PayrollManagement() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [searchTerm, setSearchTerm] = useState('');
  const [showReimbursements, setShowReimbursements] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      department: 'Engineering',
      basicSalary: 50000,
      allowances: 10000,
      deductions: 5000,
      netSalary: 55000,
      status: 'pending'
    },
    {
      id: '2',
      name: 'Jane Smith',
      department: 'Design',
      basicSalary: 45000,
      allowances: 8000,
      deductions: 4000,
      netSalary: 49000,
      status: 'processed'
    }
  ]);

  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      type: 'Travel',
      amount: 2500,
      date: '2024-04-15',
      status: 'pending',
      description: 'Client visit travel expenses'
    }
  ]);

  const handleReimbursement = (id: string, action: 'approve' | 'reject') => {
    setReimbursements(prev =>
      prev.map(reimbursement =>
        reimbursement.id === id
          ? { ...reimbursement, status: action === 'approve' ? 'approved' : 'rejected' }
          : reimbursement
      )
    );
  };

  const generatePayslip = (employeeId: string) => {
    // Here you would typically generate and download a PDF payslip
    console.log('Generating payslip for employee:', employeeId);
  };

  const processPayroll = () => {
    setEmployees(prev =>
      prev.map(employee => ({
        ...employee,
        status: 'processed'
      }))
    );
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
        <button
          onClick={() => setShowReimbursements(!showReimbursements)}
          className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm"
        >
          {showReimbursements ? 'View Payroll' : 'View Reimbursements'}
        </button>
      </div>

      {!showReimbursements ? (
        <>
          {/* Controls */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-1">Select Month</label>
                <div className="relative">
                  <input
                    id="month-select"
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-1">Search Employee</label>
                <div className="relative">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Enter name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={processPayroll}
                  className="w-full px-3 py-2 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-700 shadow-sm transition-colors"
                >
                  Process Payroll
                </button>
              </div>
            </div>
          </div>

          {/* Payroll Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Basic Salary
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Allowances
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Deductions
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Net Salary
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{employee.department}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-700">₹{employee.basicSalary.toLocaleString()}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-700">₹{employee.allowances.toLocaleString()}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-700">₹{employee.deductions.toLocaleString()}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">₹{employee.netSalary.toLocaleString()}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs font-medium rounded-full
                          ${employee.status === 'paid' ? 'bg-green-100 text-green-800' :
                            employee.status === 'processed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                          {employee.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => generatePayslip(employee.id)}
                          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center text-sm font-medium"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Payslip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Reimbursements Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={() => {/* Add new reimbursement */}}
                className="flex items-center px-3 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Reimbursement
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reimbursements.map((reimbursement) => (
                    <tr key={reimbursement.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{reimbursement.employeeName}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{reimbursement.type}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-700">₹{reimbursement.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{reimbursement.date}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-700 truncate max-w-xs">{reimbursement.description}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs font-medium rounded-full
                          ${reimbursement.status === 'approved' ? 'bg-green-100 text-green-800' :
                            reimbursement.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                          {reimbursement.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        {reimbursement.status === 'pending' && (
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleReimbursement(reimbursement.id, 'approve')}
                              className="text-green-600 hover:text-green-900 font-medium text-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReimbursement(reimbursement.id, 'reject')}
                              className="text-red-600 hover:text-red-900 font-medium text-sm"
                            >
                              Reject
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
        </>
      )}
    </div>
  );
}