import { useState } from 'react';
import { CheckCircle2, Circle, FileText, AlertCircle, ChevronDown, ArrowRight, Calendar } from 'lucide-react';

export default function StatusTracker() {
  const [activeTab, setActiveTab] = useState<'federal' | 'state'>('federal');
  const [showPendingRequests, setShowPendingRequests] = useState(false);

  const stages = [
    { id: 1, label: 'Intake Complete', sublabel: '', status: 'completed' },
    { id: 2, label: 'In Preparation', sublabel: '', status: 'completed' },
    { id: 3, label: 'Ready for Review', sublabel: 'your review', status: 'current' },
    { id: 4, label: 'Approved to File', sublabel: '', status: 'pending' },
    { id: 5, label: 'Filed', sublabel: '', status: 'pending' },
  ];

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-4">
          Acme Corp • 2025 Tax Year <span className="font-semibold text-white">Status</span>
        </div>
        <h1 className="text-3xl font-semibold mb-2">Good morning, Sarah</h1>
        <p className="text-gray-400">Here's where things stand with your 2025 tax return</p>
      </div>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 mb-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Tax Return Progress</h2>
          <p className="text-sm text-gray-400">Track your journey from intake to filing</p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-12">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex flex-col items-center flex-1 relative">
                <div className="flex items-center w-full">
                  {index > 0 && (
                    <div
                      className={`flex-1 h-0.5 ${
                        stage.status === 'completed' || stage.status === 'current'
                          ? 'bg-[#b89968]'
                          : 'bg-gray-700'
                      }`}
                    ></div>
                  )}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      stage.status === 'completed'
                        ? 'bg-[#b89968] border-[#b89968]'
                        : stage.status === 'current'
                        ? 'bg-transparent border-[#b89968]'
                        : 'bg-transparent border-gray-700'
                    } ${index === 0 ? 'ml-0' : ''} ${index === stages.length - 1 ? 'mr-0' : ''}`}
                  >
                    {stage.status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : stage.status === 'current' ? (
                      <div className="w-3 h-3 bg-[#b89968] rounded-full"></div>
                    ) : (
                      <Circle className="w-6 h-6 text-gray-700" />
                    )}
                  </div>
                  {index < stages.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 ${
                        stage.status === 'completed' ? 'bg-[#b89968]' : 'bg-gray-700'
                      }`}
                    ></div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <div
                    className={`text-sm font-medium ${
                      stage.status === 'completed' || stage.status === 'current'
                        ? 'text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    {stage.label}
                  </div>
                  {stage.sublabel && (
                    <div className="text-xs text-gray-500 mt-1">{stage.sublabel}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Action Items</h2>

        <div className="bg-[#1a1a1a] border border-[#b89968] rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-[#b89968] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-base font-semibold mb-1">Draft Ready for Review</h3>
              <p className="text-sm text-gray-400">
                Review, leave comments, and approve when ready
              </p>
            </div>
            <button className="bg-[#b89968] hover:bg-[#a68959] text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-colors">
              Review
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-300">
              <span className="font-semibold">Federal</span> and{' '}
              <span className="font-semibold">New York</span> require your attention
            </span>
          </div>
          <button className="text-sm text-white hover:text-gray-300 px-4 py-1.5 border border-gray-600 rounded-lg transition-colors">
            View
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setActiveTab('federal')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'federal'
              ? 'bg-[#b89968] text-white'
              : 'bg-transparent text-gray-400 hover:text-white'
          }`}
        >
          Federal
        </button>
        <button
          onClick={() => setActiveTab('state')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'state'
              ? 'bg-[#b89968] text-white'
              : 'bg-transparent text-gray-400 hover:text-white'
          }`}
        >
          State Returns
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg">
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[#3b82f6] rounded flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold">Federal</h3>
                <span className="text-sm text-gray-400">Awaiting your review</span>
              </div>
            </div>
            <button className="bg-[#b89968] hover:bg-[#a68959] text-white text-sm px-4 py-1.5 rounded transition-colors">
              REVIEW
            </button>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              Due Apr 14
            </div>
            <span>•</span>
            <span>Form 1120</span>
          </div>

          <div className="bg-[#121212] border border-gray-700 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#b89968] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300">Draft return ready for your review</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <button
            onClick={() => setShowPendingRequests(!showPendingRequests)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Pending requests</span>
              <span className="bg-[#d97706] text-white text-xs px-2 py-0.5 rounded-full">
                1
              </span>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform ${
                showPendingRequests ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showPendingRequests && (
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-sm text-gray-400">Pending request details would appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
