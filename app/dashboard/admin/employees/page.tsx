"use client";

import { useState } from "react";
import { Users, Search, Plus, X } from "lucide-react";

// Define types
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

// Employee Card Component
function EmployeeCard({ employee, onClick, onDelete }: { 
    employee: Employee, 
    onClick: () => void, 
    onDelete: () => void 
}) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex items-center justify-center bg-gray-100 h-32">
                <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                    {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{employee.firstName} {employee.lastName}</h3>
                <p className="text-sm text-gray-600 mb-2">{employee.jobRole}</p>
                <div className="text-xs text-gray-500 mb-3">
                    <p>ID: {employee.employeeId}</p>
                    <p>Experience: {employee.experience}</p>
                    <p>Type: {employee.employeeType}</p>
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={onClick}
                        className="flex-1 bg-blue-500 text-white py-1 px-3 rounded-md text-sm hover:bg-blue-600"
                    >
                        View Details
                    </button>
                    <button 
                        onClick={onDelete}
                        className="bg-red-100 text-red-600 py-1 px-2 rounded-md text-sm hover:bg-red-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

// Employee View Component
function EmployeeView({ employee, onClose, onEdit, onDelete }: {
    employee: Employee,
    onClose: () => void,
    onEdit: (employee: Employee) => void,
    onDelete: () => void
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState<Employee>(employee);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        onEdit(editedEmployee);
        setIsEditing(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-bold">
                        {isEditing ? "Edit Employee" : "Employee Details"}
                    </h2>
                    <div className="flex space-x-2">
                        {!isEditing && (
                            <>
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={onDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                        {isEditing && (
                            <>
                                <button 
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Save
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditedEmployee(employee);
                                    }}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                        <button 
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Close
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {!isEditing ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-center mb-6">
                                <div className="h-32 w-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                                    {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Employee ID</p>
                                            <p className="font-medium">{employee.employeeId}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium">{employee.firstName} {employee.middleName} {employee.lastName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Date of Birth</p>
                                            <p className="font-medium">{employee.dateOfBirth}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Gender</p>
                                            <p className="font-medium">{employee.gender}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Marital Status</p>
                                            <p className="font-medium">{employee.maritalStatus || "Not specified"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{employee.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Mobile Number</p>
                                            <p className="font-medium">{employee.mobileNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Current Address</p>
                                            <p className="font-medium">{employee.currentAddress}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Permanent Address</p>
                                            <p className="font-medium">{employee.permanentAddress}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Professional Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Job Role</p>
                                            <p className="font-medium">{employee.jobRole}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Department</p>
                                            <p className="font-medium">{employee.department || "Not specified"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Employee Type</p>
                                            <p className="font-medium">{employee.employeeType}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Experience</p>
                                            <p className="font-medium">{employee.experience}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Current Project</p>
                                            <p className="font-medium">{employee.currentProject || "Not assigned"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Skills & Education</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Skills</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {employee.skills?.map((skill, index) => (
                                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                        {skill.name} {skill.level && `(${skill.level})`}
                                                    </span>
                                                )) || <p className="text-sm text-gray-500">No skills listed</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Languages</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {employee.languages?.map((lang, index) => (
                                                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                        {lang}
                                                    </span>
                                                )) || <p className="text-sm text-gray-500">No languages listed</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Graduation</p>
                                            <p className="font-medium">{employee.education.graduation.level} in {employee.education.graduation.course}</p>
                                            <p className="text-sm text-gray-500">{employee.education.graduation.university}, {employee.education.graduation.yearOfPassout}</p>
                                        </div>
                                        {employee.education.postGraduation && (
                                            <div>
                                                <p className="text-sm text-gray-500">Post Graduation</p>
                                                <p className="font-medium">{employee.education.postGraduation.level} in {employee.education.postGraduation.course}</p>
                                                <p className="text-sm text-gray-500">{employee.education.postGraduation.university}, {employee.education.postGraduation.yearOfPassout}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={editedEmployee.firstName}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                                    <input
                                        type="text"
                                        name="middleName"
                                        value={editedEmployee.middleName}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={editedEmployee.lastName}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                                    <input
                                        type="text"
                                        name="jobRole"
                                        value={editedEmployee.jobRole}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={editedEmployee.department || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>
                            
                            {/* Additional fields would go here */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Main Employees Page Component to export
export function EmployeesPage() {
    // Sample employee data - in a real application, this would come from an API
    const [employees, setEmployees] = useState<Employee[]>([
        {
            employeeId: "EMP001",
            firstName: "John",
            middleName: "",
            lastName: "Doe",
            gender: "Male",
            dateOfBirth: "1990-05-15",
            mobileNumber: "1234567890",
            email: "john.doe@example.com",
            jobRole: "Software Developer",
            employeeType: "Full-time",
            experience: "5 years",
            aadhaarNumber: "1234-5678-9012",
            panNumber: "ABCDE1234F",
            education: {
                graduation: {
                    level: "B.Tech",
                    university: "Example University",
                    course: "Computer Science",
                    specialization: "Software",
                    mode: "Regular",
                    yearOfPassout: "2018"
                }
            },
            currentAddress: "123 Example Street, City",
            permanentAddress: "123 Example Street, City",
            photoUrl: "",
            skills: [
                { name: "JavaScript", level: "Expert" },
                { name: "React", level: "Intermediate" },
                { name: "Node.js", level: "Advanced" }
            ],
            languages: ["English", "Spanish"],
            department: "Engineering",
            currentProject: "Admin Dashboard"
        },
        {
            employeeId: "EMP002",
            firstName: "Jane",
            middleName: "",
            lastName: "Smith",
            gender: "Female",
            dateOfBirth: "1992-08-21",
            mobileNumber: "9876543210",
            email: "jane.smith@example.com",
            jobRole: "UI/UX Designer",
            employeeType: "Full-time",
            experience: "3 years",
            aadhaarNumber: "9876-5432-1098",
            panNumber: "FGHIJ5678K",
            education: {
                graduation: {
                    level: "B.Des",
                    university: "Design Institute",
                    course: "User Interface Design",
                    specialization: "Mobile UI",
                    mode: "Regular",
                    yearOfPassout: "2020"
                }
            },
            currentAddress: "456 Sample Avenue, Town",
            permanentAddress: "456 Sample Avenue, Town",
            photoUrl: "",
            skills: [
                { name: "Figma", level: "Expert" },
                { name: "Adobe XD", level: "Advanced" },
                { name: "UI/UX", level: "Expert" }
            ],
            languages: ["English", "French"],
            department: "Design",
            currentProject: "Mobile App"
        },
        {
            employeeId: "EMP003",
            firstName: "Michael",
            middleName: "R",
            lastName: "Johnson",
            gender: "Male",
            dateOfBirth: "1985-12-03",
            mobileNumber: "5556667777",
            email: "michael.johnson@example.com",
            jobRole: "Project Manager",
            employeeType: "Full-time",
            experience: "8 years",
            aadhaarNumber: "5555-6666-7777",
            panNumber: "LMNOP9012Q",
            education: {
                graduation: {
                    level: "B.Tech",
                    university: "Tech University",
                    course: "Information Technology",
                    specialization: "Systems",
                    mode: "Regular",
                    yearOfPassout: "2015"
                },
                postGraduation: {
                    level: "MBA",
                    university: "Business School",
                    course: "Project Management",
                    specialization: "IT Projects",
                    mode: "Regular",
                    yearOfPassout: "2017"
                }
            },
            currentAddress: "789 Another Road, City",
            permanentAddress: "789 Another Road, City",
            photoUrl: "",
            maritalStatus: "Married",
            skills: [
                { name: "Project Management", level: "Expert" },
                { name: "Agile", level: "Expert" },
                { name: "Leadership", level: "Advanced" }
            ],
            languages: ["English", "German"],
            department: "Management",
            currentProject: "System Migration"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    
    // Filter employees based on search term
    const filteredEmployees = employees.filter(emp => 
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.jobRole.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Delete employee handler
    const handleDeleteEmployee = (employeeId: string) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            setEmployees(employees.filter(emp => emp.employeeId !== employeeId));
            if (selectedEmployee?.employeeId === employeeId) {
                setSelectedEmployee(null);
            }
        }
    };

    // Edit employee handler
    const handleEditEmployee = (updatedEmployee: Employee) => {
        setEmployees(employees.map(emp => 
            emp.employeeId === updatedEmployee.employeeId ? updatedEmployee : emp
        ));
        setSelectedEmployee(updatedEmployee);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center">
                    <Users className="h-6 w-6 text-blue-500 mr-2" />
                    <h2 className="text-xl font-medium text-gray-800">Employee Management</h2>
                </div>
                
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
                        />
                    </div>
                    
                    <button 
                        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={() => setShowAddModal(true)}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Employee
                    </button>
                </div>
            </div>

            {/* Employee cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredEmployees.map((employee) => (
                    <EmployeeCard
                        key={employee.employeeId}
                        employee={employee}
                        onClick={() => setSelectedEmployee(employee)}
                        onDelete={() => handleDeleteEmployee(employee.employeeId)}
                    />
                ))}
                
                {filteredEmployees.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center bg-white rounded-lg shadow p-8">
                        <Users className="h-12 w-12 text-gray-300 mb-2" />
                        <p className="text-gray-500">No employees found</p>
                    </div>
                )}
            </div>

            {/* Employee detail modal */}
            {selectedEmployee && (
                <EmployeeView
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                    onEdit={handleEditEmployee}
                    onDelete={() => handleDeleteEmployee(selectedEmployee.employeeId)}
                />
            )}

            {/* Add employee modal would go here */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                        <div className="flex justify-between items-center border-b p-4">
                            <h2 className="text-xl font-bold">Add New Employee</h2>
                            <button onClick={() => setShowAddModal(false)}>
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-center text-gray-500">Add employee form would be implemented here</p>
                            <div className="flex justify-end mt-6">
                                <button 
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 mr-2"
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}