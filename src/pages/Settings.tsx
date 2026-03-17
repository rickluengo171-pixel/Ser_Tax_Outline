import { useState } from 'react';
import { Building2, User, Bell, Lock, FileText } from 'lucide-react';
import CompanyInformation from './settings/CompanyInformation';
import UserSettings from './settings/UserSettings';
import NotificationSettings from './settings/NotificationSettings';
import SecuritySettings from './settings/SecuritySettings';
import LegalSettings from './settings/LegalSettings';

type SettingsTab = 'company' | 'user' | 'notifications' | 'security' | 'legal';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('company');

  const tabs = [
    { id: 'company', label: 'Company Information', icon: Building2 },
    { id: 'user', label: 'User Settings', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'legal', label: 'Legal', icon: FileText },
  ];

  return (
    <div className="flex-1 flex overflow-hidden bg-[#0a0a0a]">
      <div className="w-56 border-r border-gray-800 bg-[#0a0a0a] flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-1">Settings</h2>
          <p className="text-sm text-gray-400">Manage your account and company information</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-[#b89968] text-white'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-[#1a1a1a]'
                }`}
              >
                <IconComponent size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === 'company' && <CompanyInformation />}
        {activeTab === 'user' && <UserSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'legal' && <LegalSettings />}
      </div>
    </div>
  );
}
