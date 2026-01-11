import React from 'react';

interface CodeWindowProps {
  code: string;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({ code }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800 rounded-lg overflow-hidden shadow-2xl border border-slate-700 transform transition-all duration-500 ease-out translate-y-0 opacity-100">
      <div className="bg-slate-900 px-4 py-2 flex items-center space-x-2 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-4 text-xs text-slate-400 font-mono">demo.html</span>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Source Code</h4>
          <pre className="font-mono text-xs md:text-sm text-sky-300 bg-slate-900/50 p-4 rounded overflow-x-auto h-[200px] custom-scrollbar">
            <code>{code}</code>
          </pre>
        </div>
        <div className="border-l border-slate-700 pl-6 md:block hidden">
           <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Browser Preview</h4>
           <div className="bg-white text-black p-4 rounded h-full min-h-[200px] flex flex-col items-center justify-center border border-slate-200 bg-slate-50">
              <div className="w-full aspect-video bg-slate-900 rounded flex items-center justify-center relative shadow-inner">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center pl-1 hover:scale-110 transition-transform cursor-pointer">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent"></div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 h-1 bg-slate-700 rounded overflow-hidden">
                      <div className="w-1/3 h-full bg-red-500"></div>
                  </div>
              </div>
              <p className="mt-3 text-xs text-slate-400 font-mono">Video Player Mockup</p>
           </div>
        </div>
      </div>
    </div>
  );
};