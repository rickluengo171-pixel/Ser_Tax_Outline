import { useState } from 'react';
import { Plus, ChevronDown, Clock, Upload, MessageCircle, Paperclip, Send } from 'lucide-react';

interface Message {
  id: string;
  title: string;
  preview: string;
  status: 'NEEDS RESPONSE' | 'RESPONDED';
  category: 'FEDERAL' | 'CALIFORNIA' | 'NEW YORK';
  date: string;
  unread?: boolean;
}

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<string>('msg-1');

  const messages: Message[] = [
    {
      id: 'msg-1',
      title: 'Bank Statements - October 2025',
      preview: 'Could you please provide additional bank statements for October 2025? We noticed a few entries that need clarification.',
      status: 'NEEDS RESPONSE',
      category: 'FEDERAL',
      date: 'Feb 5',
      unread: true,
    },
    {
      id: 'msg-2',
      title: 'Equipment Depreciation Record',
      preview: 'Please provide depreciation schedules for equipment purchased in 2025, particularly items over...',
      status: 'NEEDS RESPONSE',
      category: 'FEDERAL',
      date: 'Feb 1',
      unread: true,
    },
    {
      id: 'msg-3',
      title: 'Question about Line 1a - Gross Receipts',
      preview: 'Great question! The gross receipts include all revenue from your business operations, including...',
      status: 'RESPONDED',
      category: 'FEDERAL',
      date: 'Feb 17',
    },
    {
      id: 'msg-4',
      title: 'New York Apportionment Schedule',
      preview: 'Missing New York apportionment documentation for the 2025 tax year. Please provide schedules...',
      status: 'NEEDS RESPONSE',
      category: 'NEW YORK',
      date: 'Jan 28',
      unread: true,
    },
  ];

  const selectedMsg = messages.find((m) => m.id === selectedMessage);

  return (
    <div className="flex h-full">
      <div className="w-[540px] border-r border-gray-800 flex flex-col bg-[#0a0a0a]">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-semibold mb-4">Messages</h1>
          <button className="w-full bg-[#b89968] hover:bg-[#a68959] text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Plus size={18} />
            New Message
          </button>
        </div>

        <div className="p-4 border-b border-gray-800">
          <button className="w-full bg-[#1a1a1a] hover:bg-[#242424] text-gray-300 py-2 px-3 rounded-lg flex items-center justify-between transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-sm">All Messages</span>
            </div>
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="bg-[#1a1a1a] mx-4 mt-4 mb-2 p-3 rounded-lg border border-[#d97706]">
          <div className="flex items-start gap-3">
            <Clock size={20} className="text-[#d97706] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white mb-0.5">
                3 messages need your response
              </div>
              <div className="text-xs text-gray-400">Click to view all action items</div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2">
            <div className="text-xs font-semibold text-gray-500 mb-2">FEDERAL (3)</div>
            {messages
              .filter((m) => m.category === 'FEDERAL')
              .map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`w-full text-left p-3 mb-2 rounded-lg transition-colors ${
                    selectedMessage === message.id
                      ? 'bg-[#1a1a1a] border border-gray-700'
                      : 'hover:bg-[#151515]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Upload size={18} className="text-gray-400 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-sm font-medium text-white truncate">
                          {message.title}
                        </h3>
                        {message.unread && (
                          <div className="w-2 h-2 bg-[#3b82f6] rounded-full flex-shrink-0 mt-1.5"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                        {message.preview}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-medium ${
                            message.status === 'NEEDS RESPONSE'
                              ? 'text-red-500'
                              : 'text-[#3b82f6]'
                          }`}
                        >
                          {message.status === 'NEEDS RESPONSE' ? (
                            <span className="flex items-center gap-1">
                              <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                              NEEDS RESPONSE
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <span className="inline-block w-1.5 h-1.5 bg-[#3b82f6] rounded-full"></span>
                              RESPONDED
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-gray-500">{message.date}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
          </div>

          <div className="px-4 py-2">
            <div className="text-xs font-semibold text-gray-500 mb-2">CALIFORNIA (2)</div>
            <div className="px-3 py-2">
              <button className="text-xs text-gray-500 hover:text-gray-400 flex items-center gap-1">
                Resolved (2) • Click to expand
                <ChevronDown size={12} />
              </button>
            </div>
          </div>

          <div className="px-4 py-2 pb-4">
            <div className="text-xs font-semibold text-gray-500 mb-2">NEW YORK (1)</div>
            {messages
              .filter((m) => m.category === 'NEW YORK')
              .map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`w-full text-left p-3 mb-2 rounded-lg transition-colors ${
                    selectedMessage === message.id
                      ? 'bg-[#1a1a1a] border border-gray-700'
                      : 'hover:bg-[#151515]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Upload size={18} className="text-gray-400 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-sm font-medium text-white truncate">
                          {message.title}
                        </h3>
                        {message.unread && (
                          <div className="w-2 h-2 bg-[#3b82f6] rounded-full flex-shrink-0 mt-1.5"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                        {message.preview}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-red-500 flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          NEEDS RESPONSE
                        </span>
                        <span className="text-xs text-gray-500">{message.date}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedMsg && (
          <>
            <div className="border-b border-gray-800 p-6">
              <div className="flex items-start gap-3 mb-3">
                <Upload size={20} className="text-gray-400 mt-1" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{selectedMsg.title}</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Document Request</span>
                    <span className="text-gray-600">Started Feb 5, 2026, 2:20 PM</span>
                    <span
                      className={`flex items-center gap-1 font-medium ${
                        selectedMsg.status === 'NEEDS RESPONSE'
                          ? 'text-red-500'
                          : 'text-[#3b82f6]'
                      }`}
                    >
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full ${
                          selectedMsg.status === 'NEEDS RESPONSE'
                            ? 'bg-red-500'
                            : 'bg-[#3b82f6]'
                        }`}
                      ></span>
                      {selectedMsg.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#1a1a1a] border border-gray-700 px-3 py-1.5 rounded text-sm flex items-center gap-2">
                  <Upload size={14} className="text-gray-400" />
                  Bank Statements - October 2025
                </div>
                <div className="bg-[#b89968] px-3 py-1.5 rounded text-sm">Federal</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl">
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="text-sm font-medium">
                      Sarah Chen <span className="text-gray-500 font-normal">Tax Preparer</span>
                    </div>
                    <div className="text-sm text-gray-500">Feb 5, 2026, 2:20 PM</div>
                  </div>
                  <div className="bg-[#1a1a1a] p-4 rounded-lg">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Could you please provide additional bank statements for October 2025? We
                      noticed a few entries that need clarification.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 p-6">
              <div className="max-w-4xl">
                <textarea
                  placeholder="Add a message (optional)..."
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-gray-600 mb-3"
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <Paperclip size={18} />
                    Attach Files
                    <span className="text-xs text-gray-600">
                      You can submit now - we'll follow up if needed
                    </span>
                  </button>
                  <button className="bg-[#b89968] hover:bg-[#a68959] text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Send size={16} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
