"use client";

import { useState } from "react";
import EmployeeAdd from './employeemanagement/EmployeeAdd';
import EmployeeView from './employeemanagement/EmployeeView';
import EmployeeCard from './employeemanagement/EmployeeCard';

interface EducationDetails {
    level: string;
    university: string;
    course: string;
    specialization: string;
    mode: string;
    yearOfPassout: string;
    skills?: string[];
}

interface Skill {
  name: string;
  level?: string;
}

interface Employee {
    employeeId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    mobileNumber: string;
    email: string;
    jobRole: string;
    employeeType: 'Full-time' | 'Part-time' | 'Intern';
    experience: string;
    aadhaarNumber: string;
    panNumber: string;
    education: {
        postGraduation?: EducationDetails;
        graduation: EducationDetails;
    };
    currentAddress: string;
    permanentAddress: string;
    photoUrl: string;
    maritalStatus?: string;
    location?: string;
    skills?: Skill[];
    currentProject?: string;
    languages?: string[];
    department?: string;
    _id?: string;
}

export default function Employees() {
    const [employees, setEmployees] = useState<Employee[]>([
      // Sample data for demonstration
      {
        employeeId: "EMP001",
        firstName: "John",
        middleName: "",
        lastName: "Doe",
        gender: "Male",
        dateOfBirth: "1990-01-15",
        mobileNumber: "9876543210",
        email: "john.doe@example.com",
        jobRole: "Full Stack Developer",
        employeeType: "Full-time",
        experience: "5 years",
        aadhaarNumber: "123456789012",
        panNumber: "ABCDE1234F",
        education: {
          graduation: {
            level: "Bachelor's",
            university: "Example University",
            course: "Computer Science",
            specialization: "Software Engineering",
            mode: "Full-time",
            yearOfPassout: "2015"
          }
        },
        currentAddress: "123 Main St, City",
        permanentAddress: "123 Main St, City",
        photoUrl: "/placeholder-avatar.png",
        location: "New York",
        skills: [
          { name: "React", level: "Expert" },
          { name: "Node.js", level: "Advanced" },
          { name: "TypeScript", level: "Intermediate" }
        ],
        currentProject: "EMS Portal",
        languages: ["English", "Spanish"],
        department: "Engineering"
      },
      {
        employeeId: "EMP002",
        firstName: "Jane",
        middleName: "",
        lastName: "Smith",
        gender: "Female",
        dateOfBirth: "1992-05-20",
        mobileNumber: "9876543211",
        email: "jane.smith@example.com",
        jobRole: "UX Designer",
        employeeType: "Full-time",
        experience: "3 years",
        aadhaarNumber: "123456789013",
        panNumber: "ABCDE1234G",
        education: {
          graduation: {
            level: "Bachelor's",
            university: "Design Institute",
            course: "Design",
            specialization: "User Experience",
            mode: "Full-time",
            yearOfPassout: "2018"
          }
        },
        currentAddress: "456 Park Ave, City",
        permanentAddress: "456 Park Ave, City",
        photoUrl: "/placeholder-avatar.png",
        location: "San Francisco",
        skills: [
          { name: "Figma", level: "Expert" },
          { name: "UI Design", level: "Advanced" },
          { name: "User Research", level: "Intermediate" }
        ],
        currentProject: "Mobile App Redesign",
        languages: ["English", "French"],
        department: "Design"
      }
    ]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    
    const addEmployee = (employeeData: any) => {
        // Generate a unique ID for new employee
        const newEmployee: Employee = {
            ...employeeData,
            _id: Date.now().toString(),
            employeeId: `EMP${(employees.length + 1).toString().padStart(3, '0')}`,
            employeeType: employeeData.employeeType || 'Full-time'
        };
        setEmployees([...employees, newEmployee]);
        setShowAddModal(false);
        setStatusMessage({text: "Employee added successfully!", type: "success"});
        setTimeout(() => setStatusMessage(null), 3000);
    };

    const handleViewEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowViewModal(true);
    };

    const handleCloseViewModal = () => {
        setShowViewModal(false);
        setSelectedEmployee(null);
    };

    const handleEditEmployee = (updatedEmployee: Employee) => {
        setEmployees(prevEmployees => 
            prevEmployees.map(emp => 
                emp.employeeId === updatedEmployee.employeeId ? updatedEmployee : emp
            )
        );
        setStatusMessage({text: "Employee updated successfully!", type: "success"});
        setTimeout(() => setStatusMessage(null), 3000);
    };

    const handleDeleteClick = (employeeId: string) => {
        setConfirmDelete(employeeId);
    };
    
    const confirmDeleteEmployee = () => {
        if (confirmDelete) {
            setEmployees(prevEmployees => 
                prevEmployees.filter(emp => emp.employeeId !== confirmDelete)
            );
            setStatusMessage({text: "Employee deleted successfully!", type: "success"});
            setTimeout(() => setStatusMessage(null), 3000);
            setConfirmDelete(null);
            // If we're viewing this employee, close the modal
            if (selectedEmployee?.employeeId === confirmDelete) {
                handleCloseViewModal();
            }
        }
    };
    
    const filteredEmployees = employees.filter(employee => 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.jobRole.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <div className="container mx-auto p-4 bg-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-blue-700">Employee Management</h1>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Employee
                </button>
            </div>
    
            {statusMessage && (
                <div className={`p-4 mb-4 rounded font-medium ${statusMessage.type === 'success' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {statusMessage.text}
                </div>
            )}
    
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search employees..."
                    className="w-full p-2 border border-blue-300 rounded bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmployees.map(employee => (
                    <div key={employee.employeeId} className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mr-3">
                                    {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{employee.firstName} {employee.lastName}</h3>
                                    <p className="text-blue-600">{employee.jobRole}</p>
                                    <p className="text-gray-600 text-sm">{employee.department}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2 text-gray-500">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm text-gray-600">{employee.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-sm text-gray-600">{employee.mobileNumber}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm text-gray-600">{employee.location}</span>
                                </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                    {employee.employeeType}
                                </span>
                                
                                {employee.skills && employee.skills.slice(0, 2).map((skill, index) => (
                                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="mt-4 flex justify-between">
                                <button 
                                    onClick={() => handleDeleteClick(employee.employeeId)}
                                    className="px-3 py-1 text-sm text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                                <button 
                                    onClick={() => handleViewEmployee(employee)}
                                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    
            {filteredEmployees.length === 0 && (
                <div className="text-center p-6 bg-blue-50 rounded border border-blue-100 text-blue-700">
                    No employees found. Add new employees or adjust your search.
                </div>
            )}
    
            {/* Add Employee Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-blue-700">Add New Employee</h2>
                            <button 
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <EmployeeAdd 
                            onClose={() => setShowAddModal(false)}
                            onSave={addEmployee}
                        />
                    </div>
                </div>
            )}
    
            {/* View Employee Modal */}
            {showViewModal && selectedEmployee && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-blue-700">Employee Details</h2>
                            <button 
                                onClick={handleCloseViewModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <EmployeeView
                            employee={selectedEmployee}
                            onClose={handleCloseViewModal}
                            onEdit={handleEditEmployee}
                            onDelete={() => handleDeleteClick(selectedEmployee.employeeId)}
                        />
                    </div>
                </div>
            )}
            
            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Confirm Delete</h3>
                        <p className="mb-6 text-gray-600">Are you sure you want to delete this employee? This action cannot be undone.</p>
                        <div className="flex justify-end gap-4">
                            <button 
                                onClick={() => setConfirmDelete(null)} 
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDeleteEmployee}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}