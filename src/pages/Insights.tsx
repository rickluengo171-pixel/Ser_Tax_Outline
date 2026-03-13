import { useState } from 'react';
import { ChevronDown, Lightbulb, CheckCircle } from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  category: 'tax-opportunities' | 'tax-planning' | 'compliance' | 'risk-monitoring';
  icon: 'trending' | 'calendar' | 'document';
  range: string;
  deadline?: string;
  description: string;
  basis: string;
  isNew?: boolean;
  actions: string[];
  hasCheckbox?: boolean;
}

export default function Insights() {
  const [activeTab, setActiveTab] = useState<'all' | 'tax-opportunities' | 'tax-planning' | 'compliance' | 'risk-monitoring'>('tax-opportunities');
  const [expandedId, setExpandedId] = useState<string>('');
  const [sortBy, setSortBy] = useState('deadline');
  const [markedAsActioned, setMarkedAsActioned] = useState<Set<string>>(new Set());

  const insights: Insight[] = [
    {
      id: 'bonus-depreciation',
      title: 'Bonus Depreciation Phase-Down',
      category: 'tax-opportunities',
      icon: 'trending',
      range: '$15,000 - $30,000',
      deadline: 'December 31, 2025',
      description: 'Bonus depreciation is decreasing from 80% to 60% for property placed in service in 2026. Consider accelerating planned equipment purchases into Q4 2025 to maximize first-year deductions.',
      basis: 'Based on Form 1120 — Line 20 - Depreciation: $45,000',
      actions: [
        'Review capital expenditure budget for 2026',
        'Identify purchases that can be accelerated to Q4 2025',
        'Ensure assets are placed in service before December 31, 2025',
      ],
      hasCheckbox: true,
    },
    {
      id: 'cost-segregation',
      title: 'Cost Segregation Study',
      category: 'tax-opportunities',
      icon: 'document',
      range: '$30,000 - $100,000',
      description: 'A cost segregation study can accelerate depreciation deductions on real property by reclassifying components.',
      basis: 'Based on property appraisal data',
      actions: [],
      hasCheckbox: false,
    },
    {
      id: 'rd-tax-credit',
      title: 'R&D Tax Credit Opportunity',
      category: 'tax-opportunities',
      icon: 'document',
      range: '$40,000 - $75,000',
      isNew: true,
      description: 'Based on your software development activities, you may qualify for federal and state R&D tax credits that were not claimed on this return.',
      basis: 'Based on Form 1120 — Line 13 - Salaries and wages: $320,000',
      actions: [
        'Document all software development activities',
        'Track employee time spent on qualified research',
        'Consider engaging R&D tax credit specialist',
      ],
      hasCheckbox: true,
    },
    {
      id: 'state-apportionment',
      title: 'State Tax Apportionment Review',
      category: 'tax-planning',
      icon: 'calendar',
      range: '$25,000 - $50,000 annually',
      deadline: 'December 31, 2025',
      description: 'Your California apportionment percentage is 45%. With remote workforce expansion, consider restructuring operations to optimize state tax allocation across jurisdictions.',
      basis: 'Based on CA Form 100 — Line 11 - Apportionment percentage: 45%',
      actions: [
        'Document where remote employees are physically working',
        'Review property locations and lease agreements',
        'Analyze sales destination vs. sourcing rules',
      ],
      hasCheckbox: true,
    },
  ];

  const filteredInsights = activeTab === 'all'
    ? insights
    : insights.filter(insight => insight.category === activeTab);

  const sortedInsights = [...filteredInsights].sort((a, b) => {
    if (sortBy === 'deadline') {
      const aDeadline = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const bDeadline = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return aDeadline - bDeadline;
    }
    return 0;
  });

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  const toggleActioned = (id: string) => {
    const newSet = new Set(markedAsActioned);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setMarkedAsActioned(newSet);
  };

  const opportunityCount = insights.filter(i => i.category === 'tax-opportunities').length;
  const planningCount = insights.filter(i => i.category === 'tax-planning').length;
  const opportunityRange = '$85,000-$205,000';

  return (
    <div className="flex-1 overflow-auto bg-[#121212]">
      <div className="border-b border-gray-800 sticky top-0 z-10 bg-[#121212]">
        <div className="max-w-6xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Lightbulb size={24} className="text-[#b89968]" />
              <div>
                <h1 className="text-2xl font-semibold text-white">Tax Insights</h1>
                <p className="text-sm text-gray-400">Personalized planning opportunities and risk considerations identified by your tax team based on your 2025 return.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-300">
              <span className="font-medium text-white">6 insights identified</span>
              {' • '}
              <span className="text-gray-400">{opportunityCount} Tax Opportunities · {planningCount} Tax Planning · 1 Compliance · 1 Risk & Monitoring</span>
              {' • '}
              <span className="text-green-500 font-medium">Opportunity range: {opportunityRange}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {['All', 'Tax Opportunities', 'Tax Planning', 'Compliance', 'Risk & Monitoring'].map((tab, idx) => {
              const tabValue = tab.toLowerCase().replace(' & ', '-').replace(' ', '-') as typeof activeTab;
              const isActive = activeTab === tabValue || (tab === 'All' && activeTab === 'all');

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab === 'All' ? 'all' : tabValue)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#b89968] text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tab}
                </button>
              );
            })}

            <div className="ml-auto flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm focus:outline-none focus:border-[#b89968] transition-colors"
              >
                <option value="deadline">Nearest deadline</option>
                <option value="impact">Highest impact</option>
              </select>

              <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="space-y-4">
          {sortedInsights.map((insight) => (
            <div
              key={insight.id}
              className="border border-gray-800 rounded-lg overflow-hidden bg-[#1a1a1a] transition-all"
            >
              <button
                onClick={() => toggleExpanded(insight.id)}
                className="w-full p-6 hover:bg-[#1f1f1f] transition-colors text-left flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {insight.icon === 'trending' && (
                        <svg className="w-5 h-5 text-[#b89968]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L5.343 19.657M1 21h8m0 0v-8m0 8L19.657 1.343" />
                        </svg>
                      )}
                      {insight.icon === 'calendar' && (
                        <svg className="w-5 h-5 text-[#b89968]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {insight.icon === 'document' && (
                        <svg className="w-5 h-5 text-[#b89968]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
                      {insight.isNew && (
                        <span className="text-xs font-semibold bg-gray-700 text-gray-300 px-2 py-1 rounded">NEW</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-400">
                      {insight.category === 'tax-opportunities' && 'Tax Opportunity'}
                      {insight.category === 'tax-planning' && 'Tax Planning'}
                      {insight.category === 'compliance' && 'Compliance'}
                      {insight.category === 'risk-monitoring' && 'Risk & Monitoring'}
                    </span>
                    <span className="text-green-500 font-medium">{insight.range}</span>
                    {insight.deadline && <span className="text-gray-400">• {insight.deadline}</span>}
                  </div>
                </div>
                <div className="ml-4">
                  {expandedId === insight.id ? (
                    <ChevronDown size={24} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={24} className="text-gray-500 transform rotate-180" />
                  )}
                </div>
              </button>

              {expandedId === insight.id && (
                <div className="px-6 pb-6 border-t border-gray-800">
                  <p className="text-gray-300 mb-6 leading-relaxed">{insight.description}</p>

                  <div className="bg-[#0a0a0a] border border-gray-800 rounded p-4 mb-6">
                    <p className="text-sm text-gray-400">{insight.basis}</p>
                    <button className="text-sm text-gray-400 hover:text-gray-300 mt-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View
                    </button>
                  </div>

                  {insight.actions.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white mb-3">Recommended Actions</h4>
                      <ul className="space-y-2">
                        {insight.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b89968] mt-1.5 flex-shrink-0"></span>
                            <span className="text-gray-300 text-sm">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Discuss with your preparer
                    </button>
                    {insight.hasCheckbox && (
                      <button
                        onClick={() => toggleActioned(insight.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          markedAsActioned.has(insight.id)
                            ? 'bg-green-900 bg-opacity-30 text-green-500'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <CheckCircle size={16} />
                        {markedAsActioned.has(insight.id) ? 'Marked as actioned' : 'Mark as actioned'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
