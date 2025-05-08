"use client"

import { useState } from "react"
import { useToast } from "@/app/dashboard/manager/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/app/dashboard/manager/components/ui/card"
import { Input } from "@/app/dashboard/manager/components/ui/input"
import { Label } from "@/app/dashboard/manager/components/ui/label" 
import { Button } from "@/app/dashboard/manager/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/dashboard/manager/components/ui/table"
import { Separator } from "@/app/dashboard/manager/components/ui/separator"
import { Building2, Save } from "lucide-react"

interface EarningDeduction {
  name: string
  amount: string
}

export default function PayslipForm() {
  const { toast } = useToast()
  const [companyName, setCompanyName] = useState("GenAILakes")
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    idNumber: "",
    bankDetails: "",
    taxNumber: "",
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
    toast({
      title: "Success",
      description: "Your payslip has been saved",
      className: "bg-emerald-50 border-emerald-500 text-emerald-800",
    })

    // Reset all form fields
    setEmployeeInfo({
      name: "",
      idNumber: "",
      bankDetails: "",
      taxNumber: "",
      payPeriod: "",
      payCycle: "",
    })

    // Reset earnings
    const resetEarnings = earnings.map((item) => ({ ...item, amount: "" }))
    setEarnings(resetEarnings)

    // Reset deductions
    const resetDeductions = deductions.map((item) => ({ ...item, amount: "" }))
    setDeductions(resetDeductions)

    // Reset signature fields
    setPreparedBy("")
    setReceivedBy("")
  }

  return (
    <div className="w-full flex items-center justify-center py-4 min-h-full">
      <Card className="shadow-2xl border-t-4 border-t-blue-500 animate-in fade-in slide-in-from-top duration-700 bg-gradient-to-b from-white to-slate-50 w-full max-w-full md:max-w-4xl overflow-visible mb-8">
        <CardHeader className="text-center pb-2 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-t-lg">
          <div className="flex justify-center mb-2 animate-in zoom-in duration-500">
            <Building2 className="h-10 w-10 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700">
            {companyName}
          </CardTitle>
          <p className="text-lg font-semibold text-gray-600 mt-1">PAYSLIP</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Employee Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeName">Employee Name</Label>
              <Input
                id="employeeName"
                value={employeeInfo.name}
                onChange={(e) => handleEmployeeInfoChange("name", e.target.value)}
                placeholder="Enter employee name"
                className="transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payPeriod">Pay Period</Label>
              <Input
                id="payPeriod"
                value={employeeInfo.payPeriod}
                onChange={(e) => handleEmployeeInfoChange("payPeriod", e.target.value)}
                placeholder="e.g., Jan 2025"
                className="transition-all duration-300 hover:border--300 focus:border-blue-500 focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number</Label>
              <Input
                id="idNumber"
                value={employeeInfo.idNumber}
                onChange={(e) => handleEmployeeInfoChange("idNumber", e.target.value)}
                placeholder="Enter ID number"
                className="transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payCycle">Pay Cycle</Label>
              <Input
                id="payCycle"
                value={employeeInfo.payCycle}
                onChange={(e) => handleEmployeeInfoChange("payCycle", e.target.value)}
                placeholder="e.g., Monthly"
                className="transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bankDetails">Bank Details</Label>
              <Input
                id="bankDetails"
                value={employeeInfo.bankDetails}
                onChange={(e) => handleEmployeeInfoChange("bankDetails", e.target.value)}
                placeholder="Enter bank details"
                className="transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="taxNumber">Tax Number</Label>
              <Input
                id="taxNumber"
                value={employeeInfo.taxNumber}
                onChange={(e) => handleEmployeeInfoChange("taxNumber", e.target.value)}
                placeholder="Enter tax number"
                className="transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-blue-300"
              />
            </div>
          </div>

          <Separator className="my-4" />

          {/* Earnings and Deductions Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-medium">
                    Earnings
                  </TableHead>
                  <TableHead className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 font-medium text-right">
                    Amount
                  </TableHead>
                  <TableHead className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 font-medium">
                    Deductions
                  </TableHead>
                  <TableHead className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-medium text-right">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earnings.map((earning, index) => (
                  <TableRow key={`earning-${index}`}>
                    <TableCell className="font-medium">{earning.name}</TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="text"
                        value={earning.amount}
                        onChange={(e) => handleEarningChange(index, e.target.value)}
                        className="w-full text-right transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-blue-300"
                        placeholder="0.00"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{deductions[index]?.name || ""}</TableCell>
                    <TableCell className="text-right">
                      {deductions[index] && (
                        <Input
                          type="text"
                          value={deductions[index].amount}
                          onChange={(e) => handleDeductionChange(index, e.target.value)}
                          className="w-full text-right transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-blue-300"
                          placeholder="0.00"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-semibold">
                    Gross Earnings
                  </TableCell>
                  <TableCell className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 font-semibold text-right">
                    {totalEarnings}
                  </TableCell>
                  <TableCell className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 font-semibold">
                    Total Deductions
                  </TableCell>
                  <TableCell className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-semibold text-right">
                    {totalDeductions}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 p-6 rounded-md shadow-inner transition-all duration-500 hover:shadow-md">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Net Salary Transferred:</span>
              <span className="font-bold text-2xl text-blue-700 animate-in slide-in-from-right duration-500">
                {netSalary}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="preparedBy">Prepared by</Label>
              <Input
                id="preparedBy"
                value={preparedBy}
                onChange={(e) => setPreparedBy(e.target.value)}
                placeholder="Enter name"
                className="transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="receivedBy">Received by</Label>
              <Input
                id="receivedBy"
                value={receivedBy}
                onChange={(e) => setReceivedBy(e.target.value)}
                placeholder="Enter name"
                className="transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-blue-300"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end pt-2">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-white"
          >
            <Save className="mr-2 h-4 w-4" /> Save Payslip
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}