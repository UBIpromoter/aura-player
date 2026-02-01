// Mockup 2: Deep Violet/Purple Theme - Rich purple glows with dark interior
import React from 'react';

export default function VioletTheme() {
  return (
    <div className="min-h-screen bg-gray-950 p-4 flex justify-center">
      <div className="w-[390px] bg-gray-950 rounded-[40px] border-4 border-gray-800 overflow-hidden">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 pt-3 pb-2">
          <span className="text-white text-sm font-medium">9:41</span>
          <div className="w-32 h-8 bg-black rounded-full" />
          <div className="flex gap-1 items-center">
            <div className="flex gap-0.5">
              <div className="w-1 h-2 bg-white rounded-sm" />
              <div className="w-1 h-2.5 bg-white rounded-sm" />
              <div className="w-1 h-3 bg-white rounded-sm" />
              <div className="w-1 h-3.5 bg-white/40 rounded-sm" />
            </div>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3C7.5 3 3.75 5.25 1.5 8.25L12 21l10.5-12.75C20.25 5.25 16.5 3 12 3z" />
            </svg>
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-4 h-2 bg-white rounded-sm m-0.5" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-300 text-sm">20 answered 🔥3</span>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>

        {/* Question of the Day - Violet glow */}
        <div className="px-5 pb-4">
          <div className="rounded-2xl p-[1px] bg-gradient-to-r from-violet-600 via-purple-400 to-violet-600 shadow-lg shadow-purple-500/30">
            <div className="bg-gray-950 rounded-2xl p-5">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-500" />
                <span className="text-violet-400 text-sm font-medium">Question of the Day</span>
              </div>
              <h2 className="text-white text-center text-lg font-medium mb-3">
                Should gene editing for disease prevention be allowed in humans?
              </h2>
              <p className="text-violet-400 text-center text-sm">Tap to answer →</p>
            </div>
          </div>
        </div>

        {/* What's on your mind */}
        <h1 className="text-white text-2xl font-bold text-center mb-5">What's on your mind?</h1>

        {/* Category Cards - All with violet glow, dark interior */}
        <div className="px-5 space-y-3">
          {/* Predict */}
          <div className="rounded-xl p-[1px] bg-gradient-to-r from-amber-600/70 via-amber-400/90 to-amber-600/70 shadow-lg shadow-amber-500/20">
            <div className="bg-gray-950 rounded-xl px-5 py-4 flex items-center gap-4">
              <span className="text-2xl">☀️</span>
              <div>
                <h3 className="text-white font-semibold">Predict</h3>
                <p className="text-amber-400 text-sm">What will happen?</p>
              </div>
            </div>
          </div>

          {/* Think */}
          <div className="rounded-xl p-[1px] bg-gradient-to-r from-violet-600/70 via-violet-400/90 to-violet-600/70 shadow-lg shadow-violet-500/20">
            <div className="bg-gray-950 rounded-xl px-5 py-4 flex items-center gap-4">
              <span className="text-2xl">🧠</span>
              <div>
                <h3 className="text-white font-semibold">Think</h3>
                <p className="text-violet-400 text-sm">Logic puzzles & analysis</p>
              </div>
            </div>
          </div>

          {/* Judge */}
          <div className="rounded-xl p-[1px] bg-gradient-to-r from-emerald-600/70 via-emerald-400/90 to-emerald-600/70 shadow-lg shadow-emerald-500/20">
            <div className="bg-gray-950 rounded-xl px-5 py-4 flex items-center gap-4">
              <span className="text-2xl">⚖️</span>
              <div>
                <h3 className="text-white font-semibold">Judge</h3>
                <p className="text-emerald-400 text-sm">Ethics & opinions</p>
              </div>
            </div>
          </div>

          {/* Surprise */}
          <div className="rounded-xl p-[1px] bg-gradient-to-r from-gray-500/50 via-gray-300/70 to-gray-500/50 shadow-lg shadow-gray-400/10">
            <div className="bg-gray-950 rounded-xl px-5 py-4 flex items-center gap-4">
              <span className="text-2xl">✨</span>
              <div>
                <h3 className="text-white font-semibold">Surprise me</h3>
                <p className="text-gray-400 text-sm">Explore something unexpected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center py-6">
          <div className="w-32 h-1 bg-gray-600 rounded-full" />
        </div>
      </div>
    </div>
  );
}
