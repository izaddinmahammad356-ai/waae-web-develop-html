import React from 'react';
import { Scene } from '../types';
import { CodeWindow } from './CodeWindow';

interface VisualStageProps {
  scene: Scene;
}

export const VisualStage: React.FC<VisualStageProps> = ({ scene }) => {
  const renderContent = () => {
    switch (scene.visualType) {
      case 'intro':
        return (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in-up">
            <div className="text-6xl mb-6">🎬</div>
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center">
              HTML Video <br/> Guide
            </h1>
            <p className="mt-4 text-xl text-slate-400">Video & Multimedia</p>
          </div>
        );

      case 'text-focus':
        return (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-center leading-tight">
              {scene.text.split(scene.visualData.highlight).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-orange-500 inline-block transform hover:scale-110 transition-transform duration-300">
                      {scene.visualData.highlight}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </h2>
          </div>
        );

      case 'illustration':
        return (
          <div className="grid grid-cols-3 gap-4 w-full max-w-4xl mx-auto h-full items-center">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center transform hover:-translate-y-2 transition-transform">
              <div className="w-24 h-24 rounded-full bg-emerald-900/50 mb-4 flex items-center justify-center text-3xl text-emerald-400">♿</div>
              <span className="font-semibold text-lg text-center">Accessibility</span>
              <span className="text-xs text-slate-400 mt-2 text-center">aria-label & tracks</span>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center transform hover:-translate-y-2 transition-transform delay-100">
               <div className="w-24 h-24 rounded-full bg-blue-900/50 mb-4 flex items-center justify-center text-3xl text-blue-400">⚡</div>
               <span className="font-semibold text-lg text-center">Performance</span>
               <span className="text-xs text-slate-400 mt-2 text-center">preload="metadata"</span>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center transform hover:-translate-y-2 transition-transform delay-200">
               <div className="w-24 h-24 rounded-full bg-purple-900/50 mb-4 flex items-center justify-center text-3xl text-purple-400">📱</div>
               <span className="font-semibold text-lg text-center">Responsive</span>
               <span className="text-xs text-slate-400 mt-2 text-center">CSS Aspect Ratio</span>
            </div>
          </div>
        );

      case 'code':
        return (
          <div className="flex items-center justify-center h-full w-full">
             <CodeWindow code={scene.visualData.code} />
          </div>
        );
      
      case 'outro':
         return (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in-up">
            <div className="w-32 h-32 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-900/50">
               <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
               </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2">Izu Tirushop Pro</h2>
            <p className="text-slate-400">Subscribe for more!</p>
          </div>
         );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-slate-950 rounded-3xl border border-slate-800 relative overflow-hidden p-8 flex items-center justify-center">
       <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-950 to-slate-950"></div>
       <div className="relative z-10 w-full h-full">
          {renderContent()}
       </div>
    </div>
  );
};