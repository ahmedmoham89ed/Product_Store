interface Iprops{
   srcurl:string,
   alt:string,
   className:string
}
const Image= ({srcurl,alt,className}:Iprops) => {
  return (
    <div>
      <img src={srcurl} alt={alt} className={className} />
    </div>
  )
}

export default Image