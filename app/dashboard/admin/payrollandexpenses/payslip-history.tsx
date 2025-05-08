"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"
import { dummyEmployees, dummyPayslips } from "../lib/dummy-data"
import type { Employee, PayslipData } from "../lib/types"

interface PayslipHistoryProps {
  onOpenPayslip: (employee: Employee, payslip: PayslipData) => void
  refreshTrigger?: boolean
}

export function PayslipHistory({ onOpenPayslip, refreshTrigger }: PayslipHistoryProps) {
  const [selectedYear, setSelectedYear] = useState("2024-2025")
  const [selectedMonth, setSelectedMonth] = useState("April")
  const [payslips, setPayslips] = useState<PayslipData[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])

  // Load data from localStorage
  const loadData = () => {
    try {
      // Load payslips from localStorage if available
      const storedPayslips = localStorage.getItem("payslips")
      if (storedPayslips) {
        setPayslips([...JSON.parse(storedPayslips), ...dummyPayslips])
      } else {
        setPayslips(dummyPayslips)
      }

      // Load employees from localStorage if available
      const storedEmployees = localStorage.getItem("employees")
      if (storedEmployees) {
        setEmployees([...JSON.parse(storedEmployees), ...dummyEmployees])
      } else {
        setEmployees(dummyEmployees)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  // Initial load
  useEffect(() => {
    loadData()
  }, [])
  
  // Refresh when trigger changes or when component mounts
  useEffect(() => {
    loadData()
  }, [refreshTrigger])

  // Listen for storage events to update when data changes in another component
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "payslips" || event.key === "employees") {
        loadData()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const filteredPayslips = payslips.filter(
    (payslip) => payslip.financialYear === selectedYear && payslip.month === selectedMonth,
  )

  const getEmployeeById = (id: string): Employee => {
    return employees.find((emp) => emp.id === id) || employees[0]
  }

  // Automatically update selected month and year when a new payslip is created
  useEffect(() => {
    const storedPayslips = localStorage.getItem("payslips")
    if (storedPayslips) {
      const parsedPayslips = JSON.parse(storedPayslips)
      if (parsedPayslips.length > 0) {
        // Get the most recent payslip
        const mostRecentPayslip = parsedPayslips[parsedPayslips.length - 1]
        if (mostRecentPayslip) {
          setSelectedMonth(mostRecentPayslip.month || "April")
          setSelectedYear(mostRecentPayslip.financialYear || "2024-2025")
        }
      }
    }
  }, [refreshTrigger])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Financial Year</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full bg-blue-100 border-blue-300 hover:bg-blue-200 focus:ring-blue-500">
              <SelectValue placeholder="Select Financial Year" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="2023-2024">2023-2024</SelectItem>
              <SelectItem value="2024-2025">2024-2025</SelectItem>
              <SelectItem value="2025-2026">2025-2026</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Month</label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full bg-blue-100 border-blue-300 hover:bg-blue-200 focus:ring-blue-500">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="April" className="hover:bg-blue-100">April</SelectItem>
              <SelectItem value="May" className="hover:bg-blue-100">May</SelectItem>
              <SelectItem value="June" className="hover:bg-blue-100">June</SelectItem>
              <SelectItem value="July" className="hover:bg-blue-100">July</SelectItem>
              <SelectItem value="August" className="hover:bg-blue-100">August</SelectItem>
              <SelectItem value="September" className="hover:bg-blue-100">September</SelectItem>
              <SelectItem value="October" className="hover:bg-blue-100">October</SelectItem>
              <SelectItem value="November" className="hover:bg-blue-100">November</SelectItem>
              <SelectItem value="December" className="hover:bg-blue-100">December</SelectItem>
              <SelectItem value="January" className="hover:bg-blue-100">January</SelectItem>
              <SelectItem value="February" className="hover:bg-blue-100">February</SelectItem>
              <SelectItem value="March" className="hover:bg-blue-100">March</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-blue-100 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-blue-50">
              <TableRow>
                <TableHead className="w-12 py-3 font-semibold">#</TableHead>
                <TableHead className="py-3 font-semibold">Employee Name</TableHead>
                <TableHead className="py-3 font-semibold">Employee ID</TableHead>
                <TableHead className="py-3 font-semibold">Department</TableHead>
                <TableHead className="text-right py-3 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayslips.length > 0 ? (
                filteredPayslips.map((payslip, index) => {
                  const employee = getEmployeeById(payslip.employeeId)
                  return (
                    <TableRow key={index} className="border-b hover:bg-gray-50">
                      <TableCell className="py-2">{index + 1}</TableCell>
                      <TableCell className="py-2 font-medium">{employee.name}</TableCell>
                      <TableCell className="py-2">{employee.id}</TableCell>
                      <TableCell className="py-2">{employee.department}</TableCell>
                      <TableCell className="text-right py-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                          onClick={() => onOpenPayslip(employee, payslip)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    No payslips found for the selected period
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}