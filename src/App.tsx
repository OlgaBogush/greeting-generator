import { useState } from "react"
import { OccasionType, ToneType, type LanguageType } from "./types"
import { LANGUAGES } from "./constants"
import { generateGreeting } from "./services/geminiService"
import Header from "./components/Header"
import Title from "./components/Title"
import OccasionButton from "./components/OccasionButton"
import { Cake, Snowflake } from "lucide-react"

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
      <Header />

      {/* <h3>{occasion}</h3>
      <h3>{name}</h3>
      <h3>{age}</h3>
      <h3>{interests}</h3>
      <h3>{tone}</h3>
      <h3>{language}</h3>
      <h3>{error}</h3>
      <h2>{generatedText}</h2> */}

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <Title />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5 spase-y-10">
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs">
                      1
                    </span>
                    Choose a holiday
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <OccasionButton
                    customClick={() => setOccasion(OccasionType.BIRTHDAY)}
                    selected={occasion === OccasionType.BIRTHDAY}
                    title={OccasionType.BIRTHDAY}
                    icon={Cake}
                  />
                  <OccasionButton
                    customClick={() => setOccasion(OccasionType.NEW_YEAR)}
                    selected={occasion === OccasionType.NEW_YEAR}
                    title={OccasionType.NEW_YEAR}
                    icon={Snowflake}
                  />
                </div>
              </section>
            </div>
            <div className="lg:col-span-7 h-full">2</div>
          </div>

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
