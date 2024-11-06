export  const productvalidation=(product:{title:string,description:string,price:string,imageURL:string})=>{
    const errors:{title:string,description:string,price:string,imageURL:string}={
        title:"",
        description:"",
        imageURL:"",
        price:"",

    };
    const validurl=/^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);
    if (!product.title.trim()||product.title.length<4||product.title.length>80) {
        errors.title="product title must be beteween 4 to 80";
    }
 
    if (!product.description.trim()||product.description.length<10||product.description.length>900) {
        errors.description="product description must be beteween 10 to 900";
    }
    if(!product.imageURL.trim()|| !validurl){
        errors.imageURL="valid image url is required";
    }
    if(!product.price.trim()||isNaN(Number(product.price))){
        errors.price="Valid price is required";
    }

     return errors;
    
}