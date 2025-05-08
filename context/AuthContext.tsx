"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define user roles
export type UserRole = 'admin' | 'manager' | 'employee' | 'hr';

// Define user type
export interface User {
  empId: string;
  name?: string;
  role: UserRole;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (empId: string, password: string) => Promise<void>;
  logout: () => void;
  sendVerificationCode: (empId: string) => Promise<boolean>;
  verifyCode: (otp: string, generatedOtp: string) => Promise<boolean>;
  resetPassword: (empId: string, password: string) => Promise<boolean>;
}

// Sample user data with credentials for each role
export const SAMPLE_USERS = [
  { empId: 'admin-001', password: 'Admin@123', name: 'Admin User', role: 'admin' as UserRole },
  { empId: 'mgr-001', password: 'Manager@123', name: 'Manager User', role: 'manager' as UserRole },
  { empId: 'hr-001', password: 'HR@123', name: 'HR User', role: 'hr' as UserRole },
  { empId: 'emp-001', password: 'Employee@123', name: 'Employee User', role: 'employee' as UserRole }
];

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing user session on mount
  useEffect(() => {
    const checkUserSession = () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          // In a real application, you would validate the session with the server
          // For this example, we'll just use the stored user
          
          // Determine role based on empId prefix
          let role: UserRole = 'employee'; // Default role
          
          if (parsedUser.empId.startsWith('admin-')) {
            role = 'admin';
          } else if (parsedUser.empId.startsWith('mgr-')) {
            role = 'manager';
          } else if (parsedUser.empId.startsWith('hr-')) {
            role = 'hr';
          } else if (parsedUser.empId.startsWith('emp-')) {
            role = 'employee';
          }
          
          setUser({ ...parsedUser, role });
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
        localStorage.removeItem('currentUser');
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // Login function
  const login = async (empId: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // In a real app, you would validate credentials with your backend
      // For this demo, we'll simulate with our sample users
      const foundUser = SAMPLE_USERS.find(
        user => user.empId.toLowerCase() === empId.toLowerCase() && user.password === password
      );
      
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }
      
      // Set user in state and localStorage
      setUser({
        empId: foundUser.empId,
        name: foundUser.name,
        role: foundUser.role as UserRole
      });
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      
      // Redirect based on role
      switch (foundUser.role) {
        case 'admin':
          router.push('/dashboard/admin');
          break;
        case 'manager':
          router.push('/dashboard/manager');
          break;
        case 'hr':
          router.push('/dashboard/hr');
          break;
        case 'employee':
          router.push('/dashboard/employee');
          break;
        default:
          router.push('/dashboard/employee');
      }
      
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('currentUser');
    router.push('/auth/login');
  };
  
  // Send verification code
  const sendVerificationCode = async (empId: string): Promise<boolean> => {
    try {
      // Check if user exists in our sample users
      const userExists = SAMPLE_USERS.some(
        user => user.empId.toLowerCase() === empId.toLowerCase()
      );
      
      if (!userExists) {
        return false;
      }
      
      // In a real app, you would send an actual verification code
      return true;
    } catch (error) {
      console.error("Error sending verification code:", error);
      return false;
    }
  };
  
  // Verify OTP code
  const verifyCode = async (otp: string, generatedOtp: string): Promise<boolean> => {
    return otp === generatedOtp;
  };
  
  // Reset password
  const resetPassword = async (empId: string, password: string): Promise<boolean> => {
    try {
      // In a real app, you would update the password in your database
      // For this demo, we'll just log it
      console.log(`Password reset for ${empId} to: ${password}`);
      return true;
    } catch (error) {
      console.error("Error resetting password:", error);
      return false;
    }
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      sendVerificationCode,
      verifyCode,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;