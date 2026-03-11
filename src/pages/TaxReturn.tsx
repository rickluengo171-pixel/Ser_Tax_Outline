import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FileText,
  ExternalLink,
  Lightbulb,
  MessageSquare,
  Send,
} from 'lucide-react';

interface TaxLine {
  line: string;
  description: string;
  amount2025: string | number;
  amount2024?: string | number;
  isHighlighted?: boolean;
  isSubtotal?: boolean;
  isTotal?: boolean;
}

export default function TaxReturn() {
  const [selectedSection, setSelectedSection] = useState('income');
  const [selectedLine, setSelectedLine] = useState('1a');
  const [expandedSections, setExpandedSections] = useState<string[]>(['income']);
  const [activeTab, setActiveTab] = useState('federal');

  const menuSections = [
    {
      id: 'income',
      label: 'Income',
      subsections: [
        { id: '1a-1c', label: 'Line 1a-1c' },
        { id: '2-3', label: 'Line 2-3' },
        { id: '4-10', label: 'Line 4-10' },
        { id: '11', label: 'Line 11' },
      ],
    },
    {
      id: 'deductions',
      label: 'Deductions',
      subsections: [
        { id: '12-26', label: 'Line 12-26' },
        { id: '27', label: 'Line 27' },
      ],
    },
    {
      id: 'tax-payments',
      label: 'Tax & Payments',
      subsections: [],
    },
  ];

  const incomeLines: TaxLine[] = [
    { line: '1a', description: 'Gross receipts', amount2025: '8,750,000', amount2024: '8,500,000', isHighlighted: true },
    { line: '2', description: 'COGS', amount2025: '5,250,000', amount2024: '5,000,000' },
    { line: '3', description: 'Gross profit', amount2025: '3,500,000', amount2024: '3,500,000' },
    { line: '4', description: 'Dividends', amount2025: '125,000', amount2024: '110,000' },
    { line: '5', description: 'Interest', amount2025: '45,000', amount2024: '38,000' },
    { line: '6', description: 'Gross rents', amount2025: '-', amount2024: '-' },
    { line: '7', description: 'Gross royalties', amount2025: '-', amount2024: '-' },
    { line: '8', description: 'Capital gain net income', amount2025: '-', amount2024: '-' },
  ];

  const deductionLines: TaxLine[] = [
    { line: '14', description: 'Repairs & maintenance', amount2025: '85,000', amount2024: '72,000' },
    { line: '15', description: 'Bad debts', amount2025: '15,000', amount2024: '18,000' },
    { line: '16', description: 'Rents', amount2025: '240,000', amount2024: '230,000' },
    { line: '17', description: 'Taxes and licenses', amount2025: '125,000', amount2024: '118,000' },
    { line: '18', description: 'Interest expense', amount2025: '95,000', amount2024: '105,000' },
    { line: '19', description: 'Charitable contributions', amount2025: '50,000', amount2024: '45,000' },
    { line: '20', description: 'Depreciation', amount2025: '175,000', amount2024: '165,000' },
    { line: '26', description: 'Other deductions', amount2025: '425,000', amount2024: '410,000' },
    { line: '27', description: 'Total deductions', amount2025: '2,860,000', amount2024: '2,743,000', isSubtotal: true },
    { line: '28', description: 'Taxable income before NOL', amount2025: '885,000', amount2024: '967,000', isTotal: true },
    { line: '29a', description: 'Net operating loss deduction', amount2025: '-', amount2024: '-' },
    { line: '29b', description: 'Special deductions', amount2025: '87,500', amount2024: '77,000' },
    { line: '30', description: 'Taxable income', amount2025: '797,500', amount2024: '890,000', isTotal: true },
  ];

  const toggleSection = (sectionId: string) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter((id) => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  return (
    <div className="flex h-screen bg-[#121212]">
      <div className="w-[280px] bg-[#0a0a0a] border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition-colors">
            <ChevronLeft size={16} />
            Back
          </button>
          <div className="mb-2">
            <div className="text-xs text-gray-500">Form 1120</div>
            <div className="text-sm font-semibold text-white">Acme Corporation</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {menuSections.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            return (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full px-4 py-2.5 flex items-center justify-between text-sm transition-colors ${
                    selectedSection === section.id
                      ? 'bg-[#1a1a1a] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-[#151515]'
                  }`}
                >
                  <span>{section.label}</span>
                  {section.subsections.length > 0 && (
                    <ChevronRight
                      size={14}
                      className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  )}
                </button>
                {isExpanded && section.subsections.length > 0 && (
                  <div className="bg-[#0f0f0f]">
                    {section.subsections.map((subsection) => (
                      <button
                        key={subsection.id}
                        onClick={() => setSelectedLine(subsection.id)}
                        className={`w-full px-8 py-2 text-left text-sm transition-colors ${
                          selectedLine === subsection.id
                            ? 'bg-[#b89968] text-white'
                            : 'text-gray-400 hover:text-white hover:bg-[#151515]'
                        }`}
                      >
                        {subsection.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-gray-800 px-6 py-4">
          <div className="text-sm text-gray-500 mb-3">
            Acme Corp • 2025 Tax Year <span className="font-semibold text-white">Tax Return</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl font-semibold">Tax Return</h1>
                <span className="px-2.5 py-0.5 bg-[#1a1a1a] border border-gray-700 text-xs text-gray-400 rounded">
                  Draft for Review
                </span>
              </div>
              <p className="text-sm text-gray-400">U.S. Corporation Income Tax Return</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-[#10b981]">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Ready to approve</span>
              </div>
              <button className="px-4 py-2 bg-[#b89968] hover:bg-[#a68959] text-white rounded-lg flex items-center gap-2 transition-colors">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Approve Draft
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('federal')}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                activeTab === 'federal'
                  ? 'bg-[#b89968] text-white'
                  : 'bg-transparent text-gray-400 hover:text-white'
              }`}
            >
              Federal
            </button>
            <button
              onClick={() => setActiveTab('state')}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'state'
                  ? 'bg-[#b89968] text-white'
                  : 'bg-transparent text-gray-400 hover:text-white'
              }`}
            >
              State Returns
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Form 1120</h2>
                      <p className="text-sm text-gray-600">U.S. Corporation Income Tax Return</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-700">Tax Year</div>
                      <div className="text-xl font-bold text-gray-900">2025</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div className="font-semibold">Entity Name</div>
                    <div className="text-base">Acme Corporation</div>
                  </div>
                </div>

                <div className="bg-amber-50 px-8 py-3 border-b border-amber-100">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Lightbulb size={16} className="text-gray-600" />
                    <span className="font-medium">Select any line</span>
                    <span className="text-gray-600">
                      to view source documents, tax code references, and your preparer's notes.
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-gray-600 font-medium w-16">Line</th>
                        <th className="text-left py-2 text-gray-600 font-medium">Description</th>
                        <th className="text-right py-2 text-gray-600 font-medium w-32">2025</th>
                        <th className="text-right py-2 text-gray-600 font-medium w-32">2024 <span className="text-xs text-gray-400 font-normal">Comparison</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedLine.includes('1a') && incomeLines.map((line, idx) => (
                        <tr
                          key={idx}
                          className={`border-b border-gray-100 hover:bg-blue-50 transition-colors cursor-pointer ${
                            line.isHighlighted ? 'bg-blue-50' : ''
                          } ${line.isTotal ? 'font-semibold bg-gray-50' : ''}`}
                        >
                          <td className="py-3 text-blue-600 font-medium">{line.line}</td>
                          <td className="py-3 text-gray-900">{line.description}</td>
                          <td className="py-3 text-right text-blue-600 font-medium">
                            {typeof line.amount2025 === 'number' || line.amount2025 !== '-'
                              ? line.amount2025
                              : '-'}
                          </td>
                          <td className="py-3 text-right text-gray-500">
                            {line.amount2024 || '-'}
                          </td>
                        </tr>
                      ))}

                      {selectedLine.includes('12-26') && deductionLines.map((line, idx) => (
                        <tr
                          key={idx}
                          className={`border-b border-gray-100 hover:bg-blue-50 transition-colors cursor-pointer ${
                            line.isSubtotal || line.isTotal ? 'font-semibold bg-gray-50' : ''
                          }`}
                        >
                          <td className="py-3 text-blue-600 font-medium">{line.line}</td>
                          <td className="py-3 text-gray-900">{line.description}</td>
                          <td className="py-3 text-right text-blue-600 font-medium">
                            {typeof line.amount2025 === 'number' || line.amount2025 !== '-'
                              ? line.amount2025
                              : '-'}
                          </td>
                          <td className="py-3 text-right text-gray-500">
                            {line.amount2024 || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-6 p-4 bg-gray-50 rounded text-xs text-gray-600">
                    This is an executive summary for review purposes only. All amounts are rounded
                    to the nearest dollar. Final tax liability calculations are prepared by your CPA
                    team.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[380px] border-l border-gray-800 flex flex-col bg-[#0a0a0a]">
            <div className="p-5 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold">Line 1a — Gross receipts</h3>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <div className="text-xs text-gray-500">Form 1120 • Federal</div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">Amount</div>
                <div className="text-2xl font-bold text-white">$8,750,000</div>
              </div>

              <button className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 mb-3 hover:bg-[#1f1f1f] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 text-gray-400">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">OUR VIEW</span>
                  </div>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </button>

              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  Total revenue from product sales and services provided during the tax year,
                  including all cash and credit sales.
                </p>
                <div className="text-xs text-gray-500 mb-2">Related State Lines:</div>
                <button className="w-full bg-[#121212] border border-gray-700 rounded px-3 py-2 flex items-center justify-between hover:border-gray-600 transition-colors">
                  <span className="text-sm text-gray-300">CA Form 100, Line 1</span>
                  <ChevronRight size={14} className="text-gray-400" />
                </button>
              </div>

              <button className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 mb-3 flex items-center justify-between hover:bg-[#1f1f1f] transition-colors">
                <div className="flex items-center gap-2 text-sm text-white">
                  <FileText size={16} className="text-gray-400" />
                  <span>SOURCE DOCUMENTS</span>
                </div>
                <ChevronRight size={14} className="text-gray-400" />
              </button>

              <button className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 mb-6 flex items-center justify-between hover:bg-[#1f1f1f] transition-colors">
                <div className="flex items-center gap-2 text-sm text-white">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-gray-400">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>TAX CODE REFERENCES</span>
                </div>
                <ChevronRight size={14} className="text-gray-400" />
              </button>

              <div className="mb-6">
                <button className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 mb-3 flex items-center justify-between hover:bg-[#1f1f1f] transition-colors">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <MessageSquare size={16} className="text-gray-400" />
                    <span>ADD REVIEW COMMENTS</span>
                  </div>
                </button>
              </div>

              <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4">
                <textarea
                  placeholder="Ask questions or provide feedback about this line"
                  className="w-full bg-[#121212] border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-gray-600 mb-3"
                  rows={3}
                />
                <button className="w-full bg-[#b89968] hover:bg-[#a68959] text-white py-2 rounded flex items-center justify-center gap-2 transition-colors">
                  <Send size={14} />
                  Submit Comment
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Your comment will be sent to your preparer as a message. You'll be notified when
                  they respond.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-800 p-4">
              <button className="w-full bg-[#1a1a1a] hover:bg-[#1f1f1f] border border-gray-700 text-white py-2.5 rounded flex items-center justify-center gap-2 transition-colors">
                <Lightbulb size={16} />
                <span className="text-sm">View insights for this line</span>
                <ChevronRight size={14} />
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Planning insights and key considerations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
