import { memo } from "react"

interface Iprops{
  msg:string
}
const ErrorMessage= ({msg}:Iprops) => {
  return msg?<span className="blocked text-red-800 font-semibold text-sm ">{msg}</span>:null

}

export default memo(ErrorMessage)