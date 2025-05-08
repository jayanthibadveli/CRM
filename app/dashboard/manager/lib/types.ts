export interface Employee {
  id: string
  name: string
  department: string
  bankDetails: string
  taxNumber: string
}

export interface PayslipData {
  id: string
  employeeId: string
  financialYear: string
  month: string
  earnings: {
    basicSalary: number
    hra: number
    conveyance: number
    dearnessAllowance: number
    overtime: number
    bonus: number
  }
  deductions: {
    providentFund: number
    esi: number
    professionalTax: number
    salaryAdvance: number
    tds: number
    otherDeduction: number
  }
}
