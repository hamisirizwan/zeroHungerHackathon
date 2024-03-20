import React from 'react'

function StatsSection() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5">
    {/* Card */}
    <div className="p-4 sm:p-5 bg-white border border-stone-200 rounded-xl shadow-sm ">
      <div className="sm:flex sm:gap-x-3">
        <svg
          className="sm:order-2 mb-2 sm:mb-0 flex-shrink-0 w-6 h-6 text-stone-400"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
          <path d="M2 7h20" />
          <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
        </svg>
        <div className="sm:order-1 grow space-y-1">
          <h2 className="sm:mb-3 text-sm text-stone-500">In-store sales</h2>
          <p className="text-lg md:text-xl font-semibold text-stone-800">
            $7,820.75
          </p>
        </div>
      </div>
      <div className="mt-1 flex items-center gap-x-2">
        <span className="text-sm leading-5 text-stone-500">5k orders</span>
        <span className="inline-flex items-center gap-x-1 text-xs font-medium text-green-500 rounded-full">
          <svg
            className="flex-shrink-0 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
          4.3%
        </span>
      </div>
    </div>
    {/* End Card */}
  </div>
  )
}

export default StatsSection