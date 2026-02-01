// Mockup 26: Grid Deeper - Taller cards, more space-like feel
import React from 'react';

export default function GridDeeper() {
  return (
    <div className="min-h-screen bg-black p-4 flex justify-center">
      <div className="w-[390px] rounded-[40px] overflow-hidden relative">
        {/* Deep space base */}
        <div className="absolute inset-0 bg-black">

          {/* Multiple galaxy layers */}
          <div className="absolute -top-20 -right-16 w-80 h-80">
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/22 via-indigo-500/14 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-10 bg-gradient-to-bl from-violet-500/16 via-blue-500/10 to-transparent rounded-full blur-2xl" />
          </div>

          <div className="absolute top-40 -left-24 w-72 h-72">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/18 via-purple-500/12 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="absolute -bottom-20 right-0 w-96 h-96">
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-700/16 via-indigo-600/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-20 bg-gradient-to-tl from-fuchsia-500/10 via-violet-400/6 to-transparent rounded-full blur-2xl" />
          </div>

          <div className="absolute top-1/2 right-8 w-32 h-32">
            <div className="absolute inset-0 bg-blue-500/12 rounded-full blur-2xl" />
          </div>

          {/* 300 stars */}
          {[...Array(300)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 1.7 + 0.25}px`,
                height: `${Math.random() * 1.7 + 0.25}px`,
                backgroundColor: i % 7 === 0 ? '#e9d5ff' : i % 10 === 0 ? '#bfdbfe' : i % 15 === 0 ? '#fef3c7' : '#fff',
                opacity: Math.random() * 0.75 + 0.2,
              }}
            />
          ))}

          {/* Bright stars */}
          <div className="absolute top-[3%] left-[22%] w-2.5 h-2.5 bg-white rounded-full opacity-95" />
          <div className="absolute top-[8%] right-[15%] w-2 h-2 bg-purple-200 rounded-full opacity-85" />
          <div className="absolute top-[45%] left-[5%] w-2 h-2 bg-white rounded-full opacity-75" />
          <div className="absolute top-[70%] right-[8%] w-2.5 h-2.5 bg-blue-100 rounded-full opacity-80" />
          <div className="absolute top-[90%] left-[35%] w-2 h-2 bg-white rounded-full opacity-70" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-5 pt-4">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-1 pt-1 pb-2">
            <span className="text-white text-sm font-medium">9:41</span>
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
          <div className="flex justify-between items-center py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <div className="w-5 h-5 border-2 border-white/60 rounded-full border-t-transparent" />
            </div>
            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Question of the Day */}
          <div className="mt-2 mb-6">
            <div className="rounded-2xl p-[1px] bg-gradient-to-b from-blue-500/60 via-violet-500/40 to-blue-600/30 shadow-lg shadow-blue-500/20">
              <div className="bg-black rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-violet-600" />
                  <span className="text-blue-400 text-sm font-medium">Question of the Day</span>
                </div>
                <h2 className="text-white text-lg font-medium mb-2">
                  Should gene editing for disease prevention be allowed in humans?
                </h2>
                <p className="text-slate-500 text-sm">Tap to answer →</p>
              </div>
            </div>
          </div>

          {/* What's on your mind */}
          <h1 className="text-white text-xl font-bold text-center mb-5">What's on your mind?</h1>

          {/* 2x2 Grid - Slightly taller cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Predict */}
            <div className="rounded-2xl p-[1px] bg-gradient-to-b from-amber-400/90 via-amber-500/70 to-amber-600/50 shadow-xl shadow-amber-500/35">
              <div className="bg-black rounded-2xl py-8 px-4 flex flex-col items-center justify-center">
                <span className="text-5xl mb-4">☀️</span>
                <h3 className="text-amber-400 font-semibold text-lg">Predict</h3>
              </div>
            </div>

            {/* Think */}
            <div className="rounded-2xl p-[1px] bg-gradient-to-b from-violet-400/90 via-violet-500/70 to-violet-600/50 shadow-xl shadow-violet-500/35">
              <div className="bg-black rounded-2xl py-8 px-4 flex flex-col items-center justify-center">
                <span className="text-5xl mb-4">🧠</span>
                <h3 className="text-violet-400 font-semibold text-lg">Think</h3>
              </div>
            </div>

            {/* Judge */}
            <div className="rounded-2xl p-[1px] bg-gradient-to-b from-teal-400/90 via-teal-500/70 to-teal-600/50 shadow-xl shadow-teal-500/35">
              <div className="bg-black rounded-2xl py-8 px-4 flex flex-col items-center justify-center">
                <span className="text-5xl mb-4">⚖️</span>
                <h3 className="text-teal-400 font-semibold text-lg">Judge</h3>
              </div>
            </div>

            {/* Explore */}
            <div className="rounded-2xl p-[1px] bg-gradient-to-b from-fuchsia-400/90 via-fuchsia-500/70 to-fuchsia-600/50 shadow-xl shadow-fuchsia-500/35">
              <div className="bg-black rounded-2xl py-8 px-4 flex flex-col items-center justify-center">
                <span className="text-5xl mb-4">🌌</span>
                <h3 className="text-fuchsia-400 font-semibold text-lg">Explore</h3>
              </div>
            </div>
          </div>

          <div className="flex justify-center py-6">
            <div className="w-32 h-1 bg-gray-800 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
