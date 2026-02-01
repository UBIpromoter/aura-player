// Mockup 17: Galaxy Swirl - Category colors + deep space + massive starfield + galaxy clusters
import React from 'react';

export default function GalaxySwirl() {
  return (
    <div className="min-h-screen bg-black p-4 flex justify-center">
      <div className="w-[390px] rounded-[40px] overflow-hidden relative">
        {/* Deep space base */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-black to-black">

          {/* Galaxy swirl - top right */}
          <div className="absolute -top-10 -right-20 w-80 h-80">
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/15 via-indigo-500/10 to-transparent rounded-full blur-2xl transform rotate-45" />
            <div className="absolute inset-8 bg-gradient-to-bl from-blue-500/10 via-violet-400/8 to-transparent rounded-full blur-xl transform rotate-12" />
            <div className="absolute inset-16 bg-gradient-to-bl from-fuchsia-400/8 via-transparent to-transparent rounded-full blur-lg" />
          </div>

          {/* Galaxy cluster - bottom left */}
          <div className="absolute -bottom-20 -left-16 w-64 h-64">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/12 via-purple-500/8 to-transparent rounded-full blur-2xl" />
            <div className="absolute inset-6 bg-gradient-to-tr from-blue-400/8 via-transparent to-transparent rounded-full blur-xl" />
          </div>

          {/* Small nebula cluster - middle */}
          <div className="absolute top-1/2 left-1/4 w-32 h-32">
            <div className="absolute inset-0 bg-violet-500/8 rounded-full blur-2xl" />
          </div>

          {/* Massive starfield - 7x density */}
          {[...Array(140)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 1.5 + 0.3}px`,
                height: `${Math.random() * 1.5 + 0.3}px`,
                backgroundColor: i % 12 === 0 ? '#c4b5fd' : i % 18 === 0 ? '#bfdbfe' : i % 25 === 0 ? '#fef3c7' : '#fff',
                opacity: Math.random() * 0.65 + 0.2,
              }}
            />
          ))}

          {/* Bright anchor stars */}
          <div className="absolute top-[4%] left-[22%] w-2 h-2 bg-white rounded-full opacity-95 shadow-lg shadow-white/50" />
          <div className="absolute top-[15%] right-[8%] w-1.5 h-1.5 bg-blue-200 rounded-full opacity-80" />
          <div className="absolute top-[28%] left-[6%] w-1.5 h-1.5 bg-purple-200 rounded-full opacity-70" />
          <div className="absolute top-[45%] right-[15%] w-2 h-2 bg-white rounded-full opacity-75" />
          <div className="absolute top-[62%] left-[10%] w-1.5 h-1.5 bg-white rounded-full opacity-65" />
          <div className="absolute top-[78%] right-[22%] w-2 h-2 bg-amber-100 rounded-full opacity-70" />
          <div className="absolute top-[88%] left-[30%] w-1.5 h-1.5 bg-white rounded-full opacity-60" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-5 pt-4">
          {/* Header */}
          <div className="flex justify-between items-center py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/40">
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

          {/* Question of the Day - Violet theme from mockup 2 */}
          <div className="mt-2 mb-6">
            <div className="rounded-2xl p-[1px] bg-gradient-to-r from-violet-600/70 via-purple-400/60 to-violet-600/70 shadow-lg shadow-purple-500/25">
              <div className="bg-black/85 backdrop-blur-sm rounded-2xl p-5 relative overflow-hidden">
                {/* Inner stars */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`qotd-${i}`}
                    className="absolute rounded-full bg-white"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${50 + Math.random() * 45}%`,
                      width: `${Math.random() * 1 + 0.3}px`,
                      height: `${Math.random() * 1 + 0.3}px`,
                      opacity: Math.random() * 0.4 + 0.2,
                    }}
                  />
                ))}

                <div className="relative flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-600" />
                  <span className="text-violet-400 text-sm font-medium">Question of the Day</span>
                </div>
                <h2 className="relative text-white text-lg font-medium">
                  Should gene editing for disease prevention be allowed in humans?
                </h2>
                <p className="relative text-violet-400/70 text-sm mt-2">Tap to answer →</p>
              </div>
            </div>
          </div>

          {/* What's on your mind */}
          <h1 className="text-white text-2xl font-bold text-center mb-5">What's on your mind?</h1>

          {/* Category Cards - Mockup 2 colors with deep space interior */}
          <div className="space-y-3">
            {/* Predict - Amber */}
            <div className="rounded-xl p-[1px] bg-gradient-to-r from-amber-600/70 via-amber-400/80 to-amber-600/70 shadow-lg shadow-amber-500/25">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl px-5 py-4 flex items-center gap-4 relative overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`pred-${i}`}
                    className="absolute rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${35 + Math.random() * 60}%`,
                      width: `${Math.random() * 1.2 + 0.3}px`,
                      height: `${Math.random() * 1.2 + 0.3}px`,
                      backgroundColor: i % 3 === 0 ? '#fef3c7' : '#fff',
                      opacity: Math.random() * 0.5 + 0.25,
                    }}
                  />
                ))}
                <span className="relative text-2xl">☀️</span>
                <div className="relative">
                  <h3 className="text-white font-semibold">Predict</h3>
                  <p className="text-amber-400 text-sm">What will happen?</p>
                </div>
              </div>
            </div>

            {/* Think - Violet */}
            <div className="rounded-xl p-[1px] bg-gradient-to-r from-violet-600/70 via-violet-400/80 to-violet-600/70 shadow-lg shadow-violet-500/25">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl px-5 py-4 flex items-center gap-4 relative overflow-hidden">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={`think-${i}`}
                    className="absolute rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${35 + Math.random() * 60}%`,
                      width: `${Math.random() * 1 + 0.3}px`,
                      height: `${Math.random() * 1 + 0.3}px`,
                      backgroundColor: i % 3 === 0 ? '#c4b5fd' : '#fff',
                      opacity: Math.random() * 0.5 + 0.2,
                    }}
                  />
                ))}
                <span className="relative text-2xl">🧠</span>
                <div className="relative">
                  <h3 className="text-white font-semibold">Think</h3>
                  <p className="text-violet-400 text-sm">Logic puzzles & analysis</p>
                </div>
              </div>
            </div>

            {/* Judge - Emerald */}
            <div className="rounded-xl p-[1px] bg-gradient-to-r from-emerald-600/70 via-emerald-400/80 to-emerald-600/70 shadow-lg shadow-emerald-500/25">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl px-5 py-4 flex items-center gap-4 relative overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`judge-${i}`}
                    className="absolute rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${35 + Math.random() * 60}%`,
                      width: `${Math.random() * 1 + 0.3}px`,
                      height: `${Math.random() * 1 + 0.3}px`,
                      backgroundColor: i % 3 === 0 ? '#a7f3d0' : '#fff',
                      opacity: Math.random() * 0.5 + 0.2,
                    }}
                  />
                ))}
                <span className="relative text-2xl">⚖️</span>
                <div className="relative">
                  <h3 className="text-white font-semibold">Judge</h3>
                  <p className="text-emerald-400 text-sm">Ethics & opinions</p>
                </div>
              </div>
            </div>

            {/* Surprise - Gray/subtle */}
            <div className="rounded-xl p-[1px] bg-gradient-to-r from-gray-500/50 via-gray-400/60 to-gray-500/50 shadow-lg shadow-gray-500/15">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl px-5 py-4 flex items-center gap-4 relative overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`surp-${i}`}
                    className="absolute rounded-full bg-white"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${35 + Math.random() * 60}%`,
                      width: `${Math.random() * 1 + 0.3}px`,
                      height: `${Math.random() * 1 + 0.3}px`,
                      opacity: Math.random() * 0.4 + 0.15,
                    }}
                  />
                ))}
                <span className="relative text-2xl">✨</span>
                <div className="relative">
                  <h3 className="text-white font-semibold">Surprise me</h3>
                  <p className="text-gray-400 text-sm">Explore something unexpected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-8">
            <div className="w-32 h-1 bg-gray-800 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
