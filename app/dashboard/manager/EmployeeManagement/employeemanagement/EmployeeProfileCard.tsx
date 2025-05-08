// EmployeeProfileCard.tsx
import React, { useState } from 'react';
import { Eye, Trash2, X, Edit2, Save } from 'lucide-react';

interface DisplayEmployee {
    id: number;
    _id: string;
    name: string;
    role: string;
    location: string;
    email: string;
    phone: string;
    experience: number;
    education: string;
    languages: string[];
    skills: string[];
    image_url: string;
    match: number;
    dateOfJoining: string; // Add this field
    assignedProject: string; // Add this field
}

interface EmployeeProfileCardProps {
    employee: DisplayEmployee;
    onClose: () => void;
    onDelete: (employeeId: string) => void;
    onUpdate: (employee: DisplayEmployee) => void;
}

const EmployeeProfileCard: React.FC<EmployeeProfileCardProps> = ({
    employee,
    onClose,
    onDelete,
    onUpdate
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState<DisplayEmployee>({...employee});
    const [activeTab, setActiveTab] = useState<'details'|'skills'|'education'>('details');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        onUpdate(editedEmployee);
        setIsEditing(false);
    };

    const confirmDelete = () => {
        if (window.confirm(`Are you sure you want to delete employee ${employee.name}?`)) {
            onDelete(employee._id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
                    <h2 className="text-xl font-bold">Employee Profile</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-200">
                        <X size={24} />
                    </button>
                </div>

                {/* Profile Header */}
                <div className="p-6 border-b border-gray-200 flex items-center space-x-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                        <img 
                            src={employee.image_url || '/placeholder-avatar.png'} 
                            alt={employee.name}
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-avatar.png';
                            }}
                        />
                    </div>
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={editedEmployee.name}
                                    onChange={handleInputChange}
                                    className="text-2xl font-bold w-full border rounded p-1"
                                />
                                <input
                                    type="text"
                                    name="role"
                                    value={editedEmployee.role}
                                    onChange={handleInputChange}
                                    className="text-lg text-blue-600 w-full border rounded p-1"
                                />
                                <p className="text-gray-500">ID: {employee._id}</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold">{employee.name}</h3>
                                <p className="text-lg text-blue-600">{employee.role}</p>
                                <p className="text-gray-500">ID: {employee._id}</p>
                            </>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        {isEditing ? (
                            <button 
                                onClick={handleSave}
                                className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            >
                                <Save size={16} />
                                <span>Save</span>
                            </button>
                        ) : (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                <Edit2 size={16} />
                                <span>Edit</span>
                            </button>
                        )}
                        <button 
                            onClick={confirmDelete}
                            className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            <Trash2 size={16} />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`py-3 px-6 font-medium ${activeTab === 'details' 
                                ? 'border-b-2 border-blue-500 text-blue-600' 
                                : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Details
                        </button>
                        <button
                            onClick={() => setActiveTab('skills')}
                            className={`py-3 px-6 font-medium ${activeTab === 'skills' 
                                ? 'border-b-2 border-blue-500 text-blue-600' 
                                : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Skills
                        </button>
                        <button
                            onClick={() => setActiveTab('education')}
                            className={`py-3 px-6 font-medium ${activeTab === 'education' 
                                ? 'border-b-2 border-blue-500 text-blue-600' 
                                : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Education
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'details' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedEmployee.email}
                                            onChange={handleInputChange}
                                            className="w-full border rounded p-1"
                                        />
                                    ) : (
                                        <p>{employee.email}</p>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={editedEmployee.phone}
                                            onChange={handleInputChange}
                                            className="w-full border rounded p-1"
                                        />
                                    ) : (
                                        <p>{employee.phone}</p>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={editedEmployee.location}
                                            onChange={handleInputChange}
                                            className="w-full border rounded p-1"
                                        />
                                    ) : (
                                        <p>{employee.location}</p>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Experience</h4>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="experience"
                                            value={editedEmployee.experience}
                                            onChange={handleInputChange}
                                            className="w-full border rounded p-1"
                                        />
                                    ) : (
                                        <p>{employee.experience} years</p>
                                    )}
                                </div>
                                {/* Add Date of Joining field */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Date of Joining</h4>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name="dateOfJoining"
                                            value={editedEmployee.dateOfJoining}
                                            onChange={handleInputChange}
                                            className="w-full border rounded p-1"
                                        />
                                    ) : (
                                        <p>{employee.dateOfJoining ? new Date(employee.dateOfJoining).toLocaleDateString() : 'Not specified'}</p>
                                    )}
                                </div>
                                {/* Add Assigned Project field */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Assigned Project</h4>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="assignedProject"
                                            value={editedEmployee.assignedProject}
                                            onChange={handleInputChange}
                                            className="w-full border rounded p-1"
                                        />
                                    ) : (
                                        <p>{employee.assignedProject || 'None'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div>
                            <h4 className="text-lg font-medium mb-3">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {employee.skills.map((skill, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'education' && (
                        <div>
                            <h4 className="text-lg font-medium mb-3">Education</h4>
                            <p>{employee.education}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfileCard;