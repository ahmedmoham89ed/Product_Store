import { ReactNode } from "react"

interface Iprops{
    children:ReactNode,
    className?:string,
    width?:"w-full"|"w-fit",
    onClick?:()=>void
}
const Button= ({children,className,width="w-full",onClick,...reset}:Iprops) => {
  return (
    <div>
      <button onClick={onClick} className={`${className} ${width} text-white text-lg font-medium capitalize rounded-md  p-2 mt-2 `} {...reset}>{children} </button>
    </div>
  )
}

export default Button