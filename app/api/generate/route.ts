import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, config } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Simulate Sora 2 API call
    // In production, this would call the actual Sora 2 API
    const response = {
      id: Date.now().toString(),
      prompt,
      config,
      status: 'processing',
      estimatedTime: 60, // seconds
      videoUrl: null,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error generating video:', error)
    return NextResponse.json(
      { error: 'Failed to generate video' },
      { status: 500 }
    )
  }
}
