"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/dashboard/manager/components/ui/tabs"
import { PayslipHistory } from "./payslip-history"
import PayslipForm from "@/app/dashboard/manager/components/payslip-form"
import { PayslipModal } from "@/app/dashboard/manager/components/payslip-modal"
import { Button } from "@/app/dashboard/manager/components/ui/button"
import type { Employee, PayslipData } from "../lib/types"
import { Toaster } from "@/app/dashboard/manager/components/ui/toaster"
export default function PayslipManagementSystem() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPayslipFormModalOpen, setIsPayslipFormModalOpen] = useState(false)
  const [isPayslipHistoryModalOpen, setIsPayslipHistoryModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [selectedPayslip, setSelectedPayslip] = useState<PayslipData | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleOpenPayslip = (employee: Employee, payslip: PayslipData) => {
    setSelectedEmployee(employee)
    setSelectedPayslip(payslip)
    setIsModalOpen(true)
  }

  // Handle tab change to open appropriate modal
  const handleTabChange = (value: string) => {
    setActiveTab("dashboard") // Always keep the active tab as dashboard
    
    // Open the corresponding modal based on which tab was clicked
    if (value === "payslip") {
      setIsPayslipFormModalOpen(true)
    } else if (value === "history") {
      setIsPayslipHistoryModalOpen(true)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-purple-100">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={handleTabChange} className="w-full mt-4">
          <div className="px-6 pt-6">
            {/* Custom styling for tabs */}
            <style jsx global>{`
              .custom-tabs [data-state="active"],
              .custom-tabs [data-state="inactive"] {
                background-color: #3b82f6 !important; /* blue-500 */
                color: black !important;
                font-weight: 500;
                border-radius: 0.375rem;
                padding-top: 0.75rem;
                padding-bottom: 0.75rem;
              }
              
              .custom-tabs [data-state="active"]:hover,
              .custom-tabs [data-state="inactive"]:hover {
                background-color: #2563eb !important; /* blue-600 */
              }
              
              .custom-tabs [role="tablist"] {
                background-color: transparent !important;
                gap: 0.5rem;
              }
            `}</style>
            
            <TabsList className="grid w-full grid-cols-2 gap-2 custom-tabs">
              <TabsTrigger value="payslip">
                Create Payslip
              </TabsTrigger>
              <TabsTrigger value="history">
                Payslip History
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard content for when no modal is open */}
          <TabsContent value="dashboard" className="p-6">
           
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal for viewing existing payslips */}
      <PayslipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={selectedEmployee}
        payslip={selectedPayslip}
      />

      {/* Modal for the payslip form */}
      <PayslipFormModal
        isOpen={isPayslipFormModalOpen}
        onClose={() => setIsPayslipFormModalOpen(false)}
      />

      {/* Modal for payslip history */}
      <PayslipHistoryModal
        isOpen={isPayslipHistoryModalOpen}
        onClose={() => setIsPayslipHistoryModalOpen(false)}
        onOpenPayslip={handleOpenPayslip}
      />

      <Toaster />
    </div>
  )
}

// Fullscreen modal for the payslip form
function PayslipFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white w-full h-full max-h-screen overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Payslip</h2>
          <Button 
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full h-8 w-8 p-0 flex items-center justify-center"
          >
            ✕
          </Button>
        </div>
        <div className="p-4">
          <PayslipForm />
        </div>
      </div>
    </div>
  );
}
// Component for payslip history modal
function PayslipHistoryModal({ 
  isOpen, 
  onClose, 
  onOpenPayslip 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onOpenPayslip: (employee: Employee, payslip: PayslipData) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white w-full h-full max-h-screen overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Payslip History</h2>
          <Button 
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full h-8 w-8 p-0 flex items-center justify-center"
          >
            ✕
          </Button>
        </div>
        <div className="p-4">
          <PayslipHistory onOpenPayslip={onOpenPayslip} />
        </div>
      </div>
    </div>
  );
}