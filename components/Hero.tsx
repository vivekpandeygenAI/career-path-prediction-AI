import React from 'react';
import { Sparkles, Brain, Target, TrendingUp, Cpu, FileText, CheckCircle } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onViewSample: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onViewSample }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col">
      <header className="px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100/50 rounded-b-2xl mb-4 sm:mb-0">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">CareerPath AI</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it works</a>
          <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
          <a href="#institutes" className="hover:text-indigo-600 transition-colors">For Institutes</a>
        </nav>
        <button onClick={onStart} className="md:hidden px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold">
          Start
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-center px-6 max-w-7xl mx-auto w-full gap-12 py-12 md:py-24">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wide">
              Powered by Gemini 2.5 & 3.0
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Discover Your Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Tech Career Path</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Unsure whether to choose Data Science, Python, or DevOps? Take our 20-question smart assessment. 
              We analyze your IQ, mindset, and personality to predict your future success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={onStart}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start Assessment <Brain className="w-5 h-5" />
              </button>
              <button 
                onClick={onViewSample}
                className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 text-slate-700 font-semibold rounded-xl transition-all"
              >
                View Sample Report
              </button>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-200">
              <div className="text-center md:text-left">
                <div className="font-bold text-2xl text-slate-900">20</div>
                <div className="text-xs text-slate-500 uppercase font-medium">Questions</div>
              </div>
              <div className="text-center md:text-left">
                <div className="font-bold text-2xl text-slate-900">5</div>
                <div className="text-xs text-slate-500 uppercase font-medium">Dimensions</div>
              </div>
              <div className="text-center md:text-left">
                <div className="font-bold text-2xl text-slate-900">98%</div>
                <div className="text-xs text-slate-500 uppercase font-medium">Accuracy</div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-lg hidden md:block">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="relative bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Smart Analysis</h3>
                    <p className="text-xs text-slate-500">Evaluating 5 key metrics</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Technical Logic", val: 85, color: "bg-blue-500" },
                    { label: "Creative Thinking", val: 72, color: "bg-purple-500" },
                    { label: "Problem Solving", val: 90, color: "bg-emerald-500" },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                        <span>{item.label}</span>
                        <span>{item.val}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <img key={i} src={`https://picsum.photos/32/32?random=${i}`} className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                    ))}
                  </div>
                  <div className="text-sm font-medium text-slate-600">
                    Join <span className="text-slate-900 font-bold">10k+</span> students
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* How it works Section */}
        <div id="how-it-works" className="w-full bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How CareerPath AI Works</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our advanced AI engine looks beyond just grades. We evaluate your thought process to find your true calling in tech.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <Brain className="w-8 h-8 text-indigo-600" />, 
                  title: "1. Take the AI Quiz", 
                  desc: "Answer 20 dynamic questions designed to test your logic, interest, and mindset." 
                },
                { 
                  icon: <Cpu className="w-8 h-8 text-blue-600" />, 
                  title: "2. Deep Analysis", 
                  desc: "Gemini 3.0 analyzes your responses against thousands of successful career profiles." 
                },
                { 
                  icon: <FileText className="w-8 h-8 text-emerald-600" />, 
                  title: "3. Get Your Roadmap", 
                  desc: "Receive a personalized report with course recommendations and salary projections." 
                }
              ].map((step, idx) => (
                <div key={idx} className="bg-slate-50 p-8 rounded-2xl hover:bg-slate-100 transition-colors border border-slate-100">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="w-full bg-slate-900 py-20 text-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About CareerPath AI</h2>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                We are a team of educators and AI engineers dedicated to solving the "What next?" crisis for students. 
                Traditional career counseling is often generic. We use data to make it personal.
              </p>
              <ul className="space-y-4">
                {[
                  "Powered by Google's Gemini 3.0 Pro",
                  "Designed by Industry Experts",
                  "Data-driven Career Matching"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-400" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
               <h3 className="text-2xl font-bold mb-4">For Coaching Institutes</h3>
               <p className="text-slate-400 mb-6">
                 Integrate CareerPath AI into your admission process to help students pick the right courses, reduce dropouts, and improve placement rates.
               </p>
               <button className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                 Partner With Us
               </button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="w-full bg-slate-900 py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
           &copy; {new Date().getFullYear()} CareerPath AI. All rights reserved.
        </footer>

      </main>
    </div>
  );
};