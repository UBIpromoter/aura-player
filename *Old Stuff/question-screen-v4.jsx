// Question Screen v4: Indigo, Cyan, Purple, Green, Rose
import React from 'react';

export default function QuestionScreenV4() {
  return (
    <div className="min-h-screen bg-gray-950 p-4 flex justify-center">
      <div className="w-[390px] rounded-[40px] overflow-hidden relative bg-gray-950 p-6">
        <h2 className="text-white text-lg font-medium mb-6 text-center">V4: Indigo, Cyan, Purple, Green, Rose</h2>

        {/* Results - Full Width Bars */}
        <div className="space-y-4">
          {/* Indigo */}
          <div className="flex items-center gap-3">
            <span className="text-indigo-400 text-lg font-medium w-8">24</span>
            <div className="flex-1 h-8 rounded-full overflow-hidden flex">
              <div className="h-full w-[25%] bg-indigo-700" />
              <div className="h-full w-[25%] bg-indigo-500" />
              <div className="h-full w-[25%] bg-indigo-400" />
              <div className="h-full w-[25%] bg-indigo-300" />
            </div>
          </div>

          {/* Cyan */}
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 text-lg font-medium w-8">20</span>
            <div className="flex-1 h-8 rounded-full overflow-hidden flex">
              <div className="h-full w-[25%] bg-cyan-700" />
              <div className="h-full w-[25%] bg-cyan-500" />
              <div className="h-full w-[25%] bg-cyan-400" />
              <div className="h-full w-[25%] bg-cyan-300" />
            </div>
          </div>

          {/* Purple */}
          <div className="flex items-center gap-3">
            <span className="text-purple-400 text-lg font-medium w-8">19</span>
            <div className="flex-1 h-8 rounded-full overflow-hidden flex">
              <div className="h-full w-[25%] bg-purple-700" />
              <div className="h-full w-[25%] bg-purple-500" />
              <div className="h-full w-[25%] bg-purple-400" />
              <div className="h-full w-[25%] bg-purple-300" />
            </div>
          </div>

          {/* Green */}
          <div className="flex items-center gap-3">
            <span className="text-green-400 text-lg font-medium w-8">19</span>
            <div className="flex-1 h-8 rounded-full overflow-hidden flex">
              <div className="h-full w-[25%] bg-green-700" />
              <div className="h-full w-[25%] bg-green-500" />
              <div className="h-full w-[25%] bg-green-400" />
              <div className="h-full w-[25%] bg-green-300" />
            </div>
          </div>

          {/* Rose */}
          <div className="flex items-center gap-3">
            <span className="text-rose-400 text-lg font-medium w-8">18</span>
            <div className="flex-1 h-8 rounded-full overflow-hidden flex">
              <div className="h-full w-[25%] bg-rose-700" />
              <div className="h-full w-[25%] bg-rose-500" />
              <div className="h-full w-[25%] bg-rose-400" />
              <div className="h-full w-[25%] bg-rose-300" />
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex justify-center gap-3 mt-8">
          <div className="w-10 h-10 rounded-full bg-indigo-500" />
          <div className="w-10 h-10 rounded-full bg-cyan-500" />
          <div className="w-10 h-10 rounded-full bg-purple-500" />
          <div className="w-10 h-10 rounded-full bg-green-500" />
          <div className="w-10 h-10 rounded-full bg-rose-500" />
        </div>
      </div>
    </div>
  );
}