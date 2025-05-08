// components/employeemanagement/EmployeeView.tsx
import { FC, useState } from 'react';

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

interface EmployeeViewProps {
  employee: Employee;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
  onDelete: () => void;
}

const EmployeeView: FC<EmployeeViewProps> = ({ 
  employee, 
  onClose, 
  onEdit,
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<Employee>(employee);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedEmployee(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Employee] as Record<string, unknown>),
          [child]: value
        }
      }));    } else {
      setEditedEmployee(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(editedEmployee);
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Delete button clicked - attempting to delete employee:", employee.employeeId);
    onDelete();
  };

  const getAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const fullName = `${employee.firstName} ${employee.middleName ? employee.middleName + ' ' : ''}${employee.lastName}`;
  const initials = `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`;

  // Box component for consistent styling
  const InfoBox = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white shadow rounded-lg p-4 border border-gray-200 h-full">
      <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );

  // Item component for label-value pairs in boxes
  const InfoItem = ({ label, value }: { label: string, value: string | React.ReactNode }) => (
    <div className="mb-2">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-gray-900">{value || 'Not specified'}</p>
    </div>
  );

  if (isEditing) {
    return (
      <div className="bg-white fixed inset-0 z-50 w-full h-full overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Edit Employee: {fullName}</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="space-y-4 col-span-full">
              <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editedEmployee.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={editedEmployee.middleName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editedEmployee.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={editedEmployee.gender}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={editedEmployee.dateOfBirth}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                  <select
                    name="maritalStatus"
                    value={editedEmployee.maritalStatus || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-4 col-span-full">
              <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={editedEmployee.mobileNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedEmployee.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Address</label>
                  <textarea
                    name="currentAddress"
                    value={editedEmployee.currentAddress}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
                  <textarea
                    name="permanentAddress"
                    value={editedEmployee.permanentAddress}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editedEmployee.location || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Employment Information */}
            <div className="space-y-4 col-span-full">
              <h3 className="text-lg font-semibold border-b pb-2">Employment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={editedEmployee.employeeId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                  <input
                    type="text"
                    name="jobRole"
                    value={editedEmployee.jobRole}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={editedEmployee.department || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee Type</label>
                  <select
                    name="employeeType"
                    value={editedEmployee.employeeType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={editedEmployee.experience}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Project</label>
                  <input
                    type="text"
                    name="currentProject"
                    value={editedEmployee.currentProject || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  return (
    <div className="bg-white fixed inset-0 z-50 w-full h-full overflow-y-auto">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-xl font-bold">Employee Profile</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="p-6">
        {/* Profile Header with Employee Basic Info */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold shrink-0">
            {initials}
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">{fullName}</h3>
            <p className="text-gray-600 mb-1">{employee.jobRole}</p>
            <p className="text-sm text-gray-500 mb-4">{employee.department || 'Department not specified'}</p>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-sm">{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-sm">{employee.mobileNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-sm">{employee.location || 'Location not specified'}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Information Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Personal Information Box */}
          <InfoBox title="Personal Information">
            <InfoItem label="Employee ID" value={employee.employeeId} />
            <InfoItem label="Gender" value={employee.gender} />
            <InfoItem label="Date of Birth" value={`${formatDate(employee.dateOfBirth)} (${getAge(employee.dateOfBirth)} years)`} />
            
          </InfoBox>
          
          {/* Employment Details Box */}
          <InfoBox title="Employment Details">
            <InfoItem label="Job Role" value={employee.jobRole} />
            <InfoItem label="Department" value={employee.department || 'Not specified'} />
            <InfoItem label="Employee Type" value={employee.employeeType} />
            <InfoItem label="Experience" value={employee.experience} />
            <InfoItem label="Current Project" value={employee.currentProject || 'Not assigned'} />
          </InfoBox>
          
          {/* Contact Details Box */}
          <InfoBox title="Contact Details">
            <InfoItem label="Email" value={employee.email} />
            <InfoItem label="Mobile" value={employee.mobileNumber} />
            <InfoItem label="Current Address" value={employee.currentAddress} />
            <InfoItem label="Permanent Address" value={employee.permanentAddress} />
          </InfoBox>
          
          {/* Government IDs Box */}
          <InfoBox title="Government IDs">
            <InfoItem label="Aadhaar Number" value={employee.aadhaarNumber} />
            <InfoItem label="PAN Number" value={employee.panNumber} />
          </InfoBox>
          
          
          
          {/* Education - Post Graduation Box (if available) */}
          {employee.education.postGraduation && (
            <InfoBox title="Education - Post Graduation">
              <InfoItem label="Level" value={employee.education.postGraduation.level} />
              <InfoItem label="University" value={employee.education.postGraduation.university} />
              <InfoItem label="Course" value={employee.education.postGraduation.course} />
              <InfoItem label="Specialization" value={employee.education.postGraduation.specialization} />
              <InfoItem label="Year of Passing" value={employee.education.postGraduation.yearOfPassout} />
            </InfoBox>
          )}
          
          {/* Skills Box (if available) */}
          {employee.skills && employee.skills.length > 0 && (
            <InfoBox title="Skills">
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill.name} {skill.level && `(${skill.level})`}
                  </span>
                ))}
              </div>
            </InfoBox>
          )}
          
          {/* Languages Box (if available) */}
          {employee.languages && employee.languages.length > 0 && (
            <InfoBox title="Languages">
              <div className="flex flex-wrap gap-2">
                {employee.languages.map((language, index) => (
                  <span 
                    key={index} 
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </InfoBox>
          )}
        </div>
      </div>
      
      <div className="flex justify-end gap-4 p-6 border-t">
        <button
          type="button"
          onClick={handleDelete}
          className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 active:bg-red-100"
          id="delete-employee-btn"
        >
          Delete Employee
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default EmployeeView;
