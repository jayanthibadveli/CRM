import type { Employee, PayslipData } from "./types"
import { formatCurrency } from "./utils"

export const generatePDF = (employee: Employee, payslip: PayslipData) => {
  // Calculate totals
  const totalEarnings = Object.values(payslip.earnings).reduce((sum, val) => sum + val, 0)
  const totalDeductions = Object.values(payslip.deductions).reduce((sum, val) => sum + val, 0)
  const netSalary = totalEarnings - totalDeductions

  // Create a new window for printing
  const printWindow = window.open("", "_blank")
  if (!printWindow) {
    alert("Please allow popups for this website")
    return
  }

  // Create the HTML content for the PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Payslip - ${employee.name} - ${payslip.month} ${payslip.financialYear}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          border: 1px solid #000;
        }
        .header {
          text-align: center;
          padding: 15px;
          border-bottom: 1px solid #000;
        }
        .employee-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 15px;
          border-bottom: 1px solid #000;
        }
        .earnings-deductions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid #000;
        }
        .earnings, .deductions {
          border-right: 1px solid #000;
        }
        .section-header {
          background-color: #f3e8ff;
          text-align: center;
          font-weight: bold;
          padding: 8px;
          border-bottom: 1px solid #000;
        }
        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid #000;
        }
        .row-label {
          padding: 8px;
          border-right: 1px solid #000;
          font-weight: 500;
        }
        .row-value {
          padding: 8px;
          text-align: right;
        }
        .total-row {
          background-color: #f3e8ff;
          font-weight: bold;
        }
        .net-salary {
          background-color: #f3e8ff;
          padding: 8px;
          border-bottom: 1px solid #000;
        }
        .footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background-color: #f3e8ff;
        }
        .footer-left {
          padding: 8px;
          border-right: 1px solid #000;
        }
        .footer-right {
          padding: 8px;
        }
        .label {
          font-weight: 500;
        }
        @media print {
          body {
            padding: 0;
          }
          button {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div style="text-align: right; margin-bottom: 20px;">
        <button onclick="window.print(); setTimeout(() => window.close(), 500);" style="padding: 8px 16px; background-color: #7e22ce; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Print / Save as PDF
        </button>
      </div>
      
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">Company Name</h2>
          <h3 style="margin-top: 10px;">PAYSLIP</h3>
        </div>
        
        <div class="employee-details">
          <div>
            <div style="margin-bottom: 8px;">
              <span class="label">Employee Name : </span>
              <span>${employee.name}</span>
            </div>
            <div style="margin-bottom: 8px;">
              <span class="label">ID Number : </span>
              <span>${employee.id}</span>
            </div>
            <div style="margin-bottom: 8px;">
              <span class="label">Bank Details : </span>
              <span>${employee.bankDetails}</span>
            </div>
            <div style="margin-bottom: 8px;">
              <span class="label">Tax Number : </span>
              <span>${employee.taxNumber}</span>
            </div>
          </div>
          <div>
            <div style="margin-bottom: 8px;">
              <span class="label">Pay Period : </span>
              <span>${payslip.month} ${payslip.financialYear.split("-")[0]}</span>
            </div>
            <div style="margin-bottom: 8px;">
              <span class="label">Pay Cycle : </span>
              <span>Monthly</span>
            </div>
          </div>
        </div>
        
        <div class="earnings-deductions">
          <div class="earnings">
            <div class="section-header">Earnings</div>
            <div class="row">
              <div class="row-label">Basic Salary</div>
              <div class="row-value">${formatCurrency(payslip.earnings.basicSalary)}</div>
            </div>
            <div class="row">
              <div class="row-label">HRA</div>
              <div class="row-value">${formatCurrency(payslip.earnings.hra)}</div>
            </div>
            <div class="row">
              <div class="row-label">Conveyance</div>
              <div class="row-value">${formatCurrency(payslip.earnings.conveyance)}</div>
            </div>
            <div class="row">
              <div class="row-label">Dearness Allowance</div>
              <div class="row-value">${formatCurrency(payslip.earnings.dearnessAllowance)}</div>
            </div>
            <div class="row">
              <div class="row-label">Overtime</div>
              <div class="row-value">${formatCurrency(payslip.earnings.overtime)}</div>
            </div>
            <div class="row">
              <div class="row-label">Bonus</div>
              <div class="row-value">${formatCurrency(payslip.earnings.bonus)}</div>
            </div>
            <div class="row">
              <div class="row-label"></div>
              <div class="row-value"></div>
            </div>
            <div class="row">
              <div class="row-label"></div>
              <div class="row-value"></div>
            </div>
            <div class="row total-row">
              <div class="row-label">Gross Earnings</div>
              <div class="row-value">${formatCurrency(totalEarnings)}</div>
            </div>
          </div>
          
          <div class="deductions">
            <div class="section-header">Deductions</div>
            <div class="row">
              <div class="row-label">Provident Fund</div>
              <div class="row-value">${formatCurrency(payslip.deductions.providentFund)}</div>
            </div>
            <div class="row">
              <div class="row-label">ESI</div>
              <div class="row-value">${formatCurrency(payslip.deductions.esi)}</div>
            </div>
            <div class="row">
              <div class="row-label">Professional Tax</div>
              <div class="row-value">${formatCurrency(payslip.deductions.professionalTax)}</div>
            </div>
            <div class="row">
              <div class="row-label">Salary Advance</div>
              <div class="row-value">${formatCurrency(payslip.deductions.salaryAdvance)}</div>
            </div>
            <div class="row">
              <div class="row-label">TDS</div>
              <div class="row-value">${formatCurrency(payslip.deductions.tds)}</div>
            </div>
            <div class="row">
              <div class="row-label">Other Deduction</div>
              <div class="row-value">${formatCurrency(payslip.deductions.otherDeduction)}</div>
            </div>
            <div class="row">
              <div class="row-label"></div>
              <div class="row-value"></div>
            </div>
            <div class="row">
              <div class="row-label"></div>
              <div class="row-value"></div>
            </div>
            <div class="row total-row">
              <div class="row-label">Total Deductions</div>
              <div class="row-value">${formatCurrency(totalDeductions)}</div>
            </div>
          </div>
        </div>
        
        <div class="net-salary">
          <span class="label">Net Salary Transferred : </span>
          <span style="font-weight: bold;">${formatCurrency(netSalary)}</span>
        </div>
        
        <div class="footer">
          <div class="footer-left">
            <span class="label">Prepared by : </span>
            <span>HR Department</span>
          </div>
          <div class="footer-right">
            <span class="label">Received by : </span>
            <span>${employee.name}</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  // Write the HTML content to the new window
  printWindow.document.open()
  printWindow.document.write(htmlContent)
  printWindow.document.close()
}
