"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, Save } from "lucide-react"
import { v4 as uuidv4 } from 'uuid'

interface EarningDeduction {
  name: string
  amount: string
}

interface PayslipFormProps {
  onPayslipCreated?: () => void
}

export default function PayslipForm({ onPayslipCreated }: PayslipFormProps) {
  const { toast } = useToast()
  const [companyName, setCompanyName] = useState("GenAILakes")
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    idNumber: "",
    bankDetails: "",
    taxNumber: "",
    pfNumber: "",
    utiNumber: "",
    payPeriod: "",
    payCycle: "",
  })

  const [earnings, setEarnings] = useState<EarningDeduction[]>([
    { name: "Basic Salary", amount: "" },
    { name: "HRA", amount: "" },
    { name: "Conveyance", amount: "" },
    { name: "Dearness Allowance", amount: "" },
    { name: "Overtime", amount: "" },
    { name: "Bonus", amount: "" },
  ])

  const [deductions, setDeductions] = useState<EarningDeduction[]>([
    { name: "Provident Fund", amount: "" },
    { name: "ESI", amount: "" },
    { name: "Professional Tax", amount: "" },
    { name: "Salary Advance", amount: "" },
    { name: "TDS", amount: "" },
    { name: "Other Deduction", amount: "" },
  ])

  const [preparedBy, setPreparedBy] = useState("")
  const [receivedBy, setReceivedBy] = useState("")

  const handleEmployeeInfoChange = (field: string, value: string) => {
    setEmployeeInfo({
      ...employeeInfo,
      [field]: value,
    })
  }

  const handleEarningChange = (index: number, amount: string) => {
    const newEarnings = [...earnings]
    newEarnings[index].amount = amount
    setEarnings(newEarnings)
  }

  const handleDeductionChange = (index: number, amount: string) => {
    const newDeductions = [...deductions]
    newDeductions[index].amount = amount
    setDeductions(newDeductions)
  }

  const calculateTotal = (items: EarningDeduction[]) => {
    return items
      .reduce((sum, item) => {
        const amount = Number.parseFloat(item.amount) || 0
        return sum + amount
      }, 0)
      .toFixed(2)
  }

  const totalEarnings = calculateTotal(earnings)
  const totalDeductions = calculateTotal(deductions)
  const netSalary = (Number.parseFloat(totalEarnings) - Number.parseFloat(totalDeductions)).toFixed(2)

  const handleSave = () => {
    // Get month and year from payPeriod
    let month = "January" // Default
    let year = new Date().getFullYear().toString()
    
    if (employeeInfo.payPeriod) {
      const parts = employeeInfo.payPeriod.split(" ")
      if (parts.length >= 1) month = parts[0]
      if (parts.length >= 2) year = parts[1]
    }

    // Convert earnings and deductions to the format expected by the system
    const payslipEarnings = {
      basicSalary: parseFloat(earnings[0].amount) || 0,
      hra: parseFloat(earnings[1].amount) || 0,
      conveyance: parseFloat(earnings[2].amount) || 0,
      dearnessAllowance: parseFloat(earnings[3].amount) || 0,
      overtime: parseFloat(earnings[4].amount) || 0,
      bonus: parseFloat(earnings[5].amount) || 0
    }

    const payslipDeductions = {
      providentFund: parseFloat(deductions[0].amount) || 0,
      esi: parseFloat(deductions[1].amount) || 0,
      professionalTax: parseFloat(deductions[2].amount) || 0,
      salaryAdvance: parseFloat(deductions[3].amount) || 0,
      tds: parseFloat(deductions[4].amount) || 0,
      otherDeduction: parseFloat(deductions[5].amount) || 0
    }

    // Create new employee record if doesn't exist
    const employeeId = employeeInfo.idNumber || uuidv4()
    
    // Create employee object
    const employee = {
      id: employeeId,
      name: employeeInfo.name,
      department: "N/A", // Default department
      bankDetails: employeeInfo.bankDetails,
      taxNumber: employeeInfo.taxNumber,
      pfNumber: employeeInfo.pfNumber,
      utiNumber: employeeInfo.utiNumber
    }
    
    // Create payslip object
    const payslip = {
      id: uuidv4(),
      employeeId: employeeId,
      month: month,
      financialYear: `${parseInt(year)}-${parseInt(year) + 1}`,
      earnings: payslipEarnings,
      deductions: payslipDeductions
    }

    // Save to localStorage
    const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]")
    const storedPayslips = JSON.parse(localStorage.getItem("payslips") || "[]")
    
    // Check if employee already exists
    const existingEmployeeIndex = storedEmployees.findIndex((emp: any) => emp.id === employeeId)
    
    // Update or add employee
    if (existingEmployeeIndex >= 0) {
      storedEmployees[existingEmployeeIndex] = { ...storedEmployees[existingEmployeeIndex], ...employee }
    } else {
      storedEmployees.push(employee)
    }
    
    // Add new payslip
    storedPayslips.push(payslip)
    
    // Save back to localStorage
    localStorage.setItem("employees", JSON.stringify(storedEmployees))
    localStorage.setItem("payslips", JSON.stringify(storedPayslips))

    toast({
      title: "Success",
      description: "Your payslip has been saved",
      className: "bg-emerald-50 border-emerald-500 text-emerald-800",
    })

    // Reset form fields
    setEmployeeInfo({
      name: "",
      idNumber: "",
      bankDetails: "",
      taxNumber: "",
      pfNumber: "",
      utiNumber: "",
      payPeriod: "",
      payCycle: "",
    })
    setEarnings(earnings.map((item) => ({ ...item, amount: "" })))
    setDeductions(deductions.map((item) => ({ ...item, amount: "" })))
    setPreparedBy("")
    setReceivedBy("")

    // Notify parent component
    if (onPayslipCreated) {
      onPayslipCreated()
    }
  }

  return (
    <div className="w-full flex items-center justify-center h-screen p-6 bg-gray-50">
      <Card className="shadow-md border-t-2 border-t-blue-500 bg-white w-full max-w-6xl max-h-screen">
        {/* Modern, Appealing Header */}
        <CardHeader className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-600" />
            <CardTitle className="text-2xl font-bold text-blue-800">{companyName}</CardTitle>
          </div>
          <div className="text-xl font-medium text-blue-700 bg-white px-4 py-1 rounded shadow-sm">
            PAYSLIP
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Employee Information - Two rows with better spacing */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {/* First row of employee info */}
            <div className="space-y-1">
              <Label htmlFor="employeeName" className="text-sm font-medium text-gray-700">Employee Name</Label>
              <Input
                id="employeeName"
                value={employeeInfo.name}
                onChange={(e) => handleEmployeeInfoChange("name", e.target.value)}
                placeholder="Full name"
                className="h-10"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="idNumber" className="text-sm font-medium text-gray-700">ID Number</Label>
              <Input
                id="idNumber"
                value={employeeInfo.idNumber}
                onChange={(e) => handleEmployeeInfoChange("idNumber", e.target.value)}
                placeholder="Employee ID"
                className="h-10"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="payPeriod" className="text-sm font-medium text-gray-700">Pay Period</Label>
              <Input
                id="payPeriod"
                value={employeeInfo.payPeriod}
                onChange={(e) => handleEmployeeInfoChange("payPeriod", e.target.value)}
                placeholder="e.g., Jan 2025"
                className="h-10"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="payCycle" className="text-sm font-medium text-gray-700">Pay Cycle</Label>
              <Input
                id="payCycle"
                value={employeeInfo.payCycle}
                onChange={(e) => handleEmployeeInfoChange("payCycle", e.target.value)}
                placeholder="e.g., Monthly"
                className="h-10"
              />
            </div>

            {/* Second row of employee info */}
            <div className="space-y-1">
              <Label htmlFor="pfNumber" className="text-sm font-medium text-gray-700">PF Number</Label>
              <Input
                id="pfNumber"
                value={employeeInfo.pfNumber}
                onChange={(e) => handleEmployeeInfoChange("pfNumber", e.target.value)}
                placeholder="PF Number"
                className="h-10"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="utiNumber" className="text-sm font-medium text-gray-700">UTI Number</Label>
              <Input
                id="utiNumber"
                value={employeeInfo.utiNumber}
                onChange={(e) => handleEmployeeInfoChange("utiNumber", e.target.value)}
                placeholder="UTI Number"
                className="h-10"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="taxNumber" className="text-sm font-medium text-gray-700">Tax Number</Label>
              <Input
                id="taxNumber"
                value={employeeInfo.taxNumber}
                onChange={(e) => handleEmployeeInfoChange("taxNumber", e.target.value)}
                placeholder="Tax Number"
                className="h-10"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bankDetails" className="text-sm font-medium text-gray-700">Bank Details</Label>
              <Input
                id="bankDetails"
                value={employeeInfo.bankDetails}
                onChange={(e) => handleEmployeeInfoChange("bankDetails", e.target.value)}
                placeholder="Account details"
                className="h-10"
              />
            </div>
          </div>

          {/* Earnings and Deductions Table - Side by Side with more breathing room */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Earnings Table */}
            <div className="border rounded-md overflow-hidden shadow-sm">
              <div className="bg-blue-100 py-2 px-4 text-blue-800 font-medium">
                Earnings
              </div>
              <Table>
                <TableBody>
                  {earnings.map((earning, index) => (
                    <TableRow key={`earning-${index}`} className="hover:bg-gray-50">
                      <TableCell className="py-2 px-4 text-gray-700">{earning.name}</TableCell>
                      <TableCell className="py-2 px-4 w-1/3">
                        <Input
                          type="text"
                          value={earning.amount}
                          onChange={(e) => handleEarningChange(index, e.target.value)}
                          className="h-8 text-right"
                          placeholder="0.00"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-blue-50">
                    <TableCell className="py-3 px-4 font-semibold text-blue-800">Total Earnings</TableCell>
                    <TableCell className="py-3 px-4 font-semibold text-blue-800 text-right">{totalEarnings}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Deductions Table */}
            <div className="border rounded-md overflow-hidden shadow-sm">
              <div className="bg-red-100 py-2 px-4 text-red-800 font-medium">
                Deductions
              </div>
              <Table>
                <TableBody>
                  {deductions.map((deduction, index) => (
                    <TableRow key={`deduction-${index}`} className="hover:bg-gray-50">
                      <TableCell className="py-2 px-4 text-gray-700">{deduction.name}</TableCell>
                      <TableCell className="py-2 px-4 w-1/3">
                        <Input
                          type="text"
                          value={deduction.amount}
                          onChange={(e) => handleDeductionChange(index, e.target.value)}
                          className="h-8 text-right"
                          placeholder="0.00"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-red-50">
                    <TableCell className="py-3 px-4 font-semibold text-red-800">Total Deductions</TableCell>
                    <TableCell className="py-3 px-4 font-semibold text-red-800 text-right">{totalDeductions}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Net Salary Card and Signatures - Side by Side */}
          <div className="grid grid-cols-2 gap-6">
            {/* Net Salary Card */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow p-4 flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Net Salary Transferred</span>
              <span className="text-2xl font-bold text-blue-700">{netSalary}</span>
            </div>
            
            {/* Signature Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="preparedBy" className="text-sm font-medium text-gray-700">Prepared by</Label>
                <Input
                  id="preparedBy"
                  value={preparedBy}
                  onChange={(e) => setPreparedBy(e.target.value)}
                  placeholder="Name"
                  className="h-10"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="receivedBy" className="text-sm font-medium text-gray-700">Received by</Label>
                <Input
                  id="receivedBy"
                  value={receivedBy}
                  onChange={(e) => setReceivedBy(e.target.value)}
                  placeholder="Name"
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end p-4 bg-gray-50 border-t">
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 h-10"
          >
            <Save className="mr-2 h-4 w-4" /> Save Payslip
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}