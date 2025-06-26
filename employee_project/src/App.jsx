import { useState } from 'react';
import './App.css';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import { StarBackground } from './StarBackground';

function App() {
  const [activePage, setActivePage] = useState('form');

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-48 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-lg font-bold mb-4">Navigation</h2>
        <button
          onClick={() => setActivePage('form')}
          className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activePage === 'form' ? 'bg-gray-700' : ''}`}
        >
          Employee Form
        </button>
        <button
          onClick={() => setActivePage('list')}
          className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activePage === 'list' ? 'bg-gray-700' : ''}`}
        >
          Employee List
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 dark:bg-gray-950 relative">
        <StarBackground />

        {activePage === 'form' && <EmployeeForm />}
        {activePage === 'list' && <EmployeeList />}
      </main>
    </div>
  );
}

export default App;
