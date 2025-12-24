'use client'

import { useState } from 'react'
import { VideoGenerator } from './components/VideoGenerator'
import { VideoPreview } from './components/VideoPreview'
import { Sparkles } from 'lucide-react'

export default function Home() {
  const [generatedVideos, setGeneratedVideos] = useState<any[]>([])

  const handleVideoGenerated = (video: any) => {
    setGeneratedVideos(prev => [video, ...prev])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-12 h-12 text-purple-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Sora 2 Video Generator
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Gerador profissional de vídeos com prompts otimizados e configuração JSON
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VideoGenerator onVideoGenerated={handleVideoGenerated} />

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Vídeos Gerados
            </h2>
            {generatedVideos.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum vídeo gerado ainda. Crie seu primeiro vídeo!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {generatedVideos.map((video, index) => (
                  <VideoPreview key={index} video={video} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
