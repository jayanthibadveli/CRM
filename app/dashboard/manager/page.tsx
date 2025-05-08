"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icons, helpMenuItems, profileMenuItems } from '@/app/dashboard/manager/utilis/index';
// import { EnhancedIcons } from '@/utilis/EnhancedIcons'; // Ensure this file exists or update the path
const EmployeeDashboard: React.FC = () => {
  const router = useRouter();
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  // State for form data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [profileData, setProfileData] = useState({
    name: 'Madhavi Chilukala',
    email: 'Madhavi@genailakes.com',
    phone: '123-456-7890',
    department: 'Software Engineering'
  });
  
  const helpMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  
  const handleProfileAction = (path: string) => {
    console.log(`Profile action: ${path}`);
    setProfileMenuOpen(false);
    if (path === '/profile/change-password') {
      setShowChangePasswordModal(true);
    } else if (path === '/profile/edit') {
      setShowEditProfileModal(true);
    } else if (path === '/logout') {
      handleLogout();
    }
  };
   // Handle password change
   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle profile data change
  const handleProfileDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Save password changes
  const savePasswordChanges = () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      alert("All fields are required!");
      return;
    }
    
    // In a real app, you would call an API to update the password
    console.log("Password changed successfully", passwordData);
    alert("Password changed successfully!");
    
    // Reset form and close modal
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowChangePasswordModal(false);
  };
  
  // Save profile changes
  const saveProfileChanges = () => {
    // In a real app, you would call an API to update the profile
    console.log("Profile updated successfully", profileData);
    alert("Profile updated successfully!");
    setShowEditProfileModal(false);
  };
  
  // Handle logout
  const handleLogout = () => {
    // In a real app, you would clear auth tokens, cookies, etc.
    console.log("Logging out...");
    alert("You have been logged out successfully!");
    
    // Redirect to login page
    window.location.href = '/login';
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (helpMenuRef.current && !helpMenuRef.current.contains(event.target as Node)) {
        setHelpMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowChangePasswordModal(false);
        setShowEditProfileModal(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Static notifications data
  const notifications = [
    {
      id: 1,
      type: 'leave',
      title: 'Leave Approval',
      message: 'Your leave request for Jun 15-17 has been approved',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'Sanjay Kumar sent you a message regarding Project Alpha',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'system',
      title: 'System Update',
      message: 'The HR portal will be down for maintenance tonight from 10 PM to 2 AM',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'leave',
      title: 'Leave Request',
      message: 'You need to approve Ritu Sharma\'s leave request',
      time: 'Yesterday',
      read: true
    },
    {
      id: 5,
      type: 'message',
      title: 'Meeting Reminder',
      message: 'Weekly team meeting tomorrow at 10:00 AM in Conference Room B',
      time: 'Yesterday',
      read: true
    },
    {
      id: 6,
      type: 'payment',
      title: 'Payment Due',
      message: 'Your project milestone payment of ₹25,000 is due in 3 days',
      time: '2 days ago',
      read: true
    },
    {
      id: 7,
      type: 'meeting',
      title: 'New Meeting',
      message: 'Product roadmap discussion scheduled for Friday at 2:00 PM',
      time: '2 days ago',
      read: false
    },
    {
      id: 8,
      type: 'payment',
      title: 'Salary Credited',
      message: 'Your monthly salary has been credited to your bank account',
      time: '4 days ago',
      read: true
    },
    {
      id: 9,
      type: 'meeting',
      title: 'Client Meeting',
      message: 'Online meeting with Infosys client scheduled for tomorrow at 11:00 AM',
      time: '5 days ago',
      read: true
    }
  ];

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortedNotifications, setSortedNotifications] = useState(notifications);

  useEffect(() => {
    if (activeFilter === 'all') {
      setSortedNotifications(notifications);
    } else {
      setSortedNotifications(notifications.filter(notification => notification.type === activeFilter));
    }
  }, [activeFilter]);

  // Function to get the appropriate icon for each notification type
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'leave':
        return <div className="rounded-full bg-indigo-100 p-2 text-indigo-600"><Icons.Calendar /></div>;
      case 'message':
        return <div className="rounded-full bg-green-100 p-2 text-green-600"><Icons.Message /></div>;
      case 'system':
        return <div className="rounded-full bg-amber-100 p-2 text-amber-600"><Icons.Bell /></div>;
      case 'payment':
        return <div className="rounded-full bg-purple-100 p-2 text-purple-600"><Icons.DollarSign /></div>;
      case 'meeting':
        return <div className="rounded-full bg-blue-100 p-2 text-blue-600"><Icons.Clock /></div>;
      default:
        return <div className="rounded-full bg-gray-100 p-2 text-gray-600"><Icons.Bell /></div>;
    }
  };

  // Filter buttons for notification types
  const filterOptions = [
    { key: 'all', label: 'All', count: notifications.length },
    { key: 'leave', label: 'Leave Approvals', count: notifications.filter(n => n.type === 'leave').length },
    { key: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { key: 'payment', label: 'Payments', count: notifications.filter(n => n.type === 'payment').length },
    { key: 'meeting', label: 'Meetings', count: notifications.filter(n => n.type === 'meeting').length },
    { key: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
  ];

  // Sample projects data
  const projects = [
    {
      id: 1,
      name: "Project Alpha",
      description: "Enterprise Resource Planning System",
      status: "In Progress",
      members: [
        { name: "Madhavi Chilukala", role: "Project Manager" },
        { name: "Rahul Sharma", role: "Senior Developer" },
        { name: "Priya Patel", role: "UI/UX Designer" },
        { name: "Amit Kumar", role: "Backend Developer" }
      ]
    },
    {
      id: 2,
      name: "Project Beta",
      description: "Customer Relationship Management",
      status: "Planning",
      members: [
        { name: "Suresh Reddy", role: "Tech Lead" },
        { name: "Anjali Gupta", role: "Frontend Developer" },
        { name: "Vikram Singh", role: "Database Engineer" }
      ]
    },
    {
      id: 3,
      name: "Project Gamma",
      description: "Mobile App Development",
      status: "Completed",
      members: [
        { name: "Neha Verma", role: "Mobile Developer" },
        { name: "Rajesh Kumar", role: "QA Engineer" },
        { name: "Pooja Sharma", role: "UI Designer" }
      ]
    },
    {
      id: 4,
      name: "Project Delta",
      description: "Cloud Migration Project",
      status: "In Progress",
      members: [
        { name: "Arun Singh", role: "Cloud Architect" },
        { name: "Meera Patel", role: "DevOps Engineer" },
        { name: "Kiran Reddy", role: "System Administrator" }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome to <span className="text-indigo-600">GenAILakes</span> Pvt Ltd
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative" ref={notificationsRef}>
              <button 
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Icons.Bell />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-10 overflow-hidden border border-gray-200">
                  <div className="py-3 px-4 bg-indigo-50 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-indigo-800 font-medium">Notifications</h3>
                    <div className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                      {notifications.filter(n => !n.read).length} new
                    </div>
                  </div>
                  
                  {/* Notification filters */}
                  <div className="flex overflow-x-auto bg-gray-50 border-b border-gray-200 px-1 py-1 gap-1 scrollbar-hide">
                    {filterOptions.map(option => (
                      <button 
                        key={option.key}
                        onClick={() => setActiveFilter(option.key)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap flex items-center ${
                          activeFilter === option.key 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {option.label}
                        <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                          activeFilter === option.key 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {option.count}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                    {sortedNotifications.length > 0 ? (
                      sortedNotifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-4 hover:bg-gray-50 transition-colors flex ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <div className="mr-3 flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className={`text-sm font-medium ${!notification.read ? 'text-indigo-800' : 'text-gray-800'}`}>
                                {notification.title}
                              </h4>
                              <span className="text-xs text-gray-500 ml-2">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications in this category
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                    <button className="text-gray-500 text-xs hover:text-gray-700 transition-colors">
                      Mark all as read
                    </button>
                    <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors">
                      View all
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Help Menu */}
            <div className="relative" ref={helpMenuRef}>
              <button 
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors flex items-center"
                onClick={() => setHelpMenuOpen(!helpMenuOpen)}
              >
                <Icons.Help />
              </button>
              
              {helpMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-10 overflow-hidden border border-gray-200">
                  <div className="py-3 px-4 bg-indigo-50 border-b border-gray-200">
                    <h3 className="text-indigo-800 font-medium">Support & Resources</h3>
                  </div>
                  <div className="py-2">
                  {helpMenuItems.map((item) => (
                      <a
                        key={item.id}
                        href={item.path}
                        onClick={(e) => {
                          e.preventDefault();
                          setHelpMenuOpen(false);
                          router.push(item.path);
                        }}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors"
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.title}</span>
                      </a>
                    ))}
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <a href="#" className="text-indigo-600 text-sm flex items-center">
                      <span>Contact IT Support</span>
                      <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* User Profile Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button 
                className="flex items-center p-2 rounded-full border border-gray-300 hover:border-indigo-400 transition-colors"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                  <Icons.User />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">Madhavi Chilkula</span>
                <span className="ml-1 text-gray-500">
                  <Icons.ChevronDown />
                </span>
              </button>
              
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-10 overflow-hidden border border-gray-200">
                  <div className="py-4 px-4 bg-indigo-600 text-white">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-3">
                        <div className="text-indigo-600">
                          <Icons.User />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">Madhavi Chilkula</h3>
                        <p className="text-indigo-200 text-sm">Software Engineer</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    {profileMenuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleProfileAction(item.path)}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors text-left"
                      >
                        <span className={`mr-3 ${item.id === 'editProfile' ? 'text-indigo-600' : 'text-gray-500'}`}>
                          {item.icon}
                        </span>
                        <span className={item.id === 'editProfile' ? 'text-indigo-600 font-medium' : ''}>
                          {item.title}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="text-xs text-gray-500 flex items-center">
                      <span>Last login: Today, 9:32 AM</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-indigo-100 text-indigo-600 mr-4">
              <Icons.Calendar />
            </div>
            <div>
              <p className="text-sm text-gray-500">Leave Balance</p>
              <p className="text-xl font-semibold">12 days</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => setShowProjectsModal(true)}>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-purple-100 text-purple-600 mr-4">
              <Icons.Briefcase />
            </div>
            <div>
              <p className="text-sm text-gray-500">Projects</p>
              <p className="text-xl font-semibold">4 active</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-amber-100 text-amber-600 mr-4">
              <Icons.Clock />
            </div>
            <div>
              <p className="text-sm text-gray-500">Hours Logged</p>
              <p className="text-xl font-semibold">32 hrs</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-lg shadow-lg p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16"></div>
            
            <div className="flex items-center relative z-10">
              <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center mr-4 shadow-lg border-4 border-indigo-300">
                <div className="text-indigo-600 h-10 w-10">
                  <Icons.User />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">Madhavi Chilukala</h2>
                <p className="text-indigo-200">Employee ID: 19204</p>
                <p className="text-indigo-200">Joined: 01-04-2023</p>
                <div className="mt-2 bg-indigo-700 rounded-full px-3 py-1 text-xs inline-flex items-center">
                  <span>Reporting to: CSR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-md z-50 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6 mt-20">
            <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200" ref={modalRef}>
              <div className="flex justify-between items-center mb-6 pb-3 border-b">
                <h3 className="text-2xl font-semibold text-gray-800">Change Password</h3>
                <button 
                  onClick={() => setShowChangePasswordModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your current password"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-8 pt-4 space-x-4 border-t">
                <button
                  onClick={() => setShowChangePasswordModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={savePasswordChanges}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-md z-50 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6 mt-20">
            <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200" ref={modalRef}>
              <div className="flex justify-between items-center mb-6 pb-3 border-b">
                <h3 className="text-2xl font-semibold text-gray-800">Edit Profile</h3>
                <button 
                  onClick={() => setShowEditProfileModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileDataChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileDataChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileDataChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={profileData.department}
                    onChange={handleProfileDataChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-8 pt-4 space-x-4 border-t">
                <button
                  onClick={() => setShowEditProfileModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProfileChanges}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Modal */}
      {showProjectsModal && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-md z-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 mt-20">
            <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200" ref={modalRef}>
              <div className="flex justify-between items-center mb-6 pb-3 border-b">
                <h3 className="text-2xl font-semibold text-gray-800">Active Projects</h3>
                <button 
                  onClick={() => {
                    setShowProjectsModal(false);
                    setSelectedProject(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedProject === project.name
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedProject(project.name)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{project.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {selectedProject && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Team Members - {selectedProject}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.find(p => p.name === selectedProject)?.members.map((member, index) => (
                      <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          <span className="text-indigo-600 font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;

 