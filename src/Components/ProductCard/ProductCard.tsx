import "./ProductCard.sass"
import Image from "../Image/Image";
import Button from "../UI/Button/Button";
import { IProduct } from "../Interface/Interface";
import { txtSlicer } from "../Utils/Function";
import CircleColor from "../UI/CircleColor/CircleColor";

interface Iprops{
   product:IProduct;
   setproducttoedit:(product:IProduct)=>void;
   openModalEditModal:()=>void;
   index:number;
   setproducttoeditIndex:(value:number)=>void;
   openRemoveModal : ()=> void
}
const ProductCard= ({product,setproducttoedit,openModalEditModal,setproducttoeditIndex,index,openRemoveModal}:Iprops) => {
  const {imageURL,title,description,price,category,colors}=product;
  const renderProductColor=colors.map(color=><CircleColor key={color} color={color} />);
  const onEdit=()=>{
    setproducttoedit(product);
    openModalEditModal();
    setproducttoeditIndex(index);
  }
   const onRemove=()=>{
    setproducttoedit(product);
    openRemoveModal();
    setproducttoeditIndex(index);
   }
  return (
    <div>
        <div className=" max-w-sm md:max-w-lg mx-auto md:mx-2 border p-3 m-2 flex flex-col rounded-xl capitalize" >
           <Image srcurl={imageURL} alt={"product"} className="rounded-lg h-80 w-full" />
           <h3 className="text-xl font-semibold my-3">{title}</h3>  
           <p className="text-md mb-1">{txtSlicer(description)}</p>
           <div className="flex items-center flex-wrap space-x-2 my-3">
                   {renderProductColor}
              </div> 
        
           <div className="flex items-center justify-between my-2">
               <span className="text-xl font-bold text-blue-700">${price}.00</span>
               <Image srcurl={category.imageURL} alt={category.name} className="w-10 h-10 rounded-full object-bottom" />
           </div>
           <div className="flex items-center space-x-1 justify-between flex-wrap">
                <Button className=" bg-indigo-700 px-12" onClick={onEdit} >Edit</Button>
                <Button className=" bg-red-700 px-10" onClick={onRemove}>Remove</Button>
           </div>
        </div>
    </div>
  )
}


export default ProductCard

