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
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Employee Management</h1>
            </div>
    
            {statusMessage && (
                <div className={`p-4 mb-4 rounded ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {statusMessage.text}
                </div>
            )}
    
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search employees..."
                    className="w-full p-2 border rounded"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmployees.map(employee => (
                    <EmployeeCard 
                        key={employee.employeeId}
                        employee={employee}
                        onClick={() => handleViewEmployee(employee)}
                        onDelete={() => handleDeleteClick(employee.employeeId)}
                    />
                ))}
            </div>
    
            {filteredEmployees.length === 0 && (
                <div className="text-center p-6 bg-gray-100 rounded">
                    No employees found. Add new employees or adjust your search.
                </div>
            )}
    
            {/* Add Employee Modal */}
            {showAddModal && (
                <EmployeeAdd 
                    onClose={() => setShowAddModal(false)}
                    onSave={addEmployee}
                />
            )}
    
            {/* View Employee Modal */}
            {showViewModal && selectedEmployee && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <EmployeeView
                        employee={selectedEmployee}
                        onClose={handleCloseViewModal}
                        onEdit={handleEditEmployee}
                        onDelete={() => handleDeleteClick(selectedEmployee.employeeId)}
                    />
                </div>
            )}
            
            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                        <p className="mb-6">Are you sure you want to delete this employee? This action cannot be undone.</p>
                        <div className="flex justify-end gap-4">
                            <button 
                                onClick={() => setConfirmDelete(null)} 
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDeleteEmployee}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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