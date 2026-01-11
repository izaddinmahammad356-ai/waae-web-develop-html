import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SCRIPT_SCENES } from './constants';
import { VisualStage } from './components/VisualStage';
import { audioService } from './services/geminiService';

const App: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Audio State Refs
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioCacheRef = useRef<Map<number, AudioBuffer>>(new Map());
  const mountedRef = useRef(true);

  const currentScene = SCRIPT_SCENES[currentSceneIndex];

  const stopAudio = useCallback(() => {
    if (audioSourceRef.current) {
      try {
        audioSourceRef.current.stop();
      } catch (e) {
        // Ignore errors if already stopped
      }
      audioSourceRef.current = null;
    }
  }, []);

  const playSceneAudio = useCallback(async (index: number) => {
    setError(null);
    stopAudio();
    setIsLoadingAudio(true);

    try {
      let buffer = audioCacheRef.current.get(index);
      const sceneText = SCRIPT_SCENES[index].text;

      if (!buffer) {
        console.log(`Generating audio for scene ${index + 1}...`);
        buffer = await audioService.generateSpeech(sceneText);
        if (mountedRef.current) {
          audioCacheRef.current.set(index, buffer);
        }
      }

      if (!mountedRef.current) return;
      if (index !== currentSceneIndex) return; // User changed scene while loading

      setIsLoadingAudio(false);
      
      const ctx = audioService.getAudioContext();
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      
      source.onended = () => {
        if (mountedRef.current) {
           setIsPlaying(false);
        }
      };

      audioSourceRef.current = source;
      source.start();
      setIsPlaying(true);

    } catch (err: any) {
      console.error("Audio playback failed", err);
      if (mountedRef.current) {
        setError("Failed to generate or play audio. Check API Key.");
        setIsLoadingAudio(false);
        setIsPlaying(false);
      }
    }
  }, [currentSceneIndex, stopAudio]);

  // Handle manual scene changes
  const handleSceneChange = (newIndex: number) => {
    stopAudio();
    setIsPlaying(false);
    setCurrentSceneIndex(newIndex);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      playSceneAudio(currentSceneIndex);
    }
  };

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      stopAudio();
    };
  }, [stopAudio]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 flex flex-col items-center">
      <div className="max-w-6xl w-full space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center border-b border-slate-800 pb-6">
          <div>
             <h1 className="text-2xl font-bold text-emerald-400">HTML Video Guide</h1>
             <p className="text-slate-400 text-sm mt-1">Oromo Language Tutorial</p>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-300">
              {isPlaying ? 'Voice Active' : 'Ready'}
            </span>
          </div>
        </header>

        {/* Main Stage */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Visual Area (Left 2/3) */}
          <div className="lg:col-span-2 space-y-4">
             <VisualStage scene={currentScene} />
             
             {/* Controls */}
             <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                   <button 
                     onClick={() => handleSceneChange(Math.max(0, currentSceneIndex - 1))}
                     disabled={currentSceneIndex === 0}
                     className="p-3 rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                   >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                   </button>

                   <button 
                     onClick={togglePlay}
                     className={`p-4 rounded-full transition-all shadow-lg hover:scale-105 active:scale-95 ${isLoadingAudio ? 'bg-slate-700 cursor-wait' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
                   >
                      {isLoadingAudio ? (
                        <svg className="animate-spin w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                      ) : (
                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      )}
                   </button>

                   <button 
                     onClick={() => handleSceneChange(Math.min(SCRIPT_SCENES.length - 1, currentSceneIndex + 1))}
                     disabled={currentSceneIndex === SCRIPT_SCENES.length - 1}
                     className="p-3 rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                   >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                   </button>
                </div>

                <div className="text-sm font-mono text-slate-500">
                   Scene {currentScene.id} / {SCRIPT_SCENES.length}
                </div>
             </div>
          </div>

          {/* Script Sidebar (Right 1/3) */}
          <div className="lg:col-span-1 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col max-h-[600px]">
             <div className="p-4 border-b border-slate-800 bg-slate-900">
                <h3 className="font-semibold text-slate-200">Script Outline</h3>
             </div>
             <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {SCRIPT_SCENES.map((scene, index) => (
                   <div 
                     key={scene.id}
                     onClick={() => handleSceneChange(index)}
                     className={`p-4 rounded-xl cursor-pointer transition-all border ${
                       index === currentSceneIndex 
                         ? 'bg-slate-800 border-emerald-500/50 shadow-lg shadow-emerald-900/20' 
                         : 'bg-transparent border-transparent hover:bg-slate-900 hover:border-slate-800'
                     }`}
                   >
                      <div className="flex justify-between items-start mb-2">
                         <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${index === currentSceneIndex ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                            {scene.durationLabel}
                         </span>
                         {index === currentSceneIndex && isPlaying && (
                            <span className="flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                         )}
                      </div>
                      <h4 className={`font-medium mb-1 ${index === currentSceneIndex ? 'text-white' : 'text-slate-400'}`}>
                         {scene.title}
                      </h4>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                         {scene.text}
                      </p>
                   </div>
                ))}
             </div>
          </div>

        </main>

        {/* Script Display (Current Scene Full Text) */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center relative group">
           <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full border border-slate-700 uppercase tracking-widest">
              Narrator Script
           </div>
           <p className="text-lg md:text-2xl leading-relaxed text-slate-200 font-serif italic">
              "{currentScene.text}"
           </p>
        </section>

        {error && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-4 animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-4 hover:text-red-200">✕</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;