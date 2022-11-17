import { useState } from 'react'

interface Props {
  className?: string
  onClick?: () => void
  text?: string
  rounded?: boolean
  label?: string
  type?: 'button' | 'submit' | 'reset'
}

function SolidButton({ className, onClick, text, rounded, label, type }: Props) {

  const [clicked, setClicked] = useState(false)

  return (
    <>
      <button type={type} className={`relative ${className}`} onPointerOver={() => setClicked(false)} onClick={(e) => {
        setClicked(true)
        onClick?.()
      }}>
        <div className={`absolute inset-x-0 h-full -bottom-2 bg-dark-acid ${rounded ? "rounded-full" : null}`} />
        <label htmlFor={label} className="cursor-pointer">
          <div className={`${rounded ? "rounded-full" : "px-4"} relative bg-acid py-4 transition transform duration-500 ${clicked ? 'hover:translate-y-2' : 'hover:translate-y-1'}`}>
            <p>{text}</p>
          </div>
        </label>
      </button>
    </>
  )
}

export default SolidButton