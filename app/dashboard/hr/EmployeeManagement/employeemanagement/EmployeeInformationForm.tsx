import React, { useState } from "react";

interface Employee {
    _id: string;
    name: string;
    role?: string;
    location?: string;
    email?: string;
    phone?: string;
    experience?: number;
    education?: string;
    languages?: string[];
    skills?: string[];
    image_url?: string;
    match?: number;
}

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (employee: Employee) => void;
  onCancel?: () => void;
}

const EmployeeInformationForm: React.FC<EmployeeFormProps> = ({ 
  employee, 
  onSubmit,
  onCancel
}) => {

  const defaultEmployee: Employee = {
    _id: "",
    name: "",
    role: "",
    location: "",
    email: "",
    phone: "",
    experience: 0,
    education: "",
    languages: [],
    skills: [],
    image_url: "",
  };

  const [formData, setFormData] = useState<Employee>(employee || defaultEmployee);
  const [profileImage, setProfileImage] = useState<string>(employee?.image_url || "");
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfileImage(reader.result);
          setFormData(prev => ({
            ...prev,
            image_url: reader.result as string
          }));
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold border-b-2 border-gray-800 pb-1"></h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile Photo Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Employee Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl text-gray-400">
                    {formData.name ? formData.name.charAt(0) : "?"}
                  </span>
                </div>
              )}
            </div>
            <label 
              htmlFor="profile-upload" 
              className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors"
            >
              {isUploading ? (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              )}
              <input 
                id="profile-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload} 
              />
            </label>
          </div>
        </div>

        {/* Name */}
        <div className="mb-6">
          <div className="text-sm text-gray-600">Name</div>
          <div className="grid gap-4">
            <div>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Role */}
        <div className="mb-6">
          <div className="text-sm text-gray-600">Role</div>
          <div className="grid gap-4">
            <div>
              <input 
                type="text" 
                name="role" 
                value={formData.role || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <div className="text-sm text-gray-600">Location</div>
          <div className="grid gap-4">
            <div>
              <input 
                type="text" 
                name="location" 
                value={formData.location || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <div className="text-sm text-gray-600">Phone</div>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <div className="text-sm text-gray-600">Email</div>
            <input 
              type="email" 
              name="email" 
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>    

        {/* Experience */}
        <div className="mb-6">
          <div className="text-sm text-gray-600">Experience (years)</div>
          <div className="grid gap-4">
            <div>
              <input 
                type="number" 
                name="experience" 
                value={formData.experience || 0}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <div className="text-sm text-gray-600">Education</div>
          <div className="grid gap-4">
            <div>
              <input 
                type="text" 
                name="education" 
                value={formData.education || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 mt-6">
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel} 
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
          
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeInformationForm;
