export async function geminiGenerateImage(prompt: string): Promise<string | null> {
  if (!process.env.GEMINI_API_KEY) return null
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
        }),
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    const part = data.candidates?.[0]?.content?.parts?.find((p: { inlineData?: { data: string } }) => p.inlineData)
    return part?.inlineData?.data ? `data:image/png;base64,${part.inlineData.data}` : null
  } catch {
    return null
  }
}
