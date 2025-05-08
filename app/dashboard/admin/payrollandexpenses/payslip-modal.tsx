"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { Employee, PayslipData } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { generatePDF } from "@/lib/pdf-generator"

interface PayslipModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
  payslip: PayslipData | null
}

export function PayslipModal({ isOpen, onClose, employee, payslip }: PayslipModalProps) {
  if (!employee || !payslip) return null

  const totalEarnings = Object.values(payslip.earnings).reduce((sum, val) => sum + val, 0)
  const totalDeductions = Object.values(payslip.deductions).reduce((sum, val) => sum + val, 0)
  const netSalary = totalEarnings - totalDeductions

  const handleDownloadPDF = () => {
    if (employee && payslip) {
      generatePDF(employee, payslip)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end mb-4">
          <Button onClick={handleDownloadPDF} className="bg-blue-700 hover:bg-blue-800 text-white">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <div className="border border-black">
          <div className="text-center p-4 border-b border-black">
            <h2 className="text-2xl font-bold">Company Name</h2>
            <h3 className="text-xl font-semibold mt-2">PAYSLIP</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-b border-black">
            <div>
              <div className="flex mb-2">
                <span className="font-medium">Employee Name : </span>
                <span className="ml-2">{employee.name}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-medium">ID Number : </span>
                <span className="ml-2">{employee.id}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-medium">Bank Details : </span>
                <span className="ml-2">{employee.bankDetails}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-medium">Tax Number : </span>
                <span className="ml-2">{employee.taxNumber}</span>
              </div>
            </div>
            <div>
              <div className="flex mb-2">
                <span className="font-medium">Pay Period : </span>
                <span className="ml-2">
                  {payslip.month} {payslip.financialYear.split("-")[0]}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-medium">Pay Cycle : </span>
                <span className="ml-2">Monthly</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-black">
            <div className="border-r border-black">
              <div className="bg-blue-100 p-2 text-center font-semibold border-b border-black">Earnings</div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black font-medium">Basic Salary</div>
                <div className="p-2 text-right">{formatCurrency(payslip.earnings.basicSalary)}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black font-medium">HRA</div>
                <div className="p-2 text-right">{formatCurrency(payslip.earnings.hra)}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black font-medium">Conveyance</div>
                <div className="p-2 text-right">{formatCurrency(payslip.earnings.conveyance)}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black font-medium">Dearness Allowance</div>
                <div className="p-2 text-right">{formatCurrency(payslip.earnings.dearnessAllowance)}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black font-medium">Overtime</div>
                <div className="p-2 text-right">{formatCurrency(payslip.earnings.overtime)}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black font-medium">Bonus</div>
                <div className="p-2 text-right">{formatCurrency(payslip.earnings.bonus)}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black"></div>
                <div className="p-2"></div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black"></div>
                <div className="p-2"></div>
              </div>
              <div className="grid grid-cols-2">
                <div className="p-2 border-r border-black font-semibold bg-blue-100">Gross Earnings</div>
                <div className="p-2 bg-blue-100 text-right font-semibold">{formatCurrency(totalEarnings)}</div>
              </div>
            </div>

            <div>
              <div className="bg-blue-100 p-2 text-center font-semibold border-b border-black">Deductions</div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black font-medium">Provident Fund</div>
                <div className="p-2 text-right">{formatCurrency(payslip.deductions.providentFund)}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black font-medium">ESI</div>
                <div className="p-2 text-right">{formatCurrency(payslip.deductions.esi)}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black font-medium">Professional Tax</div>
                <div className="p-2 text-right">{formatCurrency(payslip.deductions.professionalTax)}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black font-medium">Salary Advance</div>
                <div className="p-2 text-right">{formatCurrency(payslip.deductions.salaryAdvance)}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black font-medium">TDS</div>
                <div className="p-2 text-right">{formatCurrency(payslip.deductions.tds)}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black font-medium">Other Deduction</div>
                <div className="p-2 text-right">{formatCurrency(payslip.deductions.otherDeduction)}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black"></div>
                <div className="p-2"></div>
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black"></div>
                <div className="p-2"></div>
              </div>
              <div className="grid grid-cols-2">
                <div className="p-2 border-r border-black font-semibold bg-blue-100">Total Deductions</div>
                <div className="p-2 bg-blue-100 text-right font-semibold">{formatCurrency(totalDeductions)}</div>
              </div>
            </div>
          </div>

          <div className="p-2 bg-blue-100 border-b border-black">
            <div className="flex">
              <span className="font-medium">Net Salary Transferred : </span>
              <span className="ml-2 font-semibold">{formatCurrency(netSalary)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 bg-blue-100">
            <div className="p-2 border-r border-black">
              <div className="flex">
                <span className="font-medium">Prepared by : </span>
                <span className="ml-2">HR Department</span>
              </div>
            </div>
            <div className="p-2">
              <div className="flex">
                <span className="font-medium">Received by : </span>
                <span className="ml-2">{employee.name}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}