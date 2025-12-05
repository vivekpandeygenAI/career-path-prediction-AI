import React from 'react';
import { Loader2, BrainCircuit } from 'lucide-react';

interface LoadingProps {
  type: 'generating' | 'analyzing';
}

export const Loading: React.FC<LoadingProps> = ({ type }) => {
  const content = type === 'generating' 
    ? {
        title: "Preparing Your Assessment",
        subtitle: "Gemini is crafting questions tailored to reveal your potential...",
        color: "text-blue-600"
      }
    : {
        title: "Analyzing Career DNA",
        subtitle: "Crunching your answers against thousands of success profiles...",
        color: "text-indigo-600"
      };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className={`absolute inset-0 border-4 border-slate-200 rounded-full`}></div>
          <div className={`absolute inset-0 border-4 ${content.color} border-t-transparent rounded-full animate-spin`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <BrainCircuit className={`w-10 h-10 ${content.color} animate-pulse`} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{content.title}</h2>
        <p className="text-slate-500 text-lg">{content.subtitle}</p>
        
        {type === 'analyzing' && (
          <div className="mt-8 space-y-2">
             <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 animate-[progress_2s_ease-in-out_infinite] w-1/3 rounded-full"></div>
             </div>
             <p className="text-xs text-slate-400 font-mono">Running logic checks on gemini-3-pro-preview...</p>
          </div>
        )}
      </div>
    </div>
  );
};