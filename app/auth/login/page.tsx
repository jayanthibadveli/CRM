"use client";
import React, { useState, useEffect } from "react";
import { useAuth, SAMPLE_USERS } from "@/context/AuthContext";

// Adding TypeScript interfaces
interface FormDataType {
  empId: string;
  password: string;
  confirmPassword: string;
}

interface MessageType {
  text: string;
  type: string;
}

interface ErrorsType {
  [key: string]: string;
}

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  error?: string;
  noLabel?: boolean;
  required?: boolean;
}

const AuthForm: React.FC = () => {
  const { login, sendVerificationCode, verifyCode, resetPassword } = useAuth();
  const [mode, setMode] = useState<"login" | "forgot" | "verify" | "reset">("login");
  const [formData, setFormData] = useState<FormDataType>({
    empId: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [message, setMessage] = useState<MessageType>({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorsType>({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showStrength, setShowStrength] = useState(false);
  const [showSampleCredentials, setShowSampleCredentials] = useState(false);

  // Load message from localStorage if present
  useEffect(() => {
    const storedMessage = localStorage.getItem('authMessage');
    if (storedMessage) {
      try {
        setMessage(JSON.parse(storedMessage));
      } catch (error) {
        console.error("Failed to parse stored message", error);
        localStorage.removeItem('authMessage');
      }
    }
  }, []);

  // Clear message after display
  useEffect(() => {
    if (message.text) {
      localStorage.setItem('authMessage', JSON.stringify(message));
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
        localStorage.removeItem('authMessage');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Reset errors and messages when mode changes
  useEffect(() => {
    setErrors({});
    setMessage({ text: "", type: "" });
    localStorage.removeItem('authMessage');
  }, [mode]);

  const validateEmpId = (empId: string): boolean => {
    // Accept any of our valid ID formats
    return /^(admin-|mgr-|hr-|emp-)\d{3}$/i.test(empId);
  };

  const checkPasswordStrength = (password: string): string => {
    if (!password) return "";
    if (password.length < 6) return "Password must be at least 6 characters";
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (hasLetter && hasNumber && hasSpecialChar) return "Strong password";
    if ((hasLetter && hasNumber) || (hasLetter && hasSpecialChar) || (hasNumber && hasSpecialChar)) 
      return "Medium password";
    return "Weak password";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
      setShowStrength(value.length > 0);
    }
    
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateForm = (): ErrorsType => {
    const newErrors: ErrorsType = {};
    
    // Simplified login validation - just check if fields are filled
    if (mode === "login") {
      if (!formData.empId.trim()) newErrors.empId = "Employee ID is required";
      if (!formData.password) newErrors.password = "Password is required";
      else if (!validateEmpId(formData.empId)) newErrors.empId = "Invalid ID format";
    }
    
    if (mode === "forgot") {
      if (!formData.empId.trim()) newErrors.empId = "Employee ID is required";
      else if (!validateEmpId(formData.empId)) newErrors.empId = "Invalid ID format";
    }
    
    if (mode === "reset") {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    if (mode === "verify" && !otp.trim()) newErrors.otp = "Verification code is required";
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setMessage({ text: "Please fix all errors in the form", type: "error" });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (mode === "login") {
        await login(formData.empId, formData.password);
        setMessage({ text: `Login successful! Redirecting...`, type: "success" });
      } 
      else if (mode === "verify") {
        const success = await verifyCode(otp, generatedOtp);
        
        if (success) {
          setMessage({ text: "Verification successful!", type: "success" });
          setTimeout(() => {
            setMode("reset");
            setOtp("");
          }, 1000);
        } else {
          setErrors({ otp: "Invalid verification code" });
          setMessage({ text: "Invalid verification code", type: "error" });
        }
      } 
      else if (mode === "reset") {
        const success = await resetPassword(formData.empId, formData.password);
        
        if (success) {
          setMessage({ text: "Password updated successfully!", type: "success" });
          setTimeout(() => {
            setMode("login");
            setFormData({
              empId: "",
              password: "",
              confirmPassword: "",
            });
          }, 1000);
        } else {
          setMessage({ text: "Failed to reset password", type: "error" });
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setMessage({ text: "Invalid credentials. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (): Promise<void> => {
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setMessage({ text: "Please fix the errors in the form", type: "error" });
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await sendVerificationCode(formData.empId);
      
      if (!success) {
        setErrors({ empId: "Employee ID not registered" });
        setMessage({ text: "Employee ID not registered", type: "error" });
        setIsLoading(false);
        return;
      }
      
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      
      setMode("verify");
      setMessage({ 
        text: `Verification code sent to your registered contact method`, 
        type: "success" 
      });
    } catch (error) {
      setMessage({ text: "Failed to send verification code", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      setOtp("");
      
      setMessage({ 
        text: `New verification code sent`, 
        type: "success" 
      });
    } catch (error) {
      setMessage({ text: "Failed to send new verification code", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const getFormTitle = (): string => {
    const titles = {
      login: "Login",
      forgot: "Forgot Password",
      verify: "Verify Identity",
      reset: "New Password",
    };
    return titles[mode];
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-normal text-gray-900 mb-3">
            {getFormTitle()}
          </h1>
          
          {message.text && (
            <div
              className={`p-3 rounded text-base mb-2 ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : message.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(mode === "login" || mode === "forgot") && (
            <FormField
              label="Employee ID"
              type="text"
              name="empId"
              value={formData.empId}
              onChange={handleChange}
              placeholder="Enter your ID (e.g., admin-001, mgr-001)"
              error={errors.empId}
              required
            />
          )}

          {mode === "verify" && (
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">
                Verification Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className={`w-full px-4 py-3 border ${errors.otp ? 'border-red-300' : 'border-blue-500'} rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-base text-gray-900`}
                placeholder="Enter 6-digit code"
                required
              />
              {errors.otp && (
                <p className="text-sm text-red-600 mt-1">{errors.otp}</p>
              )}
              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Resend Code
                </button>
                <div className="text-xs text-gray-400">
                  Code: {generatedOtp}
                </div>
              </div>
            </div>
          )}

          {(mode === "login" || mode === "reset") && (
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">
                {mode === "reset" ? "New Password" : "Password"} <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.password ? 'border-red-300' : 'border-blue-500'} rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-base text-gray-900`}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password}
                </p>
              )}
              {showStrength && formData.password && (
                <p className={`text-sm mt-1 ${
                  passwordStrength.includes("Weak") ? "text-yellow-600" :
                  passwordStrength.includes("Medium") ? "text-blue-600" :
                  passwordStrength.includes("Strong") ? "text-green-600" :
                  "text-red-600"
                }`}>
                  {passwordStrength}
                </p>
              )}
              
              {mode === "login" && (
                <div className="flex justify-between mt-1">
                  <button
                    type="button"
                    onClick={() => setShowSampleCredentials(!showSampleCredentials)}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    {showSampleCredentials ? "Hide" : "Show"} sample credentials
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot");
                      setFormData({
                        empId: "",
                        password: "",
                        confirmPassword: "",
                      });
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </div>
          )}

          {mode === "reset" && (
            <FormField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              error={errors.confirmPassword}
              required
            />
          )}

          {showSampleCredentials && mode === "login" && (
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-sm">
              <p className="font-semibold mb-2 text-gray-700">Sample Credentials:</p>
              <ul className="space-y-1 text-gray-600">
                {SAMPLE_USERS.map((user, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}:</span>
                    <span className="font-mono">{user.empId} / {user.password}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-2">
            {mode === "forgot" ? (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white text-base rounded hover:bg-blue-700 disabled:opacity-70 transition-colors duration-200"
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white text-base rounded hover:bg-blue-700 disabled:opacity-70 transition-colors duration-200"
              >
                {isLoading
                  ? "Processing..."
                  : {
                      login: "Login",
                      verify: "Verify",
                      reset: "Reset Password",
                    }[mode]}
              </button>
            )}
          </div>

          {mode !== "login" && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setFormData({
                    empId: "",
                    password: "",
                    confirmPassword: "",
                  });
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                Back to Login
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  type, 
  name, 
  value, 
  onChange, 
  placeholder, 
  maxLength, 
  error,
  noLabel = false,
  required = false
}) => (
  <div>
    {!noLabel && (
      <label className="block text-base font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border ${error ? 'border-red-300' : 'border-blue-500'} rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-base text-gray-900`}
      placeholder={placeholder}
      maxLength={maxLength}
      required={required}
    />
    {error && (
      <p className="text-sm text-red-600 mt-1">{error}</p>
    )}
  </div>
);

export default AuthForm;