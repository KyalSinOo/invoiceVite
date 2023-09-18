import { products, userConfig } from "./data";
import handleAddRecordForm, { handleNewItemForm } from "./handler";
import { itemRender } from "./item";
import productRender from "./product";
import {  createRecord, observerOptions, recordRowObserver } from "./record";
import { newItem, newRecord, recordRows } from "./selectors";

class Invoice{

    constructor(options = null){
        console.log(options);

        if(typeof options === "object" ){
            for(let option in options){
                userConfig[option]=options[option]
            }
            console.log(userConfig);
        }
    }

    initialRender(){
        //1.product Render
        productRender(products)
        itemRender(products)
    
        localStorage.getItem("rows")&&
          JSON.parse(localStorage.getItem("rows")).forEach(({productId,quantity})=>recordRows.append(createRecord(productId,quantity)))
 
    }
    listener(){

            //2.event listen
    newRecord.addEventListener('submit',handleAddRecordForm)

    newItem.addEventListener('submit',handleNewItemForm)

    }

    observer(){
        recordRowObserver.observe(recordRows,observerOptions)

    }
init(){
    console.log("invoice app start");

   this.observer()

   this.initialRender()

   this.listener()
}
}

export default Invoice