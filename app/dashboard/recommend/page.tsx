'use client'

import { useState } from 'react'
import { ExternalLink, BookOpen, Play, Calculator, Globe, Lightbulb, ArrowLeft, Filter, Search, Grid, List } from 'lucide-react'
import Link from 'next/link'

interface Resource {
  id: string
  title: string
  description: string
  url: string
  platform: 'youtube' | 'khan-academy' | 'coursera' | 'other'
  subject: string
  icon: React.ReactNode
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
}

export default function recommendations() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  const [resources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Calculus Fundamentals',
      description: 'Master derivatives and integrals with clear explanations and practice problems. This comprehensive course covers limits, continuity, differentiation rules, and integration techniques.',
      url: 'https://www.khanacademy.org/math/calculus-1',
      platform: 'khan-academy',
      subject: 'Mathematics',
      icon: <Calculator className="w-5 h-5" />,
      difficulty: 'intermediate',
      duration: '8 hours'
    },
    {
      id: '2',
      title: 'Organic Chemistry Basics',
      description: 'Learn molecular structures, reactions, and mechanisms step by step. Understand how organic compounds behave and interact in various chemical processes.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      subject: 'Chemistry',
      icon: <Lightbulb className="w-5 h-5" />,
      difficulty: 'beginner',
      duration: '12 hours'
    },
    {
      id: '3',
      title: 'World History Overview',
      description: 'Comprehensive timeline of major historical events and civilizations. Explore ancient cultures, medieval periods, and modern developments that shaped our world.',
      url: 'https://www.khanacademy.org/humanities/world-history',
      platform: 'khan-academy',
      subject: 'History',
      icon: <Globe className="w-5 h-5" />,
      difficulty: 'beginner',
      duration: '15 hours'
    },
    {
      id: '4',
      title: 'Physics Mechanics',
      description: 'Understanding motion, forces, and energy through practical examples. Learn Newton\'s laws, momentum, and thermodynamics with real-world applications.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      subject: 'Physics',
      icon: <BookOpen className="w-5 h-5" />,
      difficulty: 'intermediate',
      duration: '10 hours'
    },
    {
      id: '5',
      title: 'Essay Writing Techniques',
      description: 'Improve your writing with structure, arguments, and style tips. Learn how to craft compelling essays, develop strong thesis statements, and cite sources properly.',
      url: 'https://www.khanacademy.org/humanities/grammar',
      platform: 'khan-academy',
      subject: 'English',
      icon: <BookOpen className="w-5 h-5" />,
      difficulty: 'beginner',
      duration: '6 hours'
    },
    {
      id: '6',
      title: 'Data Structures & Algorithms',
      description: 'Core computer science concepts with coding examples and practice. Master arrays, linked lists, trees, graphs, sorting, and searching algorithms.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      subject: 'Computer Science',
      icon: <Calculator className="w-5 h-5" />,
      difficulty: 'advanced',
      duration: '20 hours'
    },
    {
      id: '7',
      title: 'Statistics & Probability',
      description: 'Learn statistical analysis, probability theory, and data interpretation. Perfect for understanding research methods and making data-driven decisions.',
      url: 'https://www.khanacademy.org/math/statistics-probability',
      platform: 'khan-academy',
      subject: 'Mathematics',
      icon: <Calculator className="w-5 h-5" />,
      difficulty: 'intermediate',
      duration: '14 hours'
    },
    {
      id: '8',
      title: 'Biology: Cell Structure',
      description: 'Explore the fundamental building blocks of life. Learn about cell organelles, membrane transport, and cellular processes that sustain living organisms.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      subject: 'Biology',
      icon: <Lightbulb className="w-5 h-5" />,
      difficulty: 'beginner',
      duration: '8 hours'
    }
  ])

  const subjects = ['all', ...Array.from(new Set(resources.map(r => r.subject)))]
  const platforms = ['all', ...Array.from(new Set(resources.map(r => r.platform)))]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject
    const matchesPlatform = selectedPlatform === 'all' || resource.platform === selectedPlatform
    
    return matchesSearch && matchesSubject && matchesPlatform
  })

  const getPlatformBadge = (platform: string) => {
    const badges = {
      'youtube': 'bg-red-100 text-red-700 border-red-200',
      'khan-academy': 'bg-green-100 text-green-700 border-green-200',
      'coursera': 'bg-blue-100 text-blue-700 border-blue-200',
      'other': 'bg-gray-100 text-gray-700 border-gray-200'
    }
    return badges[platform as keyof typeof badges] || badges.other
  }

  const getDifficultyBadge = (difficulty: string) => {
    const badges = {
      'beginner': 'bg-green-100 text-green-700',
      'intermediate': 'bg-yellow-100 text-yellow-700',
      'advanced': 'bg-red-100 text-red-700'
    }
    return badges[difficulty as keyof typeof badges] || badges.beginner
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Play className="w-4 h-4" />
      case 'khan-academy':
        return <BookOpen className="w-4 h-4" />
      default:
        return <ExternalLink className="w-4 h-4" />
    }
  }

  const openResource = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-[#398378] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>
            
            <div className="h-6 w-px bg-gray-300"></div>
            
            <div className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-[#398378]" />
              <h1 className="text-xl font-semibold text-gray-900">Study Resources</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border-b p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#398378] focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#398378] focus:border-transparent"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>

              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#398378] focus:border-transparent"
              >
                {platforms.map(platform => (
                  <option key={platform} value={platform}>
                    {platform === 'all' ? 'All Platforms' : platform.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Recommended Learning Resources
          </h2>
          <p className="text-gray-600">
            Found {filteredResources.length} resources to boost your learning journey
          </p>
        </div>

        {/* Resources Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 group ${
                viewMode === 'list' ? 'p-6' : 'p-5'
              }`}
            >
              {/* Resource Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-[#398378] p-2 bg-green-50 rounded-lg">
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {resource.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${getPlatformBadge(resource.platform)}`}>
                        {getPlatformIcon(resource.platform)}
                        {resource.platform === 'khan-academy' ? 'Khan' : resource.platform}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyBadge(resource.difficulty)}`}>
                        {resource.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {resource.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {resource.subject}
                  </span>
                  <span>{resource.duration}</span>
                </div>
                
                <button
                  onClick={() => openResource(resource.url)}
                  className="bg-[#398378] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#376059] transition-colors flex items-center gap-2 group-hover:scale-105 transition-transform"
                >
                  View Resource
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}