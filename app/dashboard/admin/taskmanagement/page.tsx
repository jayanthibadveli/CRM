"use client"
import { useState } from 'react';
import { User, ArrowLeftRight, Code, Layout } from 'lucide-react';

export default function ActiveProjects() {
  type Employee = {
    id: number;
    name: string;
    role: string;
  };

  type EmployeesByProject = {
    [key in 'Fasthire' | 'Fastjob' | 'Fasttrade']: Employee[];
  };

  // Initial employee data for each project
  const initialEmployees: EmployeesByProject = {
    Fasthire: [
      { id: 1, name: "Alex Johnson", role: "frontend" },
      { id: 2, name: "Sarah Kim", role: "backend" },
      { id: 3, name: "Michael Chen", role: "frontend" }
    ],
    Fastjob: [
      { id: 4, name: "Emily Rodriguez", role: "backend" },
      { id: 5, name: "David Lee", role: "frontend" },
      { id: 6, name: "Jessica Taylor", role: "backend" }
    ],
    Fasttrade: [
      { id: 7, name: "Ryan Smith", role: "frontend" },
      { id: 8, name: "Olivia Wilson", role: "backend" },
      { id: 9, name: "Daniel Brown", role: "frontend" }
    ]
  };

  // State variables
  const [employees, setEmployees] = useState<EmployeesByProject>(initialEmployees);
  const [activeProject, setActiveProject] = useState<keyof EmployeesByProject | null>(null);

  // Function to handle button clicks for projects
  const handleProjectClick = (project: keyof EmployeesByProject) => {
    setActiveProject(project);
  };

  // Function to swap employee roles
  const handleSwap = () => {
    if (activeProject) {
      const updatedEmployees = {
        ...employees,
        [activeProject]: employees[activeProject].map(employee => ({
          ...employee,
          role: employee.role === "frontend" ? "backend" : "frontend"
        }))
      };
      setEmployees(updatedEmployees);
    }
  };

  // Function to get role icon
  const getRoleIcon = (role: string) => {
    return role === "frontend" ? 
      <Layout size={18} className="text-blue-500" /> : 
      <Code size={18} className="text-green-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Active Projects</h1>
      
      {/* Project Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        {["Fasthire", "Fastjob", "Fasttrade"].map((project) => (
          <button
            key={project}
            onClick={() => handleProjectClick(project as keyof EmployeesByProject)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeProject === project
                ? "bg-indigo-600 text-white"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            }`}
          >
            {project}
          </button>
        ))}
        
        <button
          onClick={handleSwap}
          disabled={!activeProject}
          className={`px-4 py-2 rounded-md font-medium flex items-center gap-2 ${
            !activeProject
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-amber-500 text-white hover:bg-amber-600"
          }`}
        >
          <ArrowLeftRight size={18} />
          Swap
        </button>
      </div>
      
      {/* Employee List */}
      {activeProject ? (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{activeProject} Employees</h2>
          
          <div className="space-y-3">
            {employees[activeProject].map(employee => (
              <div 
                key={employee.id}
                className="flex items-center p-3 border rounded-md hover:bg-gray-50"
              >
                <div className="bg-gray-100 p-2 rounded-full mr-4">
                  <User size={24} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{employee.name}</p>
                  <div className="flex items-center mt-1">
                    {getRoleIcon(employee.role)}
                    <span className="ml-1 text-sm text-gray-600 capitalize">
                      {employee.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center text-gray-500">
          Select a project to view employee details
        </div>
      )}
    </div>
  );
}