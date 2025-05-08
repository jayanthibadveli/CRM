'use client'

import { useState } from 'react'

export default function AttendanceManagement() {
  const [counts, setCounts] = useState({
    wfh: 0,
    wfo: 0,
    hybrid: 0,
  })

  const [showLeaveForm, setShowLeaveForm] = useState(false)
  const [employeeId, setEmployeeId] = useState('')
  const [reason, setReason] = useState('')

  const handleClick = (type: 'wfh' | 'wfo' | 'hybrid') => {
    setCounts(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }))
  }

  const handleLeaveClick = () => {
    setShowLeaveForm(true)
  }

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Leave Applied:\nEmployee ID: ${employeeId}\nReason: ${reason}`)
    setEmployeeId('')
    setReason('')
    setShowLeaveForm(false)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <h1 className="text-2xl font-bold">Attendance Management</h1>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleClick('wfh')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Work From Home ({counts.wfh})
        </button>

        <button
          onClick={() => handleClick('wfo')}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Work From Office ({counts.wfo})
        </button>

        <button
          onClick={() => handleClick('hybrid')}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
        >
          Hybrid ({counts.hybrid})
        </button>

        <button
          onClick={handleLeaveClick}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
        >
          Leave
        </button>
      </div>

      {showLeaveForm && (
        <form
          onSubmit={handleLeaveSubmit}
          className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
        >
          <h2 className="text-xl font-semibold mb-2">Leave Form</h2>
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={e => setEmployeeId(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <textarea
            placeholder="Reason for Leave"
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowLeaveForm(false)}
              className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </main>
  )
}

