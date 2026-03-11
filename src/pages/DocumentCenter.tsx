import { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  Clock,
  Upload,
  FileText,
  CheckCircle,
  Download,
  MoreVertical,
} from 'lucide-react';

export default function DocumentCenter() {
  const [activeTab, setActiveTab] = useState<'my-documents' | 'from-preparer'>('my-documents');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('business-income');
  const [notificationDismissed, setNotificationDismissed] = useState(false);

  const documentCategories = [
    {
      id: 'assets-depreciation',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      title: 'Assets & Depreciation',
      count: 2,
      description: 'Equipment purchases, asset sales, and depreciation schedules',
    },
    {
      id: 'tax-credits',
      icon: Clock,
      iconColor: 'text-[#b89968]',
      title: 'Tax Credits & Payments',
      count: 2,
      description: 'Estimated tax payments, credits, and special deductions',
    },
    {
      id: 'entity-ownership',
      icon: Clock,
      iconColor: 'text-[#b89968]',
      title: 'Entity & Ownership Information',
      count: 1,
      description: 'Business formation documents and ownership changes',
    },
    {
      id: 'other-documents',
      icon: Clock,
      iconColor: 'text-gray-400',
      title: 'Other Documents',
      count: 1,
      description: 'Additional documents not assigned to a specific category',
    },
  ];

  const myDocumentsCategories = [
    {
      id: 'business-income',
      icon: Clock,
      iconColor: 'text-gray-400',
      title: 'Business Income',
      count: 3,
      description: 'Revenue, sales, and other income sources',
      documents: [
        {
          name: 'Business Bank Statements - Chase.pdf',
          uploadedDate: 'Uploaded on Jan 15, 2025 at 9:32 AM',
          subcategory: 'Bank Statements',
          status: 'ACCEPTED',
          statusColor: 'text-[#10b981]',
          lastUpdated: 'Jan 14, 2025',
        },
        {
          name: '1099-NEC Forms (3).pdf',
          uploadedDate: 'Uploaded on Jan 14, 2025 at 2:18 PM',
          subcategory: '1099 Forms',
          status: 'ACCEPTED',
          statusColor: 'text-[#10b981]',
          lastUpdated: 'Jan 13, 2025',
        },
        {
          name: 'Stripe Payment Summary 2025.pdf',
          uploadedDate: 'Uploaded on Jan 12, 2025 at 11:45 AM',
          subcategory: 'Merchant Statements',
          status: 'UNDER REVIEW',
          statusColor: 'text-[#3b82f6]',
          lastUpdated: 'Jan 11, 2025',
        },
      ],
    },
    {
      id: 'expenses-deductions',
      icon: Clock,
      iconColor: 'text-[#b89968]',
      title: 'Expenses & Deductions',
      count: 2,
      description: 'Business expenses, operating costs, and deductible items',
    },
    {
      id: 'assets-depreciation-my',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      title: 'Assets & Depreciation',
      count: 2,
      description: 'Equipment purchases, asset sales, and depreciation schedules',
    },
    {
      id: 'tax-credits-my',
      icon: Clock,
      iconColor: 'text-[#b89968]',
      title: 'Tax Credits & Payments',
      count: 2,
      description: 'Estimated tax payments, credits, and special deductions',
    },
  ];

  const fromPreparerDocuments = [
    {
      category: 'Your Tax Return',
      icon: 'pen',
      documents: [
        {
          name: 'Form 1120 - 2025 Federal Corporate Tax Return (Draft)',
          size: '2.4 MB',
          taxYear: '2025',
          status: 'REVIEW & SIGN',
          statusColor: 'text-[#b89968]',
          lastUpdated: 'Feb 19, 2026',
          hasAction: true,
        },
      ],
    },
    {
      category: 'Worksheets & Planning',
      documents: [
        {
          name: 'Tax Organizer - 2025.pdf',
          size: '856 KB',
          taxYear: '2025',
          status: 'AVAILABLE',
          statusColor: 'text-[#10b981]',
          lastUpdated: 'Jan 4, 2025',
        },
        {
          name: 'Estimated Tax Payments Worksheet.pdf',
          size: '124 KB',
          taxYear: '2025',
          status: 'AVAILABLE',
          statusColor: 'text-[#10b981]',
          lastUpdated: 'Jan 2, 2025',
        },
      ],
    },
    {
      category: 'Correspondence',
      documents: [
        {
          name: 'Q4 Tax Planning Memo.pdf',
          size: '89 KB',
          taxYear: '2025',
          status: 'AVAILABLE',
          statusColor: 'text-[#10b981]',
          lastUpdated: 'Dec 14, 2025',
        },
      ],
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-[1400px]">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-4">
            Acme Corp • 2025 Tax Year <span className="font-semibold text-white">Document Center</span>
          </div>
          <h1 className="text-3xl font-semibold mb-2">Document Center</h1>
          <p className="text-gray-400">View and manage all tax-related documents</p>
        </div>

        {activeTab === 'my-documents' && !notificationDismissed && (
          <div className="bg-[#1a1a1a] border border-[#b89968] rounded-lg p-4 mb-6 flex items-start gap-3">
            <div className="w-5 h-5 text-[#b89968] flex-shrink-0">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 011 1v4a1 1 0 11-2 0V7a1 1 0 011-1zm0 8a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-200">
                Your 2025 tax return is ready for your review and signature.
              </p>
            </div>
            <button
              onClick={() => setNotificationDismissed(true)}
              className="text-gray-500 hover:text-gray-300"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab('my-documents')}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeTab === 'my-documents'
                ? 'border-[#b89968] text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            My Documents{' '}
            <span className="inline-flex items-center justify-center w-5 h-5 bg-[#d97706] text-white text-xs rounded-full ml-1">
              1
            </span>
          </button>
          <button
            onClick={() => setActiveTab('from-preparer')}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeTab === 'from-preparer'
                ? 'border-[#b89968] text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            From Your Preparer{' '}
            <span className="inline-flex items-center justify-center w-5 h-5 bg-gray-700 text-white text-xs rounded-full ml-1">
              1
            </span>
          </button>
        </div>

        {activeTab === 'my-documents' && (
          <>
            <p className="text-sm text-gray-400 mb-6">
              Documents you uploaded during intake and supplemental materials
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-gray-400">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-400">Filters:</span>
              </div>
              <button className="px-3 py-1.5 bg-[#1a1a1a] border border-gray-700 rounded text-sm text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
                All Categories
              </button>
              <button className="px-3 py-1.5 bg-[#1a1a1a] border border-gray-700 rounded text-sm text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
                All Statuses
              </button>
              <div className="flex-1"></div>
              <div className="text-sm text-gray-400">Viewing: 2025 Tax Year</div>
            </div>

            <div className="space-y-4">
              {myDocumentsCategories.map((category) => {
                const isExpanded = expandedCategory === category.id;

                return (
                  <div
                    key={category.id}
                    className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full p-5 flex items-center gap-4 hover:bg-[#1f1f1f] transition-colors"
                    >
                      <category.icon size={20} className={category.iconColor} />
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-semibold text-white">{category.title}</h3>
                          <span className="text-sm text-gray-400">{category.count} documents</span>
                        </div>
                        <p className="text-sm text-gray-400">{category.description}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronDown size={20} className="text-gray-400" />
                      ) : (
                        <ChevronRight size={20} className="text-gray-400" />
                      )}
                    </button>

                    {isExpanded && category.documents && (
                      <div className="border-t border-gray-800">
                        <div className="px-5 py-3 bg-[#0f0f0f]">
                          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500">
                            <div className="col-span-5">Document Name</div>
                            <div className="col-span-2">Subcategory</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">Last Updated</div>
                            <div className="col-span-1"></div>
                          </div>
                        </div>
                        <div className="divide-y divide-gray-800">
                          {category.documents.map((doc, idx) => (
                            <div
                              key={idx}
                              className="px-5 py-4 hover:bg-[#1f1f1f] transition-colors"
                            >
                              <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-5">
                                  <div className="flex items-start gap-2">
                                    <FileText size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="text-sm text-white mb-0.5">{doc.name}</div>
                                      <div className="text-xs text-gray-500">{doc.uploadedDate}</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-sm text-gray-400">{doc.subcategory}</span>
                                </div>
                                <div className="col-span-2">
                                  <div className="flex items-center gap-1.5">
                                    {doc.status === 'ACCEPTED' ? (
                                      <CheckCircle size={14} className={doc.statusColor} />
                                    ) : (
                                      <Clock size={14} className={doc.statusColor} />
                                    )}
                                    <span className={`text-xs font-medium ${doc.statusColor}`}>
                                      {doc.status}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-sm text-gray-400">{doc.lastUpdated}</span>
                                </div>
                                <div className="col-span-1 flex items-center justify-end gap-2">
                                  <button className="p-1 hover:bg-gray-800 rounded transition-colors">
                                    <Download size={16} className="text-gray-400" />
                                  </button>
                                  <button className="p-1 hover:bg-gray-800 rounded transition-colors">
                                    <MoreVertical size={16} className="text-gray-400" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Additional Documents</h2>
              <p className="text-sm text-gray-400 mb-4">
                Use this to upload supplemental materials not tied to a specific document request.
                For requested replacements, use the "Upload replacement" button on the relevant
                document row.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <CheckCircle size={16} className="text-gray-500" />
                <span>Visible to your preparer immediately</span>
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-300 mb-2 block">
                  What is this document? (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Additional receipts for Q4 expenses"
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                />
              </div>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-gray-600 transition-colors cursor-pointer">
                <Upload size={32} className="text-gray-500 mx-auto mb-3" />
                <p className="text-sm text-gray-300 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, PNG, JPG, XLSX up to 10MB</p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'from-preparer' && (
          <>
            <p className="text-sm text-gray-400 mb-6">
              Documents prepared by your tax team, including your tax return and worksheets
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-gray-400">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-400">Filters:</span>
              </div>
              <button className="px-3 py-1.5 bg-[#1a1a1a] border border-gray-700 rounded text-sm text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
                All Categories
              </button>
              <div className="flex-1"></div>
              <div className="text-sm text-gray-400">Viewing: 2025 Tax Year</div>
            </div>

            <div className="space-y-6">
              {fromPreparerDocuments.map((section, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2 mb-3">
                    {section.icon === 'pen' && (
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-gray-400">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    )}
                    <h3 className="text-sm font-semibold text-white">{section.category}</h3>
                  </div>

                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">
                    <div className="px-5 py-3 bg-[#0f0f0f]">
                      <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500">
                        <div className="col-span-5">Document Name</div>
                        <div className="col-span-2">Tax Year</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Last Updated</div>
                        <div className="col-span-1"></div>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-800">
                      {section.documents.map((doc, docIdx) => (
                        <div
                          key={docIdx}
                          className="px-5 py-4 hover:bg-[#1f1f1f] transition-colors"
                        >
                          <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-5">
                              <div className="flex items-start gap-2">
                                <FileText size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="text-sm text-white mb-0.5">{doc.name}</div>
                                  <div className="text-xs text-gray-500">{doc.size}</div>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-2">
                              <span className="text-sm text-white">{doc.taxYear}</span>
                            </div>
                            <div className="col-span-2">
                              <span className={`text-xs font-medium ${doc.statusColor}`}>
                                {doc.status}
                              </span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-sm text-gray-400">{doc.lastUpdated}</span>
                            </div>
                            <div className="col-span-1 flex items-center justify-end gap-2">
                              {doc.hasAction ? (
                                <button className="px-4 py-1.5 bg-[#b89968] hover:bg-[#a68959] text-white text-sm rounded flex items-center gap-1 transition-colors">
                                  Review & Sign
                                  <ChevronRight size={14} />
                                </button>
                              ) : (
                                <button className="p-1 hover:bg-gray-800 rounded transition-colors">
                                  <Download size={16} className="text-gray-400" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
