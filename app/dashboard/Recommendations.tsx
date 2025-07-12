
"use client"

import { Lightbulb } from 'lucide-react'
import RecommendSidebar from '@/components/RecommendSidebar'

export default function Recommendations() {

  return (
    <div className="bg-[#333838] h-[600px] flex flex-col border">

      <div className="bg-[#202222] text-white p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Recommended Resources
        </h2>
        <p className="text-sm opacity-90">Curated content to boost your learning</p>
      </div>

      <RecommendSidebar />

      <div className=" bg-white p-3">
        <p className="text-xs text-gray-500 text-center">
          More personalized recommendations coming soon!
        </p>
      </div>
    </div>
  )
}