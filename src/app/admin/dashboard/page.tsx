"use client";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Enquiries</h3>
          <p className="text-3xl font-bold text-yellow-600">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">New Enquiries</h3>
          <p className="text-3xl font-bold text-yellow-600">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Responses</h3>
          <p className="text-3xl font-bold text-yellow-600">0</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="text-gray-500 text-center py-8">
          No recent activity to display
        </div>
      </div>
    </div>
  );
}