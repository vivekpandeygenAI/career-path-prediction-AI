import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { Loading } from './components/Loading';
import { AppState, Question, Answer, AssessmentResult } from './types';
import { generateAssessmentQuestions, analyzeAssessmentResults } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

// Sample data for the "View Sample Report" feature
const SAMPLE_RESULT: AssessmentResult = {
  recommendedCourse: "Data Science & AI",
  courseDescription: "Unlock the power of data to drive decision-making and innovation.",
  executiveSummary: "Based on your high scores in **Logical Reasoning (92%)** and **Pattern Recognition**, combined with a **Growth Mindset**, you are exceptionally well-suited for Data Science. You demonstrated a natural ability to interpret complex datasets and derive meaningful insights, which is the core of this field.",
  detailedAnalysis: "### Strengths\n- **Strong Analytical Thinking:** You naturally break down complex problems.\n- **Detail-Oriented:** Your attention to nuances in the pattern questions was excellent.\n- **Resilience:** Your mindset answers indicate you view challenges as learning opportunities.\n\n### Potential Fit\nYour profile suggests you would thrive in environments that require both technical skill and creative hypothesis testing, typical of top-tier AI roles.",
  careerPath: "- **Junior Data Analyst**: $70k - $90k\n- **Data Scientist**: $100k - $130k\n- **AI Research Scientist**: $150k+\n- **Chief Data Officer**: Executive Level",
  improvementAreas: [
    "Familiarize yourself with Python libraries like Pandas and NumPy",
    "Work on storytelling with data visualization techniques",
    "Deepen understanding of statistical probability"
  ],
  metrics: [
    { category: "IQ", score: 88, description: "Excellent logical reasoning" },
    { category: "Interest", score: 95, description: "Highly enthusiastic about tech" },
    { category: "Mindset", score: 82, description: "Growth-oriented approach" },
    { category: "Technical Orientation", score: 75, description: "Solid foundational logic" },
    { category: "Personality", score: 90, description: "Analytical & Curious" }
  ]
};

export default function App() {
  const [state, setState] = useState<AppState>(AppState.LANDING);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const startAssessment = async () => {
    setState(AppState.GENERATING_QUIZ);
    setErrorMsg(null);
    try {
      const qs = await generateAssessmentQuestions();
      setQuestions(qs);
      setState(AppState.QUIZ);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to start assessment.");
      setState(AppState.ERROR);
    }
  };

  const handleQuizComplete = async (answers: Answer[]) => {
    setState(AppState.ANALYZING);
    setErrorMsg(null);
    try {
      const res = await analyzeAssessmentResults(answers);
      setResult(res);
      setState(AppState.RESULTS);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to analyze results.");
      setState(AppState.ERROR);
    }
  };

  const handleViewSample = () => {
    setResult(SAMPLE_RESULT);
    setState(AppState.RESULTS);
  };

  const reset = () => {
    setState(AppState.LANDING);
    setQuestions([]);
    setResult(null);
    setErrorMsg(null);
  };

  // Render State Machine
  switch (state) {
    case AppState.LANDING:
      return <Hero onStart={startAssessment} onViewSample={handleViewSample} />;
      
    case AppState.GENERATING_QUIZ:
      return <Loading type="generating" />;
      
    case AppState.QUIZ:
      return <Quiz questions={questions} onComplete={handleQuizComplete} />;
      
    case AppState.ANALYZING:
      return <Loading type="analyzing" />;
      
    case AppState.RESULTS:
      if (!result) return <div onClick={reset}>Unknown Error. Return home.</div>;
      return <Results result={result} onRetake={reset} />;
      
    case AppState.ERROR:
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
            <p className="text-slate-600 mb-6">{errorMsg || "An unexpected error occurred."}</p>
            <button 
              onClick={reset}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
      
    default:
      return <Hero onStart={startAssessment} onViewSample={handleViewSample} />;
  }
}