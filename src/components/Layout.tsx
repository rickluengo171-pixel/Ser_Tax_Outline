import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell } from 'lucide-react';

export default function Layout() {
  return (
    <div className="flex h-screen bg-[#121212] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-gray-800 flex items-center justify-end px-6">
          <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#d97706] rounded-full"></span>
          </button>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
