import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FormData {
  step1: {
    businessNameConfirmed: string;
    addressChanged: string;
    entityType: string;
  };
  step2: {
    businessDocuments: string;
    accountingMethod: string;
  };
  step3: {
    incomeLines: string;
    deductions: string;
  };
  step4: {
    assets: string;
    liabilities: string;
  };
  step5: {
    relatedParties: string;
    otherInfo: string;
  };
  step6: {
    review: string;
  };
}

export default function TaxIntake() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    step1: { businessNameConfirmed: '', addressChanged: '', entityType: '' },
    step2: { businessDocuments: '', accountingMethod: '' },
    step3: { incomeLines: '', deductions: '' },
    step4: { assets: '', liabilities: '' },
    step5: { relatedParties: '', otherInfo: '' },
    step6: { review: '' },
  });

  const steps = [
    { number: 1, title: 'Basi\ncs\nInfo', shortTitle: 'Basic Info' },
    { number: 2, title: 'Financial\nDocume\nnts', shortTitle: 'Financial Documents' },
    { number: 3, title: 'Income\nReve\nnue', shortTitle: 'Income Revenue' },
    { number: 4, title: 'Busin\ness\nExpen\nses', shortTitle: 'Business Expenses' },
    { number: 5, title: 'Assets', shortTitle: 'Assets' },
    { number: 6, title: 'Rela\nted\nParty', shortTitle: 'Related Party' },
  ];

  const questions = [
    {
      step: 1,
      questions: [
        {
          id: 'businessNameConfirmed',
          question: 'Have you confirmed your business legal name and EIN?',
          required: true,
          options: ['Yes', 'No'],
          description: '',
        },
        {
          id: 'addressChanged',
          question: 'Has your business address changed this year?',
          required: false,
          options: ['Yes', 'No'],
          description: '',
          showSkip: true,
        },
        {
          id: 'entityType',
          question: 'What is your business entity type?',
          required: true,
          options: ['S-Corporation', 'C-Corporation', 'Partnership', 'LLC (taxed as S-Corp)', 'LLC (taxed as Partnership)', 'Other'],
          description: 'Your entity type determines which documents and tax forms are required for your return.',
        },
      ],
    },
    {
      step: 2,
      questions: [
        {
          id: 'businessDocuments',
          question: 'Do you have all required business documents?',
          required: true,
          options: ['Yes', 'No'],
          description: 'Bank statements, invoices, receipts, and other supporting documents',
        },
        {
          id: 'accountingMethod',
          question: 'What accounting method does your business use?',
          required: true,
          options: ['Cash', 'Accrual', 'Hybrid'],
          description: 'This determines how you record income and expenses',
        },
      ],
    },
    {
      step: 3,
      questions: [
        {
          id: 'incomeLines',
          question: 'Do you have income sources to report?',
          required: true,
          options: ['Yes', 'No'],
          description: 'Sales, services, investment income, or other revenue',
        },
        {
          id: 'deductions',
          question: 'Do you have business expenses to deduct?',
          required: true,
          options: ['Yes', 'No'],
          description: 'Operating costs, supplies, utilities, and other deductible expenses',
        },
      ],
    },
    {
      step: 4,
      questions: [
        {
          id: 'assets',
          question: 'Do you have capital assets or depreciation?',
          required: true,
          options: ['Yes', 'No'],
          description: 'Equipment, property, vehicles, or other assets purchased this year',
        },
        {
          id: 'liabilities',
          question: 'Do you have business liabilities to report?',
          required: true,
          options: ['Yes', 'No'],
          description: 'Business loans, credit lines, or other outstanding debts',
        },
      ],
    },
    {
      step: 5,
      questions: [
        {
          id: 'relatedParties',
          question: 'Do you have related party transactions?',
          required: false,
          options: ['Yes', 'No'],
          description: 'Transactions with family members or other related entities',
          showSkip: true,
        },
        {
          id: 'otherInfo',
          question: 'Are there any other important details for your return?',
          required: false,
          options: ['Yes', 'No'],
          description: 'Important information that may affect your tax return',
          showSkip: true,
        },
      ],
    },
    {
      step: 6,
      questions: [
        {
          id: 'review',
          question: 'Please review your information',
          required: false,
          options: [],
          description: 'Summary of your tax intake information',
          isReview: true,
        },
      ],
    },
  ];

  const currentQuestions = questions.find((q) => q.step === currentStep)?.questions || [];

  const handleAnswer = (questionId: string, value: string) => {
    const stepKey = `step${currentStep}` as keyof FormData;
    setFormData({
      ...formData,
      [stepKey]: {
        ...formData[stepKey],
        [questionId]: value,
      },
    });
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepProgress = () => {
    const totalQuestions = currentQuestions.length;
    if (totalQuestions === 0) return 0;
    const answered = currentQuestions.filter((q) => {
      const stepKey = `step${currentStep}` as keyof FormData;
      const value = formData[stepKey][q.id as keyof FormData[keyof FormData]];
      return value !== '';
    }).length;
    return Math.ceil((answered / totalQuestions) * 100);
  };

  const isCurrentStepValid = () => {
    return currentQuestions.every((q) => {
      if (!q.required) return true;
      const stepKey = `step${currentStep}` as keyof FormData;
      const value = formData[stepKey][q.id as keyof FormData[keyof FormData]];
      return value !== '';
    });
  };

  return (
    <div className="flex-1 overflow-auto bg-[#0a0a0a]">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-4">
              Acme Corp • 2025 Tax Year
              <span className="font-semibold text-white ml-1">Guided Intake</span>
              <span className="ml-2 text-[#b89968]">
                {currentStep === 1 ? 'Basic Business Information' : ''}
                {currentStep === 2 ? 'Financial Documents' : ''}
                {currentStep === 3 ? 'Income & Revenue' : ''}
                {currentStep === 4 ? 'Business Expenses' : ''}
                {currentStep === 5 ? 'Assets' : ''}
                {currentStep === 6 ? 'Review' : ''}
              </span>
              <span className="ml-2 text-[#3b82f6] text-xs">IN PROGRESS</span>
            </div>

            <div className="mt-8 mb-8">
              <div className="flex items-start justify-between gap-2">
                {steps.map((step, idx) => {
                  const isActive = step.number === currentStep;
                  const isCompleted = step.number < currentStep;

                  return (
                    <div key={step.number} className="flex flex-col items-center flex-1">
                      <div className="flex items-center w-full justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                            isActive
                              ? 'bg-[#b89968] text-white'
                              : isCompleted
                                ? 'bg-[#10b981] text-white'
                                : 'bg-gray-700 text-gray-400'
                          }`}
                        >
                          {isCompleted ? '✓' : step.number}
                        </div>
                        {idx < steps.length - 1 && (
                          <div
                            className={`flex-1 h-1 mx-2 ${
                              isCompleted ? 'bg-[#10b981]' : 'bg-gray-700'
                            }`}
                          />
                        )}
                      </div>
                      <div className="text-xs text-center text-gray-400 whitespace-nowrap">
                        <div className="text-xs">{step.shortTitle.split(' ')[0]}</div>
                        {step.shortTitle.split(' ').length > 1 && (
                          <div className="text-xs">{step.shortTitle.split(' ').slice(1).join(' ')}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center mb-12">
              <div className="text-sm text-gray-400">
                Section {currentStep} of 6 • Question {currentQuestions.length > 0 ? 1 : 0} of{' '}
                {currentQuestions.length}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {currentStep === 6 ? (
              <div className="text-center py-12">
                <h2 className="text-3xl font-semibold mb-4">Intake Complete</h2>
                <p className="text-gray-400 mb-8">Your tax intake information has been submitted.</p>
                <button className="px-6 py-2 bg-[#b89968] hover:bg-[#a68959] text-white rounded-lg transition-colors">
                  Save & Exit
                </button>
              </div>
            ) : (
              currentQuestions.map((question, idx) => (
                <div key={question.id}>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-semibold">{question.question}</h2>
                      {question.required ? (
                        <span className="text-xs font-semibold text-red-500">REQUIRED</span>
                      ) : (
                        <span className="text-xs font-semibold text-gray-500">OPTIONAL</span>
                      )}
                    </div>
                    {question.description && (
                      <p className="text-gray-400 text-sm mt-2">{question.description}</p>
                    )}
                  </div>

                  <div className="space-y-3 mb-12">
                    {question.options.map((option) => {
                      const stepKey = `step${currentStep}` as keyof FormData;
                      const isSelected =
                        formData[stepKey][question.id as keyof FormData[keyof FormData]] === option;

                      return (
                        <button
                          key={option}
                          onClick={() => handleAnswer(question.id, option)}
                          className={`w-full p-5 rounded-lg border-2 transition-all text-left flex items-center gap-4 ${
                            isSelected
                              ? 'border-[#b89968] bg-[#1a1a1a]'
                              : 'border-gray-700 bg-[#1a1a1a] hover:bg-[#1f1f1f]'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-[#b89968] bg-[#b89968]'
                                : 'border-gray-500'
                            }`}
                          >
                            {isSelected && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <span className={isSelected ? 'text-white font-medium' : 'text-gray-300'}>
                            {option}
                          </span>
                          {isSelected && (
                            <div className="ml-auto">
                              <svg
                                className="w-5 h-5 text-[#b89968]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-800">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentStep === 1
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="flex items-center gap-4">
              {currentStep < 6 && question.showSkip && (
                <button className="text-gray-400 hover:text-white transition-colors">
                  Skip for now
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!isCurrentStepValid()}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                  isCurrentStepValid()
                    ? 'bg-[#b89968] hover:bg-[#a68959] text-white'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
