import React, { useState } from 'react';
import { Question, Answer } from '../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  onComplete: (answers: Answer[]) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      selectedOption: selectedOption,
      category: currentQuestion.category as string
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(updatedAnswers);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Question {currentIndex + 1} of {questions.length}
            </h2>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              {currentQuestion.category}
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-snug">
            {currentQuestion.text}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group flex items-center justify-between
                  ${selectedOption === option 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                    : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-700'
                  }`}
              >
                <span className="font-medium text-lg">{option}</span>
                {selectedOption === option && (
                  <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`
              px-8 py-3 rounded-xl font-bold text-lg flex items-center gap-2 transition-all transform
              ${selectedOption 
                ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:-translate-y-1' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
            `}
          >
            {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};