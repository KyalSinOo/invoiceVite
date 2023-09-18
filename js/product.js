import { productSelect } from "./selectors";

const productRender=(products)=>{
    products.forEach(({id,name,price}) => {
        productSelect.append(new Option(name,id));
       
      });
};
export default productRender