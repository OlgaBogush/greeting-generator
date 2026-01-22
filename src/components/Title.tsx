import type { FC } from "react"

const Title: FC = () => {
  return (
    <div className="mb-10 sm:mb-16">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
        Create <span className="text-purple-600">unique</span>
        <br className="hidden sm:block" /> congratulation
      </h2>
      <p className="text-gray-500 text-lg max-w-2xl">
        Choose a holiday, enter a name and the magic will begin! Our AI will
        create a personal wish in seconds.
      </p>
    </div>
  )
}

export default Title
