"use client";

import { useState } from 'react';
import Image from 'next/image';

interface AlertProps {
    date: string;
    message: string;
}

export default function Dashboard() {
    const [selectedView, setSelectedView] = useState<'Self' | 'Team'>('Self');
    const alerts: AlertProps[] = [
        { date: '01-04-2025', message: 'Attendance not recorded' },
        { date: '02-04-2025', message: 'Attendance not recorded' },
        { date: '03-04-2025', message: 'Attendance not recorded' },
        { date: '04-04-2025', message: 'Attendance not recorded' },
        { date: '05-04-2025', message: 'Attendance not recorded' },
        { date: '07-04-2025', message: 'Attendance not recorded' },
        { date: '08-04-2025', message: 'Attendance not recorded' },
        { date: '09-04-2025', message: 'Attendance not recorded' },
        { date: '10-04-2025', message: 'Attendance not recorded' },
        { date: '11-04-2025', message: 'Attendance not recorded' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-teal-500 text-white py-4">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl font-semibold">GenAILakes Pvt Ltd</div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span>Madhavi Chilukula</span>
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Welcome Banner */}
            <div className="bg-teal-500 text-white py-2 text-center">
                <h1 className="text-xl">Welcome to GenAILakes Pvt Ltd</h1>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Section */}
                    <div className="bg-teal-500 rounded-lg p-6 text-white">
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold">Madhavi Chilukula</h2>
                                <p className="text-teal-100">GA002</p>
                                <p className="text-teal-100 mt-2">01-11-2024</p>
                                <p className="text-teal-100">Reporting: Madhavi Chilukula</p>
                            </div>
                        </div>
                    </div>

                    {/* Alerts Section */}
                    <div className="bg-white rounded-lg p-6 shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Alerts</h2>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setSelectedView('Self')}
                                    className={`px-4 py-1 rounded ${
                                        selectedView === 'Self'
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-200'
                                    }`}
                                >
                                    Self
                                </button>
                                <button
                                    onClick={() => setSelectedView('Team')}
                                    className={`px-4 py-1 rounded ${
                                        selectedView === 'Team'
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-200'
                                    }`}
                                >
                                    Team
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Pending Leave/Attendance</h3>
                            <div className="space-y-2">
                                {alerts.map((alert, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center py-2 border-b"
                                    >
                                        <span>{alert.date} - {alert.message}</span>
                                        <div className="flex space-x-2">
                                            <button className="text-teal-500">
                                                <CalendarIcon />
                                            </button>
                                            <button className="text-teal-500">
                                                <ClockIcon />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Announcements Section */}
                <div className="mt-6">
                    <div className="bg-white rounded-lg p-6 shadow">
                        <h2 className="text-xl font-semibold mb-4">Announcements</h2>
                        <div className="text-gray-500 text-center py-8">
                            No Announcements
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const CalendarIcon = () => (
    <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
    </svg>
);

const ClockIcon = () => (
    <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
); 