import React from "react";
function App() {
  return (
    <div className="mt-8 px-4 py-8">
      <h1 className="text-2xl font-bold text-center underline mb-4">
        Welcome to my Real Estate app!
      </h1>
      <div className="text-center mr-12">
        <p>This is an app that helps one to;</p>
        
        <ol className="list-decimal list-inside text-left max-w-md mx-auto px-28 py-2">
          <li >Manage rent amount</li>
          <li >Monitor rent collection </li>
          <li >Manage tenants</li>
          <li >Monitor tenants</li>
        </ol>
        
      </div>      
    </div>
    
  );
}

export default App;