"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface EducationDetails {
    level: string;
    university: string;
    course: string;
    specialization: string;
    mode: string;
    yearOfPassout: string;
    skills?: string[];
    certificateFile?: string; // Added for certificate file upload
}

interface GovtIdProof {
    type: string;
    number: string;
    documentFile?: string; // Added for ID document file upload
}

interface EmployeeFormData {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    mobileNumber: string;
    email: string;
    jobRole: string;
    experience: string;
    govtIds: {
        aadhaar: GovtIdProof;
        pan: GovtIdProof;
    };
    education: {
        postGraduation?: EducationDetails;
        graduation: EducationDetails;
    };
    currentAddress: string;
    permanentAddress: string;
    photoUrl: string;
    employeeId: string;
}

interface EmployeeAddProps {
    onClose: () => void;
    onSave: (employee: EmployeeFormData) => void;
}

export default function EmployeeAdd({ onClose, onSave }: EmployeeAddProps) {
    const [formData, setFormData] = useState<EmployeeFormData>({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        mobileNumber: '',
        email: '',
        jobRole: '',
        experience: '',
        govtIds: {
            aadhaar: {
                type: 'Aadhaar',
                number: '',
                documentFile: ''
            },
            pan: {
                type: 'PAN',
                number: '',
                documentFile: ''
            }
        },
        education: {
            graduation: {
                level: 'Graduation',
                university: '',
                course: '',
                specialization: '',
                mode: '',
                yearOfPassout: '',
                certificateFile: ''
            }
        },
        currentAddress: '',
        permanentAddress: '',
        photoUrl: '',
        employeeId: ''
    });

    const [showPostGrad, setShowPostGrad] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [fileNames, setFileNames] = useState({
        graduationCertificate: '',
        postGraduationCertificate: '',
        aadhaarDocument: '',
        panDocument: ''
    });

    const experienceOptions = [
        '0-1 year', '1-2 years', '2-3 years', '3-4 years', '4-5 years',
        '5-6 years', '6-7 years', '7-8 years', '8-9 years', '9-10 years', '10+ years'
    ];

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                setError('Photo size should be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
                setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10000000) { // 10MB limit
                setError(`File size should be less than 10MB`);
                return;
            }

            // Update file name display
            setFileNames(prev => ({
                ...prev,
                [fileType]: file.name
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                const fileData = reader.result as string;
                
                // Update the appropriate state based on file type
                switch(fileType) {
                    case 'graduationCertificate':
                        setFormData(prev => ({
                            ...prev,
                            education: {
                                ...prev.education,
                                graduation: {
                                    ...prev.education.graduation,
                                    certificateFile: fileData
                                }
                            }
                        }));
                        break;
                    case 'postGraduationCertificate':
                        setFormData(prev => {
                            if (prev.education.postGraduation) {
                                return {
                                    ...prev,
                                    education: {
                                        ...prev.education,
                                        postGraduation: {
                                            ...prev.education.postGraduation,
                                            certificateFile: fileData
                                        }
                                    }
                                };
                            }
                            return prev;
                        });
                        break;
                    case 'aadhaarDocument':
                        setFormData(prev => ({
                            ...prev,
                            govtIds: {
                                ...prev.govtIds,
                                aadhaar: {
                                    ...prev.govtIds.aadhaar,
                                    documentFile: fileData
                                }
                            }
                        }));
                        break;
                    case 'panDocument':
                        setFormData(prev => ({
                            ...prev,
                            govtIds: {
                                ...prev.govtIds,
                                pan: {
                                    ...prev.govtIds.pan,
                                    documentFile: fileData
                                }
                            }
                        }));
                        break;
                }
            };            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement validation as needed
        onSave(formData);
    };

    const handleEducationChange = (level: 'graduation' | 'postGraduation', field: keyof EducationDetails, value: string) => {
        setFormData(prev => ({
            ...prev,
            education: {
                ...prev.education,
                [level]: {
                    ...prev.education[level],
                    [field]: value
                }
            }
        }));
    };

    return (
        <div className="fixed inset-0 bg-white overflow-y-auto">
            <div className="p-6 w-full">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Add New Employee</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
                    {/* Left Section - Personal Details */}
                    <div className="col-span-2 space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.middleName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, middleName: e.target.value }))}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender *
                            </label>
                            <div className="flex space-x-4">
                                {['Male', 'Female', 'Others'].map((option) => (
                                    <label key={`gender-${option}`} className="flex items-center text-gray-800">
                                        <input
                                            type="radio"
                                            name="gender"
                                            required
                                            value={option}
                                            checked={formData.gender === option}
                                            onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date of Birth *
                            </label>
                            <input
                                type="date"
                                required
                                value={formData.dateOfBirth}
                                onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                            />
                        </div>

                        {/* Contact Details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile Number *
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={10}
                                    pattern="[0-9]{10}"
                                    value={formData.mobileNumber}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        setFormData(prev => ({ ...prev, mobileNumber: value }));
                                    }}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                />
                            </div>
                        </div>

                        {/* Job Details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Role *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.jobRole}
                                    onChange={(e) => setFormData(prev => ({ ...prev, jobRole: e.target.value }))}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Experience *
                                </label>
                                <select
                                    required
                                    value={formData.experience}
                                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                >
                                    <option value="">Select Experience</option>
                                    {experienceOptions.map(opt => (
                                        <option key={`exp-${opt}`} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* ID Numbers and Documents */}
                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-800">Government ID Proofs</h3>
                            
                            {/* Aadhaar Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Aadhaar Number *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={12}
                                        pattern="[0-9]{12}"
                                        value={formData.govtIds.aadhaar.number}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            setFormData(prev => ({
                                                ...prev,
                                                govtIds: {
                                                    ...prev.govtIds,
                                                    aadhaar: {
                                                        ...prev.govtIds.aadhaar,
                                                        number: value
                                                    }
                                                }
                                            }));
                                        }}
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Aadhaar Document *
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <label className="flex-1 cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-center hover:bg-gray-50">
                                            <span className="text-sm text-gray-600">
                                                {fileNames.aadhaarDocument || "Upload Aadhaar Card"}
                                            </span>
                                            <input
                                                type="file"
                                                required
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileUpload(e, 'aadhaarDocument')}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, JPEG or PNG (Max: 10MB)</p>
                                </div>
                            </div>

                            {/* PAN Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        PAN Number *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={10}
                                        pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                                        value={formData.govtIds.pan.number}
                                        onChange={(e) => {
                                            const value = e.target.value.toUpperCase();
                                            setFormData(prev => ({
                                                ...prev,
                                                govtIds: {
                                                    ...prev.govtIds,
                                                    pan: {
                                                        ...prev.govtIds.pan,
                                                        number: value
                                                    }
                                                }
                                            }));
                                        }}
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        PAN Document *
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <label className="flex-1 cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-center hover:bg-gray-50">
                                            <span className="text-sm text-gray-600">
                                                {fileNames.panDocument || "Upload PAN Card"}
                                            </span>
                                            <input
                                                type="file"
                                                required
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileUpload(e, 'panDocument')}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, JPEG or PNG (Max: 10MB)</p>
                                </div>
                            </div>
                        </div>

                        {/* Education Details */}
                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-800">Education Details</h3>
                            
                            {/* Post Graduation Toggle */}
                            <div>
                                <label className="flex items-center text-gray-800">
                                    <input
                                        type="checkbox"
                                        checked={showPostGrad}
                                        onChange={(e) => setShowPostGrad(e.target.checked)}
                                        className="mr-2"
                                    />
                                    Include Post Graduation Details
                                </label>
                            </div>

                            {showPostGrad && (
                                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-800">Post Graduation Details</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                University/Institute *
                                            </label>
                                            <input
                                                type="text"
                                                required={showPostGrad}
                                                value={formData.education.postGraduation?.university || ''}
                                                onChange={(e) => handleEducationChange('postGraduation', 'university', e.target.value)}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Course *
                                            </label>
                                            <input
                                                type="text"
                                                required={showPostGrad}
                                                value={formData.education.postGraduation?.course || ''}
                                                onChange={(e) => handleEducationChange('postGraduation', 'course', e.target.value)}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Specialization *
                                            </label>
                                            <input
                                                type="text"
                                                required={showPostGrad}
                                                value={formData.education.postGraduation?.specialization || ''}
                                                onChange={(e) => handleEducationChange('postGraduation', 'specialization', e.target.value)}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Mode *
                                            </label>
                                            <select
                                                required={showPostGrad}
                                                value={formData.education.postGraduation?.mode || ''}
                                                onChange={(e) => handleEducationChange('postGraduation', 'mode', e.target.value)}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                            >
                                                <option value="">Select Mode</option>
                                                <option value="Full Time">Full Time</option>
                                                <option value="Part Time">Part Time</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Year of Passout *
                                            </label>
                                            <input
                                                type="text"
                                                required={showPostGrad}
                                                pattern="[0-9]{4}"
                                                maxLength={4}
                                                value={formData.education.postGraduation?.yearOfPassout || ''}
                                                onChange={(e) => handleEducationChange('postGraduation', 'yearOfPassout', e.target.value)}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Certificate/Degree *
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                <label className="flex-1 cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-center hover:bg-gray-50">
                                                    <span className="text-sm text-gray-600">
                                                        {fileNames.postGraduationCertificate || "Upload Certificate"}
                                                    </span>
                                                    <input
                                                        type="file"
                                                        required={showPostGrad}
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        onChange={(e) => handleFileUpload(e, 'postGraduationCertificate')}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">PDF, JPG, JPEG or PNG (Max: 10MB)</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Graduation Details */}
                            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-800">Graduation Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            University/Institute *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.education.graduation.university}
                                            onChange={(e) => handleEducationChange('graduation', 'university', e.target.value)}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Course *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.education.graduation.course}
                                            onChange={(e) => handleEducationChange('graduation', 'course', e.target.value)}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Specialization *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.education.graduation.specialization}
                                            onChange={(e) => handleEducationChange('graduation', 'specialization', e.target.value)}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mode *
                                        </label>
                                        <select
                                            required
                                            value={formData.education.graduation.mode}
                                            onChange={(e) => handleEducationChange('graduation', 'mode', e.target.value)}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                        >
                                            <option value="">Select Mode</option>
                                            <option value="Full Time">Full Time</option>
                                            <option value="Part Time">Part Time</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Year of Passout *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            pattern="[0-9]{4}"
                                            maxLength={4}
                                            value={formData.education.graduation.yearOfPassout}
                                            onChange={(e) => handleEducationChange('graduation', 'yearOfPassout', e.target.value)}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Certificate/Degree *
                                        </label>
                                        <div className="flex items-center space-x-2">
                                            <label className="flex-1 cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-center hover:bg-gray-50">
                                                <span className="text-sm text-gray-600">
                                                    {fileNames.graduationCertificate || "Upload Certificate"}
                                                </span>
                                                <input
                                                    type="file"
                                                    required
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => handleFileUpload(e, 'graduationCertificate')}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">PDF, JPG, JPEG or PNG (Max: 10MB)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Details */}
                                                {/* Address Details */}
                                                <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Address *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.currentAddress}
                                    onChange={(e) => setFormData(prev => ({ ...prev, currentAddress: e.target.value }))}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Permanent Address *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.permanentAddress}
                                    onChange={(e) => setFormData(prev => ({ ...prev, permanentAddress: e.target.value }))}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Photo Upload */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Passport Size Photo *
                            </label>
                            <div className="flex flex-col items-center space-y-2">
                                <div className="w-40 h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                                    {photoPreview ? (
                                        <img
                                            src={photoPreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center p-4 text-gray-500">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <p className="mt-1 text-sm">Upload photo</p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    required
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="w-full text-sm text-gray-700"
                                />
                                <p className="text-xs text-gray-500">Max size: 5MB</p>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">Document Upload Guidelines</h4>
                            <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
                                <li>All documents should be clear and legible</li>
                                <li>Supported formats: PDF, JPG, JPEG, PNG</li>
                                <li>Maximum file size: 10MB per document</li>
                                <li>Ensure all text in documents is clearly visible</li>
                                <li>Color scans are preferred for government IDs</li>
                            </ul>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="col-span-3 bg-red-50 text-red-600 p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="col-span-3 flex justify-end space-x-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

 
