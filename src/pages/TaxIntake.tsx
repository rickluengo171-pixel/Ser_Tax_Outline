import { useState } from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  description?: string;
  required: boolean;
  options: string[];
}

interface Section {
  id: number;
  title: string;
  shortTitle: string;
  questions: Question[];
}

export default function TaxIntake() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const sections: Section[] = [
    {
      id: 1,
      title: 'Basic Business Information',
      shortTitle: 'Basic\nInfo',
      questions: [
        {
          id: 'q1_1',
          question: 'What is your business entity type?',
          description: 'Your entity type determines which documents and tax forms are required for your return.',
          required: true,
          options: ['S-Corporation', 'C-Corporation', 'Partnership', 'LLC (taxed as S-Corp)', 'LLC (taxed as Partnership)', 'Other'],
        },
        {
          id: 'q1_2',
          question: 'Have you confirmed your business legal name and EIN?',
          required: true,
          options: ['Yes', 'No'],
        },
        {
          id: 'q1_3',
          question: 'Has your business address changed this year?',
          required: false,
          options: ['Yes', 'No'],
        },
        {
          id: 'q1_4',
          question: 'Do you operate in multiple states?',
          required: false,
          options: ['Yes', 'No'],
        },
      ],
    },
    {
      id: 2,
      title: 'Financial Documents',
      shortTitle: 'Financial\nDocume\nnts',
      questions: [
        {
          id: 'q2_1',
          question: 'Do you have bank statements for all business accounts?',
          required: false,
          options: ['Yes', 'No'],
        },
        {
          id: 'q2_2',
          question: 'Do you have all required business documents?',
          description: 'Bank statements, invoices, receipts, and other supporting documents',
          required: true,
          options: ['Yes', 'No'],
        },
        {
          id: 'q2_3',
          question: 'What accounting method does your business use?',
          description: 'This determines how you record income and expenses',
          required: true,
          options: ['Cash', 'Accrual', 'Hybrid'],
        },
      ],
    },
    {
      id: 3,
      title: 'Income & Revenue',
      shortTitle: 'Income\n&\nReve\nnue',
      questions: [
        {
          id: 'q3_1',
          question: 'Do you have income sources to report?',
          description: 'Sales, services, investment income, or other revenue',
          required: true,
          options: ['Yes', 'No'],
        },
      ],
    },
    {
      id: 4,
      title: 'Business Expenses',
      shortTitle: 'Busin\ness\nExpen\nses',
      questions: [
        {
          id: 'q4_1',
          question: 'Do you have business expenses to deduct?',
          description: 'Operating costs, supplies, utilities, and other deductible expenses',
          required: true,
          options: ['Yes', 'No'],
        },
      ],
    },
    {
      id: 5,
      title: 'Assets',
      shortTitle: 'Assets',
      questions: [
        {
          id: 'q5_1',
          question: 'Do you have capital assets or depreciation?',
          description: 'Equipment, property, vehicles, or other assets purchased this year',
          required: true,
          options: ['Yes', 'No'],
        },
      ],
    },
    {
      id: 6,
      title: 'Related Party',
      shortTitle: 'Rela\nted\nParty',
      questions: [
        {
          id: 'q6_1',
          question: 'Do you have related party transactions?',
          description: 'Transactions with family members or other related entities',
          required: false,
          options: ['Yes', 'No'],
        },
      ],
    },
  ];

  const allQuestions = sections.flatMap(section => section.questions);
  const currentQuestion = allQuestions[currentQuestionIndex];

  const getCurrentSection = () => {
    let count = 0;
    for (const section of sections) {
      if (currentQuestionIndex < count + section.questions.length) {
        return {
          section,
          questionInSection: currentQuestionIndex - count + 1,
        };
      }
      count += section.questions.length;
    }
    return { section: sections[0], questionInSection: 1 };
  };

  const { section: currentSection, questionInSection } = getCurrentSection();

  const getCompletedSections = () => {
    const completed: number[] = [];
    let count = 0;
    for (const section of sections) {
      const sectionQuestions = section.questions;
      const allAnswered = sectionQuestions.every(q => answers[q.id]);
      if (allAnswered && currentQuestionIndex > count + section.questions.length - 1) {
        completed.push(section.id);
      }
      count += section.questions.length;
    }
    return completed;
  };

  const completedSections = getCompletedSections();

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const canProceed = () => {
    if (currentQuestion.required) {
      return !!answers[currentQuestion.id];
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-400">Acme Corp • 2025 Tax Year</span>
              <span className="text-white font-medium">Guided Intake</span>
              <span className="text-gray-400">•</span>
              <span className="text-white">{currentSection.title}</span>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-400 text-xs font-medium">IN PROGRESS</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Saved just now</span>
              </div>
              <button className="text-sm text-gray-300 hover:text-white transition-colors">
                Save & Exit
              </button>
            </div>
          </div>

          <div className="flex items-start justify-between gap-1 mb-6">
            {sections.map((section, idx) => {
              const isCompleted = completedSections.includes(section.id);
              const isCurrent = section.id === currentSection.id;

              return (
                <div key={section.id} className="flex items-start flex-1">
                  <div className="flex flex-col items-center w-full">
                    <div className="flex items-center w-full">
                      {idx > 0 && (
                        <div className={`flex-1 h-0.5 ${isCompleted ? 'bg-[#10b981]' : 'bg-gray-700'}`}></div>
                      )}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm mx-1 flex-shrink-0 ${
                          isCompleted
                            ? 'bg-[#10b981] text-white'
                            : isCurrent
                            ? 'bg-[#b89968] text-white'
                            : 'bg-gray-700 text-gray-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle size={20} strokeWidth={2.5} /> : section.id}
                      </div>
                      {idx < sections.length - 1 && (
                        <div className={`flex-1 h-0.5 ${isCompleted ? 'bg-[#10b981]' : 'bg-gray-700'}`}></div>
                      )}
                    </div>
                    <div className="text-xs text-center text-gray-400 mt-3 leading-tight whitespace-pre-line">
                      {section.shortTitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center text-sm text-gray-400">
            Section {currentSection.id} of 6 • Question {questionInSection} of {currentSection.questions.length}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-2xl font-normal">{currentQuestion.question}</h1>
            {currentQuestion.required ? (
              <span className="text-xs font-semibold text-red-500">REQUIRED</span>
            ) : (
              <span className="text-xs font-semibold text-gray-500">OPTIONAL</span>
            )}
          </div>
          {currentQuestion.description && (
            <p className="text-sm text-gray-400">{currentQuestion.description}</p>
          )}
        </div>

        <div className="space-y-3 mb-16">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option;

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 rounded-lg border transition-all text-left flex items-center gap-3 ${
                  isSelected
                    ? 'border-[#b89968] bg-[#1a1a1a]'
                    : 'border-gray-700 bg-[#1a1a1a] hover:border-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-[#b89968]' : 'border-gray-500'
                  }`}
                >
                  {isSelected && <div className="w-3 h-3 rounded-full bg-[#b89968]"></div>}
                </div>
                <span className="text-base text-white flex-1">{option}</span>
                {isSelected && (
                  <CheckCircle size={20} className="text-[#b89968] flex-shrink-0" strokeWidth={2} />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-800">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 text-sm transition-colors ${
              currentQuestionIndex === 0
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="flex items-center gap-4">
            {!currentQuestion.required && (
              <button
                onClick={handleNext}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Skip for now
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                canProceed()
                  ? 'bg-[#b89968] hover:bg-[#a68959] text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
