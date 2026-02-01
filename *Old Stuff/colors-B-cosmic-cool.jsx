// Color Palette B: Cosmic Cool - Cyan → Indigo → Violet → Rose
// All cool tones with rose as warm accent
import React from 'react';

export default function CosmicCool() {
  return (
    <div className="min-h-screen bg-black p-4 flex justify-center">
      <div className="w-[390px] space-y-8">

        {/* Palette Label */}
        <div className="text-center pt-4">
          <h1 className="text-white text-xl font-bold">Palette B: Cosmic Cool</h1>
          <p className="text-slate-500 text-sm">Cyan → Indigo → Violet → Rose</p>
        </div>

        {/* 2x2 Category Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Predict - Cyan */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-cyan-400/80 via-cyan-500/60 to-cyan-600/40 shadow-lg shadow-cyan-500/30">
            <div className="bg-black rounded-2xl py-7 px-4 flex flex-col items-center">
              <span className="text-4xl mb-3">☀️</span>
              <h3 className="text-cyan-400 font-semibold">Predict</h3>
            </div>
          </div>

          {/* Think - Indigo */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-indigo-400/80 via-indigo-500/60 to-indigo-600/40 shadow-lg shadow-indigo-500/30">
            <div className="bg-black rounded-2xl py-7 px-4 flex flex-col items-center">
              <span className="text-4xl mb-3">🧠</span>
              <h3 className="text-indigo-400 font-semibold">Think</h3>
            </div>
          </div>

          {/* Judge - Violet */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-violet-400/80 via-violet-500/60 to-violet-600/40 shadow-lg shadow-violet-500/30">
            <div className="bg-black rounded-2xl py-7 px-4 flex flex-col items-center">
              <span className="text-4xl mb-3">⚖️</span>
              <h3 className="text-violet-400 font-semibold">Judge</h3>
            </div>
          </div>

          {/* Explore - Rose */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-rose-400/80 via-rose-500/60 to-rose-600/40 shadow-lg shadow-rose-500/30">
            <div className="bg-black rounded-2xl py-7 px-4 flex flex-col items-center">
              <span className="text-4xl mb-3">🌀</span>
              <h3 className="text-rose-400 font-semibold">Explore</h3>
            </div>
          </div>
        </div>

        {/* Answer Buttons Preview */}
        <div className="space-y-3">
          <p className="text-slate-500 text-xs uppercase tracking-wide">Answer Buttons</p>

          <div className="flex gap-2">
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 border border-cyan-500/50 text-cyan-400 font-medium">
              Option A
            </button>
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500/20 to-indigo-600/10 border border-indigo-500/50 text-indigo-400 font-medium">
              Option B
            </button>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-500/20 to-violet-600/10 border border-violet-500/50 text-violet-400 font-medium">
              Option C
            </button>
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-500/20 to-rose-600/10 border border-rose-500/50 text-rose-400 font-medium">
              Option D
            </button>
          </div>
        </div>

        {/* Results Bar Preview */}
        <div className="space-y-3">
          <p className="text-slate-500 text-xs uppercase tracking-wide">Results Bars</p>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-white text-sm w-16">42%</span>
              <div className="flex-1 h-8 bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-full w-[42%] bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-sm w-16">28%</span>
              <div className="flex-1 h-8 bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-full w-[28%] bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-sm w-16">18%</span>
              <div className="flex-1 h-8 bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-full w-[18%] bg-gradient-to-r from-violet-500 to-violet-600 rounded-lg" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-sm w-16">12%</span>
              <div className="flex-1 h-8 bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-full w-[12%] bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex justify-center gap-4 pb-8">
          <div className="w-12 h-12 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" />
          <div className="w-12 h-12 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
          <div className="w-12 h-12 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50" />
          <div className="w-12 h-12 rounded-full bg-rose-500 shadow-lg shadow-rose-500/50" />
        </div>
      </div>
    </div>
  );
}
