'use client'

import { useState } from 'react'
import { Wand2, Code, Sparkles, Settings } from 'lucide-react'
import { professionalPrompts } from '../data/prompts'

interface VideoGeneratorProps {
  onVideoGenerated: (video: any) => void
}

export function VideoGenerator({ onVideoGenerated }: VideoGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [useJson, setUseJson] = useState(false)
  const [jsonConfig, setJsonConfig] = useState(`{
  "duration": 10,
  "aspect_ratio": "16:9",
  "quality": "high",
  "fps": 30,
  "style": "cinematic",
  "camera_motion": "smooth",
  "lighting": "natural"
}`)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = Object.keys(professionalPrompts)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    try {
      let config = {}
      if (useJson) {
        config = JSON.parse(jsonConfig)
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      const video = {
        id: Date.now(),
        prompt,
        config: useJson ? config : null,
        timestamp: new Date().toISOString(),
        status: 'completed',
        thumbnailUrl: `https://picsum.photos/seed/${Date.now()}/640/360`,
        videoUrl: '#',
      }

      onVideoGenerated(video)
      setPrompt('')
    } catch (error) {
      console.error('Error generating video:', error)
      alert('Erro ao gerar vídeo. Verifique a configuração JSON.')
    } finally {
      setIsGenerating(false)
    }
  }

  const usePromptTemplate = (template: string) => {
    setPrompt(template)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Wand2 className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Criar Vídeo
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Sparkles className="w-4 h-4 inline mr-1" />
            Prompts Profissionais
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {professionalPrompts[selectedCategory].map((promptData, index) => (
              <button
                key={index}
                onClick={() => usePromptTemplate(promptData.prompt)}
                className="w-full text-left p-3 bg-purple-50 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="font-medium text-sm text-purple-900 dark:text-purple-300">
                  {promptData.title}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                  {promptData.prompt}
                </div>
              </button>
            ))}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Prompt do Vídeo
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Descreva o vídeo que você quer criar..."
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="useJson"
            checked={useJson}
            onChange={(e) => setUseJson(e.target.checked)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="useJson" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Code className="w-4 h-4" />
            Usar Configuração JSON
          </label>
        </div>

        {useJson && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configuração JSON
            </label>
            <textarea
              value={jsonConfig}
              onChange={(e) => setJsonConfig(e.target.value)}
              className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none json-editor text-sm"
            />
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Gerando...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Wand2 className="w-5 h-5" />
              Gerar Vídeo
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
