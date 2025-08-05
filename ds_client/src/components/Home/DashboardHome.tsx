import React from "react";
function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 mt-5 shadow-none rounded-2xl">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-2xl w-full mt-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6 underline">
          Welcome to My Real Estate App!
        </h1>

        <p className="text-left text-gray-700 mb-4 ">
          This is an app that helps you to:
        </p>

        <ol className="list-decimal text-gray-800 text-left space-y-2 px-4">
          <li>Manage Rent Amount</li>
          <li>Monitor Rent Collection</li>
          <li>Manage Tenants</li>
          <li>View Tenant Rent Payment Statement</li>
          <li>Download Rent Statement for Any Tenant</li>
        </ol>
      </div>
    </div>
  );
}

export default App;
