"use client";
import { useState, useEffect, useRef } from "react";
import {CheckCircle, ListFilter } from 'lucide-react';

// Sample data for approval history with team members
const initialSampleData = [
  {
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    From: '2025-03-10',
    To: '2025-03-12',
    noOfDays: 3,
    status: 'Approved',
    assignedTo: 'Manager A',
    reason: 'Regular work',
    workType: 'Work from Home',
    leaveType: '',
    checkInTime: '09:00:00 AM',
    checkOutTime: '05:30:00 PM',
    isTeamMember: true
  },
  {
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    From: '2025-03-15',
    To: '2025-03-15',
    noOfDays: 1,
    status: 'Pending',
    assignedTo: 'Manager B',
    reason: 'Regular work',
    workType: 'Work from Office',
    checkInTime: '09:30:00 AM',
    checkOutTime: '05:30:00 PM',
    isTeamMember: true
  },
  {
    employeeId: 'EMP003',
    employeeName: 'Robert Johnson',
    From: '2025-03-20',
    To: '2025-03-22',
    noOfDays: 3,
    status: 'Approved',
    assignedTo: 'Manager A',
    reason: 'Vacation',
    workType: 'Leave',
    isTeamMember: true
  },
  {
    employeeId: 'EMP010',
    employeeName: 'Anna Brown',
    From: '2025-04-08',
    To: '2025-04-09',
    noOfDays: 2,
    status: 'Approved',
    assignedTo: 'Manager A',
    reason: 'Personal reasons',
    workType: 'Work from Home',
    isTeamMember: true
  },
  // Additional team members with clock-in/out times
  {
    employeeId: 'EMP004',
    employeeName: 'Michael Chen',
    From: '2025-04-10',
    To: '2025-04-10',
    noOfDays: 1,
    status: 'Approved',
    assignedTo: 'Manager C',
    reason: 'Regular work',
    workType: 'Work from Office',
    checkInTime: '08:45:00 AM',
    checkOutTime: '05:15:00 PM',
    isTeamMember: true
  },
  {
    employeeId: 'EMP005',
    employeeName: 'Sarah Wilson',
    From: '2025-04-10',
    To: '2025-04-10',
    noOfDays: 1,
    status: 'Approved',
    assignedTo: 'Manager C',
    reason: 'Regular work',
    workType: 'Work from Office',
    checkInTime: '09:10:00 AM',
    checkOutTime: '06:00:00 PM',
    isTeamMember: true
  },
];

// Helper function to calculate days between dates
const calculateDays = (fromDate: string, toDate: string) => {
  const start = new Date(fromDate);
  const end = new Date(toDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both days
  return diffDays;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '/');
};

