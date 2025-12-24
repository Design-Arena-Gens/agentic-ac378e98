'use client'

import { Download, Eye, Code2 } from 'lucide-react'
import { useState } from 'react'

interface VideoPreviewProps {
  video: {
    id: number
    prompt: string
    config: any
    timestamp: string
    status: string
    thumbnailUrl: string
    videoUrl: string
  }
}

export function VideoPreview({ video }: VideoPreviewProps) {
  const [showConfig, setShowConfig] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="relative group">
        <img
          src={video.thumbnailUrl}
          alt="Video thumbnail"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors">
            <Eye className="w-5 h-5" />
          </button>
          <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {video.prompt}
          </p>
          {video.config && (
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="text-purple-600 hover:text-purple-700 flex-shrink-0"
            >
              <Code2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {showConfig && video.config && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
              {JSON.stringify(video.config, null, 2)}
            </pre>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{new Date(video.timestamp).toLocaleString('pt-BR')}</span>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
            {video.status}
          </span>
        </div>
      </div>
    </div>
  )
}
