import { InputHTMLAttributes } from "react"

interface Iprops extends InputHTMLAttributes<HTMLInputElement>{
  
}
const Input= ({...reset}:Iprops) => {
  return (
    <div>
        <div className="flex flex-col">
          <input {...reset} className=' focus:border-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-400 border-2 shadow-2xl border-gray-400 h-10 rounded-md hover:border-2 hover:border-indigo-700 indent-3 ' />
       </div>

    </div>
  )
}

export default Input