import { useState } from 'react';

interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState<NotificationPreference[]>([
    {
      id: 'email-updates',
      title: 'Email Updates',
      description: 'Receive general email updates about your account',
      enabled: true,
    },
    {
      id: 'document-requests',
      title: 'Document Requests',
      description: 'Get notified when your preparer requests documents',
      enabled: true,
    },
    {
      id: 'status-changes',
      title: 'Status Changes',
      description: 'Updates when your tax return status changes',
      enabled: true,
    },
    {
      id: 'preparer-messages',
      title: 'Preparer Messages',
      description: 'Get notified when your preparer sends you a message',
      enabled: true,
    },
    {
      id: 'weekly-digest',
      title: 'Weekly Digest',
      description: 'Receive a weekly summary of activity',
      enabled: false,
    },
    {
      id: 'marketing-emails',
      title: 'Marketing Emails',
      description: 'Receive promotional and marketing emails',
      enabled: false,
    },
  ]);

  const handleToggle = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  return (
    <div className="flex-1 overflow-auto bg-[#121212]">
      <div className="p-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">Notification Preferences</h1>
          <p className="text-gray-400">Choose how you want to be notified about updates</p>
        </div>

        <div className="bg-white rounded-lg p-6 space-y-4">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
            >
              <div>
                <h3 className="font-medium text-gray-900">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.description}</p>
              </div>
              <button
                onClick={() => handleToggle(notification.id)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  notification.enabled ? 'bg-[#b89968]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    notification.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <button className="mt-8 px-6 py-2 bg-[#b89968] hover:bg-[#a68959] text-white font-medium rounded-lg transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
