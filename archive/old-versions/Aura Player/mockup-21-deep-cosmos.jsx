// Mockup 21: Deep Cosmos - Maximum stars, multiple galaxies, pure black card centers
import React from 'react';

export default function DeepCosmos() {
  return (
    <div className="min-h-screen bg-black p-4 flex justify-center">
      <div className="w-[390px] rounded-[40px] overflow-hidden relative">
        {/* Deep space base */}
        <div className="absolute inset-0 bg-black">

          {/* Galaxy 1 - Large swirl top right */}
          <div className="absolute -top-16 -right-24 w-96 h-96">
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/20 via-indigo-500/12 to-transparent rounded-full blur-3xl transform rotate-12" />
            <div className="absolute inset-12 bg-gradient-to-bl from-violet-500/15 via-blue-500/10 to-transparent rounded-full blur-2xl transform -rotate-6" />
            <div className="absolute inset-24 bg-gradient-to-bl from-fuchsia-400/10 via-transparent to-transparent rounded-full blur-xl" />
          </div>

          {/* Galaxy 2 - Medium swirl left side */}
          <div className="absolute top-1/3 -left-20 w-64 h-64">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/18 via-purple-500/12 to-transparent rounded-full blur-3xl transform rotate-45" />
            <div className="absolute inset-8 bg-gradient-to-r from-blue-500/12 via-violet-400/8 to-transparent rounded-full blur-2xl" />
          </div>

          {/* Galaxy 3 - Bottom cluster */}
          <div className="absolute -bottom-24 left-1/4 w-80 h-80">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-700/15 via-indigo-600/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-16 bg-gradient-to-t from-violet-500/10 via-blue-400/6 to-transparent rounded-full blur-2xl" />
          </div>

          {/* Galaxy 4 - Small nebula mid-right */}
          <div className="absolute top-1/2 right-4 w-40 h-40">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-500/12 via-indigo-400/8 to-transparent rounded-full blur-2xl" />
          </div>

          {/* Galaxy 5 - Tiny accent top-left */}
          <div className="absolute top-16 left-8 w-24 h-24">
            <div className="absolute inset-0 bg-violet-500/10 rounded-full blur-xl" />
          </div>

          {/* MASSIVE starfield - 250+ stars */}
          {[...Array(250)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 1.6 + 0.3}px`,
                height: `${Math.random() * 1.6 + 0.3}px`,
                backgroundColor: i % 8 === 0 ? '#e9d5ff' : i % 11 === 0 ? '#bfdbfe' : i % 16 === 0 ? '#fef3c7' : i % 22 === 0 ? '#a7f3d0' : '#fff',
                opacity: Math.random() * 0.7 + 0.2,
              }}
            />
          ))}

          {/* Bright anchor stars */}
          <div className="absolute top-[2%] left-[18%] w-2.5 h-2.5 bg-white rounded-full opacity-95 shadow-lg shadow-white/60" />
          <div className="absolute top-[6%] right-[25%] w-2 h-2 bg-purple-200 rounded-full opacity-90" />
          <div className="absolute top-[14%] left-[8%] w-1.5 h-1.5 bg-white rounded-full opacity-80" />
          <div className="absolute top-[22%] right-[8%] w-2 h-2 bg-blue-200 rounded-full opacity-85" />
          <div className="absolute top-[38%] left-[4%] w-2 h-2 bg-white rounded-full opacity-75" />
          <div className="absolute top-[48%] right-[15%] w-1.5 h-1.5 bg-white rounded-full opacity-70" />
          <div className="absolute top-[62%] left-[12%] w-2 h-2 bg-purple-100 rounded-full opacity-75" />
          <div className="absolute top-[72%] right-[6%] w-2.5 h-2.5 bg-white rounded-full opacity-80" />
          <div className="absolute top-[85%] left-[28%] w-1.5 h-1.5 bg-amber-100 rounded-full opacity-70" />
          <div className="absolute top-[94%] right-[22%] w-2 h-2 bg-white rounded-full opacity-65" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-5 pt-4">
          {/* Header */}
          <div className="flex justify-between items-center py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <div className="w-5 h-5 border-2 border-white/80 rounded-full border-t-transparent" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-sm">42 answered</span>
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          {/* Question of the Day */}
          <div className="mt-2 mb-6">
            <div className="rounded-2xl p-[1px] bg-gradient-to-r from-violet-600/80 via-purple-400/70 to-violet-600/80 shadow-xl shadow-purple-500/30">
              <div className="bg-black rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-600" />
                  <span className="text-violet-400 text-sm font-medium">Question of the Day</span>
                </div>
                <h2 className="text-white text-lg font-medium">
                  Should gene editing for disease prevention be allowed in humans?
                </h2>
                <p className="text-violet-400/70 text-sm mt-2">Tap to answer →</p>
              </div>
            </div>
          </div>

          {/* What's on your mind */}
          <h1 className="text-white text-2xl font-bold text-center mb-5">What's on your mind?</h1>

          {/* Category Cards - Pure black centers */}
          <div className="space-y-3">
            {/* Predict - Amber */}
            <div className="rounded-xl p-[1px] bg-gradient-to-r from-amber-600/80 via-amber-400/90 to-amber-600/80 shadow-lg shadow-amber-500/35">
              <div className="bg-black rounded-xl px-5 py-4 flex items-center gap-4">
                <span className="text-2xl">☀️</span>
                <div>
                  <h3 className="text-white font-semibold">Predict</h3>
                  <p className="text-amber-400 text-sm">What will happen?</p>
                </div>
              </div>
            </div>

            {/* Think - Violet */}
            <div className="rounded-xl p-[1px] bg-gradient-to-r from-violet-600/80 via-violet-400/90 to-violet-600/80 shadow-lg shadow-violet-500/35">
              <div className="bg-black rounded-xl px-5 py-4 flex items-center gap-4">
                <span className="text-2xl">🧠</span>
                <div>
                  <h3 className="text-white font-semibold">Think</h3>
                  <p className="text-violet-400 text-sm">Logic puzzles & analysis</p>
                </div>
              </div>
            </div>

            {/* Judge - Emerald */}
            <div className="rounded-xl p-[1px] bg-gradient-to-r from-emerald-600/80 via-emerald-400/90 to-emerald-600/80 shadow-lg shadow-emerald-500/35">
              <div className="bg-black rounded-xl px-5 py-4 flex items-center gap-4">
                <span className="text-2xl">⚖️</span>
                <div>
                  <h3 className="text-white font-semibold">Judge</h3>
                  <p className="text-emerald-400 text-sm">Ethics & opinions</p>
                </div>
              </div>
            </div>

            {/* Surprise - Gray */}
            <div className="rounded-xl p-[1px] bg-gradient-to-r from-gray-500/60 via-gray-400/70 to-gray-500/60 shadow-lg shadow-gray-500/25">
              <div className="bg-black rounded-xl px-5 py-4 flex items-center gap-4">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="text-white font-semibold">Surprise me</h3>
                  <p className="text-gray-400 text-sm">Explore something unexpected</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center py-8"><div className="w-32 h-1 bg-gray-800 rounded-full" /></div>
        </div>
      </div>
    </div>
  );
}
