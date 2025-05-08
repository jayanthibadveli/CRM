import PayrollManagement from "@/app/dashboard/manager/components/payslip-management-system";

export default function Home() {
  return (
    <main className="min-h-screen h-full bg-gradient-to-br from-slate-50 via-white to-blue-50 py-10 px-4 sm:px-6 overflow-y-auto">
      <PayrollManagement />
    </main>
  );
}