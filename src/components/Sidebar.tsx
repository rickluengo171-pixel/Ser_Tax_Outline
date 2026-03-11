import { NavLink } from 'react-router-dom';
import { Upload, Activity, MessageSquare, FolderOpen, FileText, Lightbulb, Settings, LogOut, Menu } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { path: '/tax-intake', label: 'Tax Intake', icon: Upload },
    { path: '/status-tracker', label: 'Status Tracker', icon: Activity },
    { path: '/messages', label: 'Messages', icon: MessageSquare, badge: '03' },
    { path: '/document-center', label: 'Document Center', icon: FolderOpen },
    { path: '/tax-return', label: 'Tax Return', icon: FileText },
    { path: '/insights', label: 'Insights', icon: Lightbulb },
  ];

  return (
    <div className="w-[200px] bg-[#0a0a0a] h-screen flex flex-col border-r border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#c4a053] to-[#8b7038] flex items-center justify-center">
            <div className="text-white font-bold text-xs">S</div>
          </div>
          <span className="text-white text-sm font-semibold">SOVEREIGN</span>
        </div>
        <button className="w-full flex items-center justify-between text-gray-400 hover:text-white transition-colors">
          <span className="text-sm">Acme Corp</span>
          <Menu size={16} />
        </button>
      </div>

      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors relative ${
                isActive
                  ? 'bg-[#b89968] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
              }`
            }
          >
            <item.icon size={18} />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-[#d97706] text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-800">
        <button className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-gray-900 w-full transition-colors">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-gray-900 w-full transition-colors">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
