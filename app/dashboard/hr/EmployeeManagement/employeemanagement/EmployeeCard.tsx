// employeemanagement/EmployeeCard.tsx
import { FC } from 'react';

interface Skill {
  name: string;
  level?: string;
}

interface EducationDetails {
  level: string;
  university: string;
  course: string;
  specialization: string;
  mode: string;
  yearOfPassout: string;
  skills?: string[];
}

interface Employee {
  employeeId: string;
  firstName: string;
  middleName?: string;
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

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
  onDelete: () => void;
}

const EmployeeCard: FC<EmployeeCardProps> = ({ employee, onClick, onDelete }) => {
  // Add null checks to prevent the charAt error
  const firstName = employee?.firstName || '';
  const lastName = employee?.lastName || '';
  
  // Safely create the initials
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  
  // Handle delete button click
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click action
    onDelete();
  };

  // Handle view profile button click
  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Not strictly necessary since it's the same action as card click
    onClick();
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
          {initials}
        </div>
        <div>
          <h3 className="font-semibold text-lg">
            {employee.firstName} {employee.middleName ? employee.middleName + ' ' : ''}{employee.lastName}
          </h3>
          <p className="text-gray-600">{employee.jobRole}</p>
          <p className="text-sm text-gray-500">{employee.department || 'Department not specified'}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span className="text-sm truncate">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <span className="text-sm">{employee.mobileNumber}</span>
          </div>
          {employee.location && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span className="text-sm">{employee.location}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
          employee.employeeType === 'Full-time' ? 'bg-green-100 text-green-800' :
          employee.employeeType === 'Part-time' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {employee.employeeType}
        </span>
        
        <div className="flex gap-2">
          <button 
            onClick={handleDelete}
            className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm"
          >
            Delete
          </button>
          <button 
            onClick={handleViewProfile}
            className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors text-sm"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;