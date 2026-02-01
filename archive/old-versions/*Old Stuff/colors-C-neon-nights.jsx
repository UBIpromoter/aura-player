// Color Palette C: Neon Nights - Gold → Magenta → Electric Blue → Lime
// High contrast, distinct hues, no confusion between colors
import React from 'react';

export default function NeonNights() {
  return (
    <div className="min-h-screen bg-black p-4 flex justify-center">
      <div className="w-[390px] space-y-8">

        {/* Palette Label */}
        <div className="text-center pt-4">
          <h1 className="text-white text-xl font-bold">Palette C: Neon Nights</h1>
          <p className="text-slate-500 text-sm">Gold → Magenta → Electric Blue → Lime</p>
        </div>

        {/* 2x2 Category Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Predict - Gold/Yellow */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-yellow-400/80 via-yellow-500/60 to-amber-600/40 shadow-lg shadow-yellow-500/30">
            <div className="bg-black rounded-2xl py-7 px-4 flex flex-col items-center">
              <span className="text-4xl mb-3">☀️</span>
              <h3 className="text-yellow-400 font-semibold">Predict</h3>
            </div>
          </div>

          {/* Think - Magenta/Fuchsia */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-fuchsia-400/80 via-fuchsia-500/60 to-fuchsia-600/40 shadow-lg shadow-fuchsia-500/30">
            <div className="bg-black rounded-2xl py-7 px-4 flex flex-col items-center">
              <span className="text-4xl mb-3">🧠</span>
              <h3 className="text-fuchsia-400 font-semibold">Think</h3>
            </div>
          </div>

          {/* Judge - Electric Blue */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-sky-400/80 via-sky-500/60 to-blue-600/40 shadow-lg shadow-sky-500/30">
            <div className="bg-black rounded-2xl py-7 px-4 flex flex-col items-center">
              <span className="text-4xl mb-3">⚖️</span>
              <h3 className="text-sky-400 font-semibold">Judge</h3>
            </div>
          </div>

          {/* Explore - Lime */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-lime-400/80 via-lime-500/60 to-green-600/40 shadow-lg shadow-lime-500/30">
            <div className="bg-black rounded-2xl py-7 px-4 flex flex-col items-center">
              <span className="text-4xl mb-3">🌀</span>
              <h3 className="text-lime-400 font-semibold">Explore</h3>
            </div>
          </div>
        </div>

        {/* Answer Buttons Preview */}
        <div className="space-y-3">
          <p className="text-slate-500 text-xs uppercase tracking-wide">Answer Buttons</p>

          <div className="flex gap-2">
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-yellow-500/20 to-amber-600/10 border border-yellow-500/50 text-yellow-400 font-medium">
              Option A
            </button>
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500/20 to-fuchsia-600/10 border border-fuchsia-500/50 text-fuchsia-400 font-medium">
              Option B
            </button>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-sky-500/20 to-blue-600/10 border border-sky-500/50 text-sky-400 font-medium">
              Option C
            </button>
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-lime-500/20 to-green-600/10 border border-lime-500/50 text-lime-400 font-medium">
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
                <div className="h-full w-[42%] bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-sm w-16">28%</span>
              <div className="flex-1 h-8 bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-full w-[28%] bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 rounded-lg" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-sm w-16">18%</span>
              <div className="flex-1 h-8 bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-full w-[18%] bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-sm w-16">12%</span>
              <div className="flex-1 h-8 bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-full w-[12%] bg-gradient-to-r from-lime-500 to-green-500 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex justify-center gap-4 pb-8">
          <div className="w-12 h-12 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
          <div className="w-12 h-12 rounded-full bg-fuchsia-500 shadow-lg shadow-fuchsia-500/50" />
          <div className="w-12 h-12 rounded-full bg-sky-500 shadow-lg shadow-sky-500/50" />
          <div className="w-12 h-12 rounded-full bg-lime-500 shadow-lg shadow-lime-500/50" />
        </div>
      </div>
    </div>
  );
}
