import { GoogleGenAI } from "@google/genai"
import { ToneType, type LanguageType, OccasionType } from "../types"

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

export const generateGreeting = async (
  occasion: OccasionType,
  name: string,
  age: string,
  interests: string,
  tone: ToneType,
  language: LanguageType
): Promise<string> => {
  try {
    const prompt = `
    Write a unique greeting in: ${language}.
    Reason: ${occasion}.
    For whom: ${name}.
    Age: ${age ? age : "not specified"}.
    Interests/Hobbies: ${interests ? interests : "not specified"}.
    Tone: ${tone}.

        Style instructions (adapt to the cultural context of the language ${language}):
        - Official: Restrained, respectful.
        - Friendly: Warm, informal.
        - Humorous: Funny, funny, with a good joke.
         Romantic: Gentle, loving, sensual.
        - Touching: Soulful, emotional.
        - 18+: Cheeky, peppery, sarcastic, or adult jokes. (Only if relevant for the context of 18+).

        General requirements:
        - Be sure to take into account the age and interests of the person.
        - Length: From 2 to 5 sentences.
        - Use 2-3 emojis that match the meaning.
        - Formatting: Just text, without markdown headers.
        - The response language is STRICTLY ${language}.
    `
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: tone === ToneType.ADULT ? 0.9 : 0.8,
      },
    })
    console.log("[generateGreeting]", response.text)
    if (response.text) {
      return response.text
    } else {
      throw new Error("Couldn't generate text.")
    }
  } catch (error) {
    console.error("Gemini text API error", error)
    throw new Error("[generateGreeting] Generation error")
  }
}
