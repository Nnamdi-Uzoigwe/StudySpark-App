
"use client"

import { useState } from 'react'
import { ExternalLink, BookOpen, Play, Calculator, Globe, Lightbulb } from 'lucide-react'

interface Resource {
  id: string
  title: string
  description: string
  url: string
  platform: 'youtube' | 'khan-academy' | 'coursera' | 'other'
  subject: string
  icon: React.ReactNode
}

export default function Recommendations() {
  const [resources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Calculus Fundamentals',
      description: 'Master derivatives and integrals with clear explanations and practice problems.',
      url: 'https://www.khanacademy.org/math/calculus-1',
      platform: 'khan-academy',
      subject: 'Mathematics',
      icon: <Calculator className="w-4 h-4" />
    },
    {
      id: '2',
      title: 'Organic Chemistry Basics',
      description: 'Learn molecular structures, reactions, and mechanisms step by step.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      subject: 'Chemistry',
      icon: <Lightbulb className="w-4 h-4" />
    },
    {
      id: '3',
      title: 'World History Overview',
      description: 'Comprehensive timeline of major historical events and civilizations.',
      url: 'https://www.khanacademy.org/humanities/world-history',
      platform: 'khan-academy',
      subject: 'History',
      icon: <Globe className="w-4 h-4" />
    },
    {
      id: '4',
      title: 'Physics Mechanics',
      description: 'Understanding motion, forces, and energy through practical examples.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      subject: 'Physics',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: '5',
      title: 'Essay Writing Techniques',
      description: 'Improve your writing with structure, arguments, and style tips.',
      url: 'https://www.khanacademy.org/humanities/grammar',
      platform: 'khan-academy',
      subject: 'English',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: '6',
      title: 'Data Structures & Algorithms',
      description: 'Core computer science concepts with coding examples and practice.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      subject: 'Computer Science',
      icon: <Calculator className="w-4 h-4" />
    }
  ])

  const getPlatformBadge = (platform: string) => {
    const badges = {
      'youtube': 'bg-red-100 text-red-700 border-red-200',
      'khan-academy': 'bg-green-100 text-green-700 border-green-200',
      'coursera': 'bg-blue-100 text-blue-700 border-blue-200',
      'other': 'bg-gray-100 text-gray-700 border-gray-200'
    }
    return badges[platform as keyof typeof badges] || badges.other
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Play className="w-3 h-3" />
      case 'khan-academy':
        return <BookOpen className="w-3 h-3" />
      default:
        return <ExternalLink className="w-3 h-3" />
    }
  }

  const openResource = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-[#333838] h-[600px] flex flex-col border">
      {/* Header */}
      <div className="bg-[#202222] text-white p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Recommended Resources
        </h2>
        <p className="text-sm opacity-90">Curated content to boost your learning</p>
      </div>

      {/* Resources List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-4 group"
          >
            {/* Resource Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-[#398378]">
                  {resource.icon}
                </div>
                <h3 className="font-medium text-gray-900 text-sm leading-tight">
                  {resource.title}
                </h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${getPlatformBadge(resource.platform)}`}>
                {getPlatformIcon(resource.platform)}
                {resource.platform === 'khan-academy' ? 'Khan' : resource.platform}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
              {resource.description}
            </p>

            {/* Subject Tag & Button */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {resource.subject}
              </span>
              
              <button
                onClick={() => openResource(resource.url)}
                className="bg-[#398378] text-white px-3 py-1.5 rounded text-xs hover:bg-[#376059] transition-colors flex items-center gap-1.5 group-hover:scale-105 transition-transform"
              >
                View Resource
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className=" bg-white p-3">
        <p className="text-xs text-gray-500 text-center">
          More personalized recommendations coming soon!
        </p>
      </div>
    </div>
  )
}