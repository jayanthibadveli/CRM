"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, CheckCircle, XCircle } from 'lucide-react';

interface OnboardingFormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  educationalInfo: {
    highestQualification: string;
    institution: string;
    yearOfPassing: string;
    specialization: string;
  };
  bankingInfo: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    accountHolderName: string;
  };
  documents: {
    aadhar: File | null;
    pan: File | null;
    resume: File | null;
    certificates: File[];
  };
  termsAccepted: boolean;
}

export default function EmployeeOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
    educationalInfo: {
      highestQualification: '',
      institution: '',
      yearOfPassing: '',
      specialization: '',
    },
    bankingInfo: {
      accountNumber: '',
      bankName: '',
      ifscCode: '',
      accountHolderName: '',
    },
    documents: {
      aadhar: null,
      pan: null,
      resume: null,
      certificates: [],
    },
    termsAccepted: false,
  });

  const [uploadStatus, setUploadStatus] = useState<{
    [key: string]: 'idle' | 'uploading' | 'success' | 'error';
  }>({
    aadhar: 'idle',
    pan: 'idle',
    resume: 'idle',
    certificates: 'idle',
  });

  const handleFileUpload = async (file: File, type: string) => {
    setUploadStatus(prev => ({ ...prev, [type]: 'uploading' }));
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [type]: file,
        },
      }));
      setUploadStatus(prev => ({ ...prev, [type]: 'success' }));
    } catch (error) {
      setUploadStatus(prev => ({ ...prev, [type]: 'error' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // Redirect to success page or dashboard
    router.push('/dashboard/hr');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-black">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black">First Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Last Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                  }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                value={formData.personalInfo.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, email: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                value={formData.personalInfo.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, phone: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Address</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                rows={3}
                value={formData.personalInfo.address}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, address: e.target.value }
                }))}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-black">Educational Information</h3>
            <div>
              <label className="block text-sm font-medium text-black">Highest Qualification</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                value={formData.educationalInfo.highestQualification}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  educationalInfo: { ...prev.educationalInfo, highestQualification: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Institution</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                value={formData.educationalInfo.institution}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  educationalInfo: { ...prev.educationalInfo, institution: e.target.value }
                }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black">Year of Passing</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                  value={formData.educationalInfo.yearOfPassing}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    educationalInfo: { ...prev.educationalInfo, yearOfPassing: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Specialization</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                  value={formData.educationalInfo.specialization}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    educationalInfo: { ...prev.educationalInfo, specialization: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-black">Banking Information (Optional)</h3>
            <div>
              <label className="block text-sm font-medium text-black">Account Number</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                value={formData.bankingInfo.accountNumber}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  bankingInfo: { ...prev.bankingInfo, accountNumber: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Bank Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                value={formData.bankingInfo.bankName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  bankingInfo: { ...prev.bankingInfo, bankName: e.target.value }
                }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black">IFSC Code</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                  value={formData.bankingInfo.ifscCode}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bankingInfo: { ...prev.bankingInfo, ifscCode: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Account Holder Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                  value={formData.bankingInfo.accountHolderName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bankingInfo: { ...prev.bankingInfo, accountHolderName: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4 text-black">Document Upload</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="aadhar"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'aadhar')}
                />
                <label htmlFor="aadhar" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-black" />
                  <p className="mt-2 text-sm text-black">Upload Aadhar Card</p>
                  {uploadStatus.aadhar === 'success' && <CheckCircle className="mx-auto h-6 w-6 text-green-500 mt-2" />}
                  {uploadStatus.aadhar === 'error' && <XCircle className="mx-auto h-6 w-6 text-red-500 mt-2" />}
                </label>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="pan"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'pan')}
                />
                <label htmlFor="pan" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-black" />
                  <p className="mt-2 text-sm text-black">Upload PAN Card</p>
                  {uploadStatus.pan === 'success' && <CheckCircle className="mx-auto h-6 w-6 text-green-500 mt-2" />}
                  {uploadStatus.pan === 'error' && <XCircle className="mx-auto h-6 w-6 text-red-500 mt-2" />}
                </label>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="resume"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'resume')}
                />
                <label htmlFor="resume" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-black" />
                  <p className="mt-2 text-sm text-black">Upload Resume</p>
                  {uploadStatus.resume === 'success' && <CheckCircle className="mx-auto h-6 w-6 text-green-500 mt-2" />}
                  {uploadStatus.resume === 'error' && <XCircle className="mx-auto h-6 w-6 text-red-500 mt-2" />}
                </label>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="certificates"
                  className="hidden"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    files.forEach(file => handleFileUpload(file, 'certificates'));
                  }}
                />
                <label htmlFor="certificates" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-black" />
                  <p className="mt-2 text-sm text-black">Upload Certificates</p>
                  {uploadStatus.certificates === 'success' && <CheckCircle className="mx-auto h-6 w-6 text-green-500 mt-2" />}
                  {uploadStatus.certificates === 'error' && <XCircle className="mx-auto h-6 w-6 text-red-500 mt-2" />}
                </label>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-black">Terms and Conditions</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-black mb-4">
                By accepting these terms and conditions, you confirm that all the information provided is accurate and complete.
                You understand that any false or misleading information may result in termination of employment.
              </p>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    termsAccepted: e.target.checked
                  }))}
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-black">
                  I accept the terms and conditions
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8 text-black">Employee Onboarding</h1>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {step}
              </div>
              {step < 5 && (
                <div
                  className={`w-24 h-1 ${
                    currentStep > step ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStep()}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-50"
            >
              Previous
            </button>
          )}
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={!formData.termsAccepted}
              className={`px-4 py-2 rounded-md ${
                formData.termsAccepted
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-black cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}