"use client";

export default function Enquiries() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Enquiries</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Enquiries</h2>
            <div className="flex space-x-2">
              <select className="border rounded px-3 py-1 text-sm">
                <option>All Status</option>
                <option>New</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              <input
                type="text"
                placeholder="Search enquiries..."
                className="border rounded px-3 py-1 text-sm"
              />
            </div>
          </div>
          
          <div className="text-gray-500 text-center py-8">
            No enquiries to display
          </div>
        </div>
      </div>
    </div>
  );
}