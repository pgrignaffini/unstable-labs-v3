import { useState } from 'react'

interface Props {
  className?: string
  onClick?: () => void
  text?: string
  rounded?: boolean
  label?: string
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  color: 'green' | 'red' | 'blue'
}

function SolidButton({ className, onClick, text, rounded, label, type, loading, color }: Props) {

  const [clicked, setClicked] = useState(false)

  return (
    <>
      <button type={type} disabled={loading} className={`relative ${className}`} onPointerOver={() => setClicked(false)} onClick={() => {
        setClicked(true)
        onClick?.()
      }}>
        <div className={`absolute inset-x-0 h-full -bottom-2 
        ${color === "green" ? "bg-dark-acid" : color === "red" ? "bg-red-900" : "bg-blue-900"}
        ${rounded ? "rounded-full" : null}`} />
        <label htmlFor={label} className="cursor-pointer">
          <div className={`${rounded ? "rounded-full" : "px-4"} flex items-end space-x-2 relative
                  ${color === "green" ? "bg-acid" : color === "red" ? "bg-red-600" : "bg-blue-600"}
                  py-4 transition transform duration-500 ${clicked ? 'hover:translate-y-2' : 'hover:translate-y-1'}`}>
            <p>{text}</p>
            {loading && <img src='/flask.png' className="animate-tremble h-7 w-5" />}
          </div>
        </label>
      </button>
    </>
  )
}

export default SolidButton