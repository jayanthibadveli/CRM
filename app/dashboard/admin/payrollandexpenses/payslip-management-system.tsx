"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PayslipHistory } from "./payslip-history"
import PayslipForm from "@/components/payslip-form"
import { PayslipModal } from "@/components/payslip-modal"
import type { Employee, PayslipData } from "../lib/types"
import { Toaster } from "@/components/ui/toaster"
import { Plus } from "lucide-react"

export default function PayslipManagementSystem() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPayslipFormModalOpen, setIsPayslipFormModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [selectedPayslip, setSelectedPayslip] = useState<PayslipData | null>(null)
  const [refreshHistory, setRefreshHistory] = useState(false)
  
  const handleOpenPayslip = (employee: Employee, payslip: PayslipData) => {
    setSelectedEmployee(employee)
    setSelectedPayslip(payslip)
    setIsModalOpen(true)
  }

  const handleCreatePayslip = () => {
    setIsPayslipFormModalOpen(true)
  }

  const handlePayslipCreated = () => {
    setIsPayslipFormModalOpen(false)
    setRefreshHistory(prev => !prev) // Toggle to trigger history refresh
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-6xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-blue-100">
        <div className="flex justify-between items-center px-6 py-4 border-b border-blue-100">
          <h2 className="text-xl font-semibold">Payslip History</h2>
          <Button 
            onClick={handleCreatePayslip}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" /> CREATE PAYSLIP
          </Button>
        </div>
        
        <div className="p-4">
          <PayslipHistory 
            onOpenPayslip={handleOpenPayslip} 
            refreshTrigger={refreshHistory}
          />
        </div>
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
        onPayslipCreated={handlePayslipCreated}
      />

      <Toaster />
    </div>
  )
}

// Fullscreen modal for the payslip form
function PayslipFormModal({ 
  isOpen, 
  onClose, 
  onPayslipCreated 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onPayslipCreated: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white w-full h-full max-h-screen overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Payslip</h2>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full h-8 w-8 p-0 flex items-center justify-center"
          >
            ✕
          </Button>
        </div>
        <div className="p-4">
          <PayslipForm onPayslipCreated={onPayslipCreated} />
        </div>
      </div>
    </div>
  );
}