// Update the ApprovalHistory component props type
const ApprovalHistory = ({ 
  approvalData, 
  onBack,
  isManager,
  
}: {
  approvalData: {
    employeeId: string;
    employeeName: string;
    From: string;
    To: string;
    noOfDays: number;
    workType: string;
    leaveType?: string;
    reason: string;
    status: string;
    assignedTo: string;
    checkInTime?: string;
    checkOutTime?: string;
    isTeamMember?: boolean;
  }[];
  onBack: () => void;
  isManager: boolean;
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('');
  const filteredData = approvalData.filter((record) => {
    const searchMatch =
      record.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      record.employeeName.toLowerCase().includes(search.toLowerCase());

    const statusMatch = statusFilter ? record.status === statusFilter : true;
    const workTypeMatch = workTypeFilter ? record.workType === workTypeFilter : true;
    const From = new Date(record.From);
    const To = new Date(record.To);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const dateMatch =
      (!from || From >= from) && (!to || To <= to);

    return searchMatch && statusMatch && dateMatch&& workTypeMatch;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance Summary</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          value={workTypeFilter}
          onChange={(e) => setWorkTypeFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Work Types</option>
          <option value="Work from Office">Work from Office</option>
          <option value="Work from Home">Work from Home</option>
          <option value="Leave">Leave</option>
        </select>
        <div className="flex items-center gap-2"></div>
        <div className="flex items-center gap-2">
          <span>From:</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <span>To:</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th rowSpan={2} className="border px-4 py-2">S.No</th>
              <th rowSpan={2} className="border px-4 py-2">Employee ID</th>
              <th rowSpan={2} className="border px-4 py-2">Employee Name</th>
              <th colSpan={2} className="border px-4 py-2">Duration</th>
              <th rowSpan={2} className="border px-4 py-2">No. of Days</th>
              <th rowSpan={2} className="border px-4 py-2">Work Type</th>
              <th rowSpan={2} className="border px-4 py-2">Leave Type</th>
              <th rowSpan={2} className="border px-4 py-2">Reason</th>
              <th rowSpan={2} className="border px-4 py-2">Status</th>
              <th rowSpan={2} className="border px-4 py-2">Assigned To</th>
            </tr>
            <tr className="bg-gray-50 text-center">
              <th className="border px-4 py-2">From</th>
              <th className="border px-4 py-2">To</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center py-4">
                  No records found.
                </td>
              </tr>
            ) : (
              filteredData.map((record, index) => (
                <tr 
                  key={index} 
                  className={`text-center border-t ${
                    record.isTeamMember && isManager ? 'bg-blue-50' : 
                    index === 0 ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{record.employeeId}</td>
                  <td className="border px-4 py-2">{record.employeeName}</td>
                  <td className="border px-4 py-2">{formatDate(record.From)}
                    {record.checkInTime && <div className="text-xs text-gray-600">({record.checkInTime})</div>}</td>
                  <td className="border px-4 py-2">{formatDate(record.To)}
                    {record.checkOutTime && <div className="text-xs text-gray-600">({record.checkOutTime})</div>}</td>
                  <td className="border px-4 py-2">{record.noOfDays}</td>
                  <td className="border px-4 py-2">{record.workType}</td>
                  <td className="border px-4 py-2">{record.workType === 'Leave' ? record.leaveType ||  'N/A' : 'N/A'}</td>
                  <td className="border px-4 py-2">{record.reason}</td>
                  <td className={`border px-4 py-2 ${
                    record.status === 'Approved' ? 'text-green-600' :
                    record.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {record.status}
                  </td>
                  <td className="border px-4 py-2">{record.assignedTo}</td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  // State declarations
  const [activeTab, setActiveTab] = useState("Attendance");
  const [showAttendanceSystem, setShowAttendanceSystem] = useState(false);
  const [attendanceSystemPage, setAttendanceSystemPage] = useState('form');
  const [approvalData, setApprovalData] = useState(initialSampleData);
   const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  } | null>(null);

  // Face recognition attendance system states
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [attendance, setAttendance] = useState<
    Array<{ id: number; type: string; date: string; time: string }>
  >([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isScanningFace, setIsScanningFace] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // User role and info - this would come from login in a real app
  const [userInfo] = useState({
    employeeId: 'EMP12345',
    employeeName: 'Akhil G',
    assignedTo: 'Manager C',
    email: 'akhil.g@genai.com',
    isManager: true, // Set to true for manager view
    teamMembers: ['EMP001', 'EMP002', 'EMP003', 'EMP004', 'EMP005'] // IDs of team members
  });

  // Function to fetch team members' attendance data
  const fetchTeamMembersAttendance = () => {
    // In a real application, this would be an API call
    // For now, we'll simulate by marking records as team members
    
    // This is already handled in our sample data, but in a real app
    // you would fetch this data from an API and update the state
    console.log("Fetching team members' attendance data");
    
    // Simulate API call delay
    setTimeout(() => {
      setNotification({
        message: "Attendance data refreshed",
        type: 'success',
        visible: true
      });
      
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 1000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // If user is a manager, fetch team members' attendance on component mount
  useEffect(() => {
    if (userInfo.isManager) {
      fetchTeamMembersAttendance();
    }
  }, [userInfo.isManager]);

  const startFaceRecognition = async () => {
    try {
      setIsScanningFace(true);
      setScanMessage("Initializing camera...");
      setScanProgress(10);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setScanMessage("Positioning face...");
      setScanProgress(30);

      setTimeout(() => {
        setScanMessage("Scanning face...");
        setScanProgress(60);

        setTimeout(() => {
          setScanMessage("Verifying identity...");
          setScanProgress(85);

          setTimeout(() => {
            setScanMessage("Successfully verified!");
            setScanProgress(100);

            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());

            setTimeout(() => {
              completeAttendanceProcess();
              setIsScanningFace(false);
              setScanProgress(0);
            }, 1000);
          }, 1000);
        }, 1500);
      }, 1500);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setScanMessage("Error: Unable to access camera");
      setIsScanningFace(false);
    }
  };

  const completeAttendanceProcess = () => {
    const now = new Date();
    const newEntry = {
      id: Date.now(),
      type: isCheckedIn ? "Check Out" : "Check In",
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    };

    setAttendance([...attendance, newEntry]);
    
    // If this is a check-out event, create a complete attendance record
    if (isCheckedIn) {
      // Find the most recent check-in entry
      const lastCheckIn = [...attendance].reverse().find(entry => entry.type === "Check In");
      
      if (lastCheckIn) {
        const checkInDate = new Date(lastCheckIn.date + " " + lastCheckIn.time);
        const checkOutDate = now;
        
        // Create a new attendance record for the summary table
        const newAttendanceRecord = {
          employeeId: userInfo.employeeId, // Use the userInfo state
          employeeName: userInfo.employeeName, // Using the name from userInfo
          From: checkInDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
          To: checkOutDate.toISOString().split('T')[0],
          noOfDays: calculateDays(checkInDate.toISOString().split('T')[0], checkOutDate.toISOString().split('T')[0]),
          status: 'Approved', // Auto-approve attendance records
          assignedTo: userInfo.assignedTo,
          reason: 'Regular attendance',
          workType: 'Work from Office',
          leaveType: '',
          // Add the specific time information
          checkInTime: lastCheckIn.time,
          checkOutTime: now.toLocaleTimeString(),
          isTeamMember: false // This is the user's own record
        };
        
        // Add to the beginning of the array to show most recent first
        setApprovalData([newAttendanceRecord, ...approvalData]);
        
        // Show notification
        setNotification({
          message: `Attendance recorded: Check-in at ${lastCheckIn.time}, Check-out at ${now.toLocaleTimeString()}`,
          type: 'success',
          visible: true
        });
        
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    }
    
    setIsCheckedIn(!isCheckedIn);
  };

  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  const renderAttendanceTab = () => (
    <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-xl bg-white">
      <div className="bg-blue-500 p-6 text-white text-center">
        <h1 className="text-3xl font-bold mb-2">Attendance</h1>
        <div className="text-xl mb-4">{formattedDate}</div>
        <div className="text-2xl font-bold">{formattedTime}</div>
      </div>

      <div className="bg-white p-6 space-y-6">
        <div className="flex items-center text-xl">
          <span className="font-bold mr-2">ID:</span>
          <span>{userInfo.employeeId}</span>
        </div>

        <div className="text-lg">{userInfo.email}</div>

        {isScanningFace ? (
          <div className="space-y-4">
            <div className="bg-gray-100 border rounded-lg overflow-hidden relative">
              <video ref={videoRef} className="w-full h-64 object-cover" autoPlay playsInline></video>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-4 border-blue-400 rounded-full opacity-70"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${scanProgress}%` }}></div>
              </div>
              <p className="text-center font-medium">{scanMessage}</p>
            </div>
          </div>
        ) : (
          <button
            onClick={startFaceRecognition}
            className={`w-full py-3 px-4 mt-4 rounded-lg text-white font-bold text-lg ${
              isCheckedIn ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isCheckedIn ? "Check Out" : "Check In"}
          </button>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3">Recent Activity</h2>
          {attendance.length > 0 ? (
            <div className="space-y-2">
              {attendance.slice(-3).map((entry) => (
                <div
                  key={entry.id}
                  className={`p-3 border-l-4 bg-gray-50 rounded ${
                    entry.type === "Check In" ? "border-blue-500" : "border-red-500"
                  }`}
                >
                  <p>
                    <span className={`font-medium ${entry.type === "Check In" ? "text-blue-700" : "text-red-700"}`}>
                      {entry.type}:
                    </span>{" "}
                    {entry.date} at {entry.time}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );

  const [attendanceCounts, setAttendanceCounts] = useState({
    fromOffice: 0,
    fromHome: 0,
    onDuty: 0,
    onLeave: 0,
  });

  const handleBackToMainApp = () => {
    setShowAttendanceSystem(false);
    setActiveTab("Attendance");
  };  
  
  const handleAttendanceSummaryClick = () => {
    // Refresh data before showing
    fetchTeamMembersAttendance();
    setShowAttendanceSystem(true);
    setAttendanceSystemPage('history');
  };
    
  useEffect(() => {
    const fromOfficeEmployees = new Set();
    const fromHomeEmployees = new Set();
    const onLeaveEmployees = new Set();
    
    approvalData.forEach(record => {
      if (record.status === 'Approved' || record.status === 'Pending') {
        if (record.workType === 'Work from Office') {
          fromOfficeEmployees.add(record.employeeId);
        } else if (record.workType === 'Work from Home') {
          fromHomeEmployees.add(record.employeeId);
        } else if (record.workType === 'Leave') {
          onLeaveEmployees.add(record.employeeId);
        }
      }
    });

    const totalOnDuty = fromOfficeEmployees.size + fromHomeEmployees.size;

    setAttendanceCounts({
      fromOffice: fromOfficeEmployees.size,
      fromHome: fromHomeEmployees.size,
      onDuty: totalOnDuty,
      onLeave: onLeaveEmployees.size,
    });
  }, [approvalData]);

  // Add this function near the other handler functions
  const handleAttendanceRequestClick = () => {
    setShowAttendanceSystem(true);
    setAttendanceSystemPage('faceRecognition'); // New page type for face recognition
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Attendance":
        return (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <h2 className="text-blue-700 font-semibold">Attendance</h2>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-4 text-center">
                <div className="flex flex-col items-center bg-blue-600 text-white p-3 rounded">
                  <span className="text-xl font-bold">{attendanceCounts.fromOffice}</span>
                  <span className="text-xs mt-1">In office</span>
                </div>
                <div className="flex flex-col items-center bg-blue-600 text-white p-3 rounded">
                  <span className="text-xl font-bold">{attendanceCounts.fromHome}</span>
                  <span className="text-xs mt-1">At home</span>
                </div>
                <div className="flex flex-col items-center bg-blue-600 text-white p-3 rounded">
                  <span className="text-xl font-bold">{attendanceCounts.onDuty}</span>
                  <span className="text-xs mt-1">On duty</span>
                </div>
                <div className="flex flex-col items-center bg-blue-600 text-white p-3 rounded">
                  <span className="text-xl font-bold">{attendanceCounts.onLeave}</span>
                  <span className="text-xs mt-1">On leave</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded shadow">
              <div className="flex flex-wrap space-x-4">
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
                  onClick={handleAttendanceRequestClick}
                >
                  <CheckCircle size={16} className="mr-2" />
                  Attendance
                </button>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
                  onClick={handleAttendanceSummaryClick}
                >
                  <ListFilter size={16} className="mr-2" />
                  Attendance Summary
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div className="text-center p-4 text-gray-500">Select a section to view details</div>;
    }
  };

  // Inside your component, where you're handling the conditional rendering
  if (showAttendanceSystem) {
    
       if (attendanceSystemPage === 'faceRecognition') {
      // Show face recognition attendance system in full page mode
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col p-4">
          <div className="mb-4">
            <button 
              onClick={handleBackToMainApp}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md">
              {renderAttendanceTab()}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <ApprovalHistory 
          approvalData={approvalData} 
          onBack={handleBackToMainApp}
          isManager={userInfo.isManager}
        />
      );
    }
  }

  // If not showing attendance system, render the main dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="w-full bg-white border-b p-4 flex justify-around items-center shadow">
        <h1 className="text-xl text-blue-600">Attendance</h1>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {renderContent()}
      </main> 
      
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}


