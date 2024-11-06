import { ChangeEvent, useState,FormEvent, useCallback } from 'react';
import './App.css'
import { categories, colors, formInputList, productList } from './Components/data'
import ProductCard from './Components/ProductCard/ProductCard'
import Model from './Components/UI/Model/Model';
import Button from './Components/UI/Button/Button';
import Input from './Components/UI/Input/Input';
import { IProduct, ProductNameTypes } from './Components/Interface/Interface';
import { productvalidation } from './Components/Validation/Validation';
import ErrorMessage from './Components/UI/Error/ErrorMessage';
import CircleColor from './Components/UI/CircleColor/CircleColor';
import {v4 as uuid } from 'uuid';
import { Example } from './Components/UI/Select/Select';
import toast, { Toaster } from 'react-hot-toast';

function App() {
    // add new product
    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
      const {value,name}=event.target;
      setproduct({
        ...prod,
        [name]:value,
      });
      seterrors({
        ...errors,
        [name]:"",
    })}
    {/* edit product */}
    const onChangeEditHandler=(event:ChangeEvent<HTMLInputElement>)=>{
      const {value,name}=event.target;
      setproducttoedit({
        ...producttoedit,
        [name]:value,
      });
      seterrors({
        ...errors,
        [name]:"",
    })}

    const defaultProduct={title:"",description:"",imageURL:"",price:"",colors:[],category :{name: "",imageURL : ""}}
    const toatStyle = {backgroundColor: '#222',color: 'white'};
    const [tempcolor,settempcolor]=useState<string[]>([]);  
    const [prod,setproduct]=useState<IProduct>(defaultProduct);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [errors,seterrors]=useState({title:"",description:"",imageURL:"",price:"",});
    const closeModal=()=>setIsOpen(false);
    const openModal=()=> setIsOpen(true);
    const closeModalEditModal=()=>setIsOpenEditModal(false);
    const openModalEditModal=()=> setIsOpenEditModal(true);
    const [prods,setproducts]=useState<IProduct[]>(productList);
    const [selectedCategory,setselectedCategory]=useState(categories[0]);
    const [producttoedit,setproducttoedit]=useState<IProduct>(defaultProduct);
    const [producttoeditIndex,setproducttoeditIndex]=useState<number>(0);
    const closeRemoveModal = useCallback(()=> setIsRemoveModalOpen(false),[]);
    const openRemoveModal = useCallback(()=>  setIsRemoveModalOpen(true),[]);
    const onCancelRemove = () => {closeRemoveModal()};
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

    const renderproductList=prods.map((product,index)=>
        <ProductCard openModalEditModal={openModalEditModal}
        key={product.id} 
        product={product} 
        setproducttoedit={setproducttoedit} 
        index={index}
        setproducttoeditIndex={setproducttoeditIndex}
        openRemoveModal={openRemoveModal}
        />
    );
    {/* add new product */}
    const submitHandler=(event:FormEvent<HTMLFormElement>): void=> {
      event.preventDefault();
        const {title,description,imageURL,price}=prod;
        const error=productvalidation({title,description,imageURL,price});

        const hasError=Object.values(error).some(value => value==="") && Object.values(error).every(value => value==="");
        if(!hasError){
          seterrors(error);
            return;
        }
        setproducts(prev=>[{...prod,id:uuid(),colors:tempcolor,category:selectedCategory},...prev]);
        setproduct(defaultProduct);
        settempcolor([ ]);
        closeModal();
        toast('Product Has Added', {style:toatStyle});
    }
    {/* edit product */}
    const submitEditHandler=(event:FormEvent<HTMLFormElement>): void=> {
      event.preventDefault();
        const {title,description,imageURL,price}=producttoedit;
        const error=productvalidation({title,description,imageURL,price});

        const hasError=Object.values(error).some(value => value==="") && Object.values(error).every(value => value==="");
        if(!hasError){
          seterrors(error);
            return;
        }

        const updateproduct=[...prods];
        updateproduct[producttoeditIndex]={...producttoedit,colors:tempcolor.concat(producttoedit.colors)};
        setproducts(updateproduct);
        setproducttoedit(defaultProduct);
        settempcolor([ ]);
        closeModal();
        toast('The Product Has Updated', {style: toatStyle});
    }
    const oncancel=()=>{
      setproduct(defaultProduct);
      closeModal();
    }
    const form=formInputList.map((product,index)=>(
      <div className='flex flex-col '>
          <label htmlFor={product.id}>{product.label}</label>
          <Input key={index} id={product.id} type={product.type} name={product.name} value={prod[product.name]} onChange={onChangeHandler} />
          <ErrorMessage msg={errors[product.name]} />
      </div>
    ));
    const renderProductColor=colors.map(color=><CircleColor key={color} color={color} onClick={()=>{
      if(tempcolor.includes(color)){
        settempcolor(prev=>prev.filter(item=>item !== color))
        return;
      }
      if(producttoedit.colors.includes(color)){
        settempcolor(prev=>prev.filter(item=>item !== color))
        return;
      }
      settempcolor(prev=>[...prev,color])
    }} />)
    const renderProductEditWithErrorMsg= (id:string,label:string,name: ProductNameTypes) => {
      return (
        <label className='block font-medium text-gray-600' htmlFor={id}>
        {label}
        <Input type='text' name={name}  value={producttoedit[name]} onChange={onChangeEditHandler} 
        />
        <ErrorMessage msg={errors[name]} />
      </label>
      )
    };
    // -----Remove Handler
    const onRemoveProduct = () => {
      const updateProducts = [...prods] // new array that contained all pervous data 
      updateProducts.splice(producttoeditIndex,1);
      // const filtered = products.filter(product=> product.id !== productEdit.id); >>>>>>> Another solution (Course Code)
      setproducts(updateProducts);
      closeRemoveModal();
      toast(`The ${producttoedit.title} Product Has Been Removed`, {icon: '👏',style: toatStyle});
    }

  return (
    <main className='container'>
      <div className="flex items-center justify-between mt-12 mb-7 mr-12">
         <p className='text-indigo-600 text-5xl font-bold ml-5'>List of Products</p>
         <Button className='bg-indigo-600 hover:bg-indigo-900 mx-5' onClick={openModal}  >Add Product</Button>
      </div>
      <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 p-2 ">
            {renderproductList}  
      </div>
      {/* edit product */}
      <Model isOpen={isOpenEditModal} closeModal={closeModalEditModal} title={"Edit Product"}  >
          <form className="space-y-3" onSubmit={submitEditHandler}>           
                {renderProductEditWithErrorMsg("title","product title","title")}
                {renderProductEditWithErrorMsg("description","product description","description")}
                {renderProductEditWithErrorMsg("price","product price","price")}
                {renderProductEditWithErrorMsg("imageURL","product imageURL","imageURL")} 
                <Example selected={producttoedit.category} setSelected={(value)=>setproducttoedit({...producttoedit,category:value})} />
  
                <div className="flex items-center flex-wrap space-x-2 my-1" >
                    {tempcolor.concat(producttoedit.colors).map(color=>(
                        <span key={color} className='text-white py-1 my-1 px-1 text-sm rounded-md' style={{backgroundColor:color}}>{color}</span>
                    ))}
                </div>
                
                <div className="flex items-center flex-wrap space-x-2 my-2">
                    {renderProductColor}
                </div>  
              <div className="flex items-center justify-center space-x-4 ">
                  <Button className=" bg-indigo-700 px-12 hover:bg-indigo-900 " >Submit</Button>
                  <Button className=" bg-red-700 px-12 hover:bg-red-800 " onClick={oncancel}>Cancle</Button>
              </div>
          </form>
      </Model>
      {/* add new product */}
      <Model isOpen={isOpen} closeModal={closeModal} title={"Add New Product"}  >
          <form className="space-y-3" onSubmit={submitHandler}>
                {form}

                <Example selected={selectedCategory} setSelected={setselectedCategory} />

                <div className="flex items-center flex-wrap space-x-2 my-1" >
                    {tempcolor.map(color=>(
                        <span key={color} className='text-white py-1 my-1 px-1 text-sm rounded-md' style={{backgroundColor:color}}>{color}</span>
                    ))}
                </div>
                
                <div className="flex items-center flex-wrap space-x-2 my-2">
                    {renderProductColor}
                </div>
                
              <div className="flex items-center justify-center space-x-4 ">
                  <Button className=" bg-indigo-700 px-12 hover:bg-indigo-900 " >Submit</Button>
                  <Button className=" bg-red-700 px-12 hover:bg-red-800 " onClick={oncancel}>Cancle</Button>
              </div>

          </form>
      </Model>
      {/* -----------Remove PRODUCT MODAL---------------- */} 
      <Model isOpen={isRemoveModalOpen} closeModal={closeRemoveModal} title='Are You Sure You Want to Remove This Product?'>
            <p>
              Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action.
            </p>
              <div className='flex space-x-2 mt-3'>
                <Button className='bg-red-800  hover:bg-red-600' onClick={onRemoveProduct}>Remove</Button>
                <Button className='bg-gray-400  hover:bg-gray-500' onClick={onCancelRemove} >CANCEL</Button>
              </div>
      </Model>
      <Toaster/>
    </main>
  )
}

export default App
