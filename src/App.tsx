import { useState } from "react"
import { OccasionType, ToneType, type LanguageType } from "./types"
import { LANGUAGES } from "./constants"
import { generateGreeting } from "./services/geminiService"

function App() {
  const [occasion, setOccasion] = useState<OccasionType>(OccasionType.BIRTHDAY)
  const [name, setName] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const [interests, setInterests] = useState<string>("")
  const [tone, setTone] = useState<ToneType>(ToneType.FRIENDLY)
  const [language, setLanguage] = useState<LanguageType>("English")
  const [generatedText, setGeneratedText] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (): Promise<void> => {
    if (!name.trim()) {
      setError("Please, enter the name.")
      return
    }
    setError(null)
    setIsLoading(true)
    setGeneratedText("")
    try {
      const result = await generateGreeting(
        occasion,
        name,
        age,
        interests,
        tone,
        language
      )
      setGeneratedText(result)
    } catch (error: any) {
      setError(error.message || "An error has occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF5FF]">
      <header>Greeting Generator</header>
      <h3>{occasion}</h3>
      <h3>{name}</h3>
      <h3>{age}</h3>
      <h3>{interests}</h3>
      <h3>{tone}</h3>
      <h3>{language}</h3>
      <h2>{generatedText}</h2>
      <h3>{error}</h3>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => setOccasion(OccasionType.BIRTHDAY)}>
            Birthday
          </button>
          <button onClick={() => setOccasion(OccasionType.NEW_YEAR)}>
            New Year
          </button>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Paul"
          />
          <br />
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="25"
          />
          <br />
          <textarea
            value={interests}
            rows={2}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="codding, dogs"
          />
          <br />
          {Object.values(ToneType).map((item) => {
            return (
              <button
                onClick={() => {
                  setTone(item)
                }}
                key={item}
              >
                {item}
              </button>
            )
          })}
          <br />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageType)}
          >
            {LANGUAGES.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <hr />
          <button onClick={handleGenerate} disabled={isLoading}>
            Create Magic
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
