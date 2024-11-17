import { HTMLAttributes, memo } from "react"

interface Iprops extends HTMLAttributes<HTMLSpanElement>{
    color:string,
}
const CircleColor= ({color,...reset}:Iprops) => {
  return (
    <div>
         <span className={`block w-5 h-5 rounded-full cursor-pointer`} style={{backgroundColor:color}} 
          {...reset}/>
    </div>
  )
}

export default memo(CircleColor)