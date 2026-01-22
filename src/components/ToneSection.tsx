import type { FC } from "react"
import { ToneType } from "../types"

interface IToneSectionProps {
  selectedTone: ToneType
  setTone: React.Dispatch<React.SetStateAction<ToneType>>
}

const ToneSection: FC<IToneSectionProps> = ({ setTone, selectedTone }) => {
  const tones = Object.values(ToneType)
  return (
    <div className="flex flex-wrap gap-3">
      {tones.map((item) => {
        return (
          <button
            onClick={() => {
              setTone(item)
            }}
            key={item}
            className={`
            px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2
            ${
              selectedTone === item
                ? "border-purple-500 bg-purple-50 text-purple-700 shadow-md"
                : "border-gray-100 bg-white text-gray-500 hover:border-purple-200 hover:bg-purple-50/50"
            }
          `}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

export default ToneSection
