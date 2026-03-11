import { useState } from 'react';
import {
  Lightbulb,
  DollarSign,
  TrendingUp,
  Calendar,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  category: 'Tax Opportunity' | 'Tax Planning' | 'Compliance' | 'Risk & Monitoring';
  value: string;
  deadline?: string;
  icon: 'dollar' | 'trending' | 'calendar' | 'alert';
  description?: string;
  basedOn?: string;
  actions?: string[];
  badge?: string;
}

export default function Insights() {
  const [expandedInsight, setExpandedInsight] = useState<string | null>('insight-2');

  const insights: Insight[] = [
    {
      id: 'insight-1',
      title: 'Estimated Tax Payment Planning',
      category: 'Compliance',
      value: 'Penalty avoided: up to $8,000',
      deadline: 'April 15, 2026',
      icon: 'dollar',
    },
    {
      id: 'insight-2',
      title: 'Bonus Depreciation Phase-Down',
      category: 'Tax Opportunity',
      value: '$15,000 - $30,000',
      deadline: 'December 31, 2025',
      icon: 'trending',
      description:
        'Bonus depreciation is decreasing from 80% to 60% for property placed in service in 2026. Consider accelerating planned equipment purchases into Q4 2025 to maximize first-year deductions.',
      basedOn: 'Based on Form 1120 — Line 20 · Depreciation: $45,000',
      actions: [
        'Review capital expenditure budget for 2026',
        'Identify purchases that can be accelerated to Q4 2025',
        'Ensure assets are placed in service before December 31, 2025',
      ],
    },
    {
      id: 'insight-3',
      title: 'State Tax Apportionment Review',
      category: 'Tax Planning',
      value: '$25,000 - $50,000 annually',
      icon: 'calendar',
      description:
        "Your California apportionment percentage is 45%. With remote workforce expansion, consider restructuring operations to optimize state tax allocation across jurisdictions.",
      basedOn: 'Based on CA Form 100 — Line 11 · Apportionment percentage: 45%',
      actions: [
        'Document where remote employees are physically working',
        'Review property locations and lease agreements',
        'Analyze sales destination vs. sourcing rules',
      ],
    },
    {
      id: 'insight-4',
      title: 'Interest Expense Limitation Monitoring',
      category: 'Risk & Monitoring',
      value: 'Potential exposure: $20,000 - $40,000',
      icon: 'alert',
    },
    {
      id: 'insight-5',
      title: 'Cost Segregation Study',
      category: 'Tax Opportunity',
      value: '$30,000 - $100,000',
      icon: 'trending',
    },
    {
      id: 'insight-6',
      title: 'R&D Tax Credit Opportunity',
      category: 'Tax Opportunity',
      value: '$40,000 - $75,000',
      icon: 'trending',
      badge: 'NEW',
      description:
        'Based on your software development activities, you may qualify for federal and state R&D tax credits that were not claimed on this return.',
      basedOn: 'Based on Form 1120 — Line 13 · Salaries and wages: $320,000',
      actions: [
        'Document all software development activities',
        'Track employee time spent on qualified research',
        'Consider engaging R&D tax credit specialist',
      ],
    },
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'dollar':
        return <DollarSign size={18} />;
      case 'trending':
        return <TrendingUp size={18} />;
      case 'calendar':
        return <Calendar size={18} />;
      case 'alert':
        return <AlertTriangle size={18} />;
      default:
        return <DollarSign size={18} />;
    }
  };

  const toggleInsight = (id: string) => {
    setExpandedInsight(expandedInsight === id ? null : id);
  };

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-4">
          Acme Corp • 2025 Tax Year <span className="font-semibold text-white">Insights</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb size={32} className="text-[#b89968]" />
          <h1 className="text-3xl font-semibold">Tax Insights</h1>
        </div>
        <p className="text-gray-400">
          Personalized planning opportunities and risk considerations identified by your tax team
          based on your 2025 return.
        </p>
      </div>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 mb-6">
        <div className="text-sm text-gray-300">
          <span className="font-semibold text-white">6 insights identified</span>{' '}
          <span className="text-gray-500">3 Tax Opportunities • 1 Tax Planning • 1 Compliance • 1 Risk & Monitoring</span>{' '}
          <span className="text-[#10b981] font-medium">Opportunity range: $85,000-$205,000</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button className="px-4 py-2 bg-[#b89968] text-white rounded-lg text-sm font-medium hover:bg-[#a68959] transition-colors">
          All
        </button>
        <button className="px-4 py-2 bg-transparent border border-gray-700 text-gray-400 rounded-lg text-sm hover:text-white hover:border-gray-600 transition-colors">
          Tax Opportunities
        </button>
        <button className="px-4 py-2 bg-transparent border border-gray-700 text-gray-400 rounded-lg text-sm hover:text-white hover:border-gray-600 transition-colors">
          Tax Planning
        </button>
        <button className="px-4 py-2 bg-transparent border border-gray-700 text-gray-400 rounded-lg text-sm hover:text-white hover:border-gray-600 transition-colors">
          Compliance
        </button>
        <button className="px-4 py-2 bg-transparent border border-gray-700 text-gray-400 rounded-lg text-sm hover:text-white hover:border-gray-600 transition-colors">
          Risk & Monitoring
        </button>
        <button className="px-4 py-2 bg-transparent border border-gray-700 text-gray-400 rounded-lg text-sm hover:text-white hover:border-gray-600 transition-colors">
          Sort by:
        </button>
        <button className="px-4 py-2 bg-transparent border border-gray-700 text-gray-400 rounded-lg text-sm hover:text-white hover:border-gray-600 transition-colors">
          Collapse All
        </button>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => {
          const isExpanded = expandedInsight === insight.id;

          return (
            <div
              key={insight.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors"
            >
              <button
                onClick={() => toggleInsight(insight.id)}
                className="w-full p-5 flex items-center gap-4 text-left"
              >
                <div className="w-10 h-10 bg-[#242424] rounded-lg flex items-center justify-center text-[#b89968] flex-shrink-0">
                  {getIcon(insight.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-white">{insight.title}</h3>
                    {insight.badge && (
                      <span className="bg-[#10b981] text-white text-xs px-2 py-0.5 rounded font-medium">
                        {insight.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-400">{insight.category}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-[#10b981] font-medium">{insight.value}</span>
                    {insight.deadline && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-400">{insight.deadline}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {isExpanded ? (
                    <ChevronDown size={20} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-400" />
                  )}
                </div>
              </button>

              {isExpanded && insight.description && (
                <div className="px-5 pb-5">
                  <div className="border-t border-gray-800 pt-5">
                    <p className="text-sm text-gray-300 leading-relaxed mb-5">
                      {insight.description}
                    </p>

                    {insight.basedOn && (
                      <div className="bg-[#121212] border border-gray-700 rounded-lg p-3 mb-5 flex items-center justify-between">
                        <span className="text-sm text-gray-400">{insight.basedOn}</span>
                        <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                          <ExternalLink size={14} />
                          View
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    )}

                    {insight.actions && insight.actions.length > 0 && (
                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-white mb-3">
                          Recommended Actions
                        </h4>
                        <ul className="space-y-2">
                          {insight.actions.map((action, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="text-gray-600 mt-0.5">•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-gray-700 px-4 py-2 rounded-lg transition-colors">
                        <MessageSquare size={16} />
                        Discuss with your preparer
                        <ChevronRight size={14} />
                      </button>
                      <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-gray-700 px-4 py-2 rounded-lg transition-colors">
                        <CheckCircle size={16} />
                        Mark as actioned
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
