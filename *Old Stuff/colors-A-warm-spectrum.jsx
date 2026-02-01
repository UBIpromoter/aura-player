// Color Palette A: Warm Spectrum - Orange → Pink → Purple → Blue
// No greens, warm-to-cool gradient feels cohesive
import React from 'react';

export default function WarmSpectrum() {
  return (
    <div className="min-h-screen bg-black p-4 flex justify-center">
      <div className="w-[390px] space-y-8">

        {/* Palette Label */}
        <div className="text-center pt-4">
          <h1 className="text-white text-xl font-bold">Palette A: Warm Spectrum</h1>
          <p className="text-slate-500 text-sm">Orange → Pink → Purple → Blue</p>
        </div>

        {/* 2x2 Category Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Predict - Orange */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-orange-400/80 via-orange-500/60 to-orange-600/40 shadow-lg shadow-orange-500/30">
            <div className="bg-black rounded-2xl py-7 px-4 flex flex-col items-center">
              <span className="text-4xl mb-3">☀️</span>
              <h3 className="text-orange-400 font-semibold">Predict</h3>
            </div>
          </div>

          {/* Think - Pink */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-pink-400/80 via-pink-500/60 to-pink-600/40 shadow-lg shadow-pink-500/30">
            <div className="bg-black rounded-2xl py-7 px-4 flex flex-col items-center">
              <span className="text-4xl mb-3">🧠</span>
              <h3 className="text-pink-400 font-semibold">Think</h3>
            </div>
          </div>

          {/* Judge - Purple */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-purple-400/80 via-purple-500/60 to-purple-600/40 shadow-lg shadow-purple-500/30">
            <div className="bg-black rounded-2xl py-7 px-4 flex flex-col items-center">
              <span className="text-4xl mb-3">⚖️</span>
              <h3 className="text-purple-400 font-semibold">Judge</h3>
            </div>
          </div>

          {/* Explore - Blue */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-blue-400/80 via-blue-500/60 to-blue-600/40 shadow-lg shadow-blue-500/30">
            <div className="bg-black rounded-2xl py-7 px-4 flex flex-col items-center">
              <span className="text-4xl mb-3">🌀</span>
              <h3 className="text-blue-400 font-semibold">Explore</h3>
            </div>
          </div>
        </div>

        {/* Answer Buttons Preview */}
        <div className="space-y-3">
          <p className="text-slate-500 text-xs uppercase tracking-wide">Answer Buttons</p>

          <div className="flex gap-2">
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/50 text-orange-400 font-medium">
              Option A
            </button>
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500/20 to-pink-600/10 border border-pink-500/50 text-pink-400 font-medium">
              Option B
            </button>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-purple-600/10 border border-purple-500/50 text-purple-400 font-medium">
              Option C
            </button>
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/10 border border-blue-500/50 text-blue-400 font-medium">
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
                <div className="h-full w-[42%] bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-sm w-16">28%</span>
              <div className="flex-1 h-8 bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-full w-[28%] bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-sm w-16">18%</span>
              <div className="flex-1 h-8 bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-full w-[18%] bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-sm w-16">12%</span>
              <div className="flex-1 h-8 bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-full w-[12%] bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex justify-center gap-4 pb-8">
          <div className="w-12 h-12 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
          <div className="w-12 h-12 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50" />
          <div className="w-12 h-12 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
          <div className="w-12 h-12 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
        </div>
      </div>
    </div>
  );
}
