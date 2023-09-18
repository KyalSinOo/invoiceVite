import { createItem } from "./item";
import { calculateTotal, createRecord, updateRecord } from "./record";
import { newItem, newRecord, recordRows } from "./selectors";

const handleAddRecordForm=(e) => {
    e.preventDefault();

    const formData=new FormData(newRecord);

    const isExistedRow = document.querySelector(
      `[product-id='${formData.get("productSelect")}']`
    );
  
    if(isExistedRow){
      updateRecord(formData.get("productSelect"),formData.get("quantity"))


    }else{
      recordRows.append(createRecord(formData.get("productSelect"),formData.get("quantity")))

    }

  
    newRecord.reset();

  
  };
export const handleNewItemForm=(event)=>{
  event.preventDefault()
      const formData=new FormData(newItem)
     createItem(formData.get("newItemName"),formData.get("newItemPrice"))
      ;
    }

  export default handleAddRecordForm