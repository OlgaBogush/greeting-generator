import type { FC } from "react"
import { Calendar, Heart, User } from "lucide-react"

interface IUserDetailsSectionProps {
  name: string
  age: string
  error: string | null
  interests: string
  setName: React.Dispatch<React.SetStateAction<string>>
  setAge: React.Dispatch<React.SetStateAction<string>>
  setError: React.Dispatch<React.SetStateAction<string | null>>
  setInterests: React.Dispatch<React.SetStateAction<string>>
}

const UserDetailsSection: FC<IUserDetailsSectionProps> = ({
  name,
  age,
  error,
  interests,
  setName,
  setAge,
  setError,
  setInterests,
}) => {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs">
          2
        </span>
        About the recipient
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 relative group">
          <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
            Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError(null)
              }}
              placeholder="Paul"
              className={`
                    block w-full pl-9 pr-4 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all
                    ${
                      error
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-100 focus:border-purple-500"
                    }
                `}
            />
          </div>
        </div>
        <div className="col-span-1 relative group">
          <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
            Age
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
            <input
              type="number"
              min={1}
              max={120}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              className="block w-full pl-9 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="relative group">
        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
          Interests and hobbies
        </label>
        <div className="relative">
          <div className="absolute top-3.5 left-3 flex items-start pointer-events-none">
            <Heart className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
          </div>
          <textarea
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            rows={2}
            className="block w-full pl-9 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all resize-none"
            placeholder="codding, dogs"
          />
        </div>
      </div>
    </section>
  )
}

export default UserDetailsSection
