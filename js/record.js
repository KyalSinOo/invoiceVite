import { products, userConfig } from "./data";
import { cost, textToSpeech } from "./function";
import { recordRows, recordsTotal } from "./selectors";

export const createRecord=(productId,quantity)=>{
    const {id,name,price} = products.find(({id}) => id == productId);
  

  const tableRow = document.createElement("tr");
  tableRow.classList.add("record-row");
  tableRow.setAttribute("product-id", productId);
  tableRow.innerHTML = `
          <td class='record-no'></td>
          <td class="text-start record-product">${name}</td>
          <td class="text-end record-price">${price}</td>
          <td class="text-end ">
          <span>
            <i class=" record-quantity-control record-quantity-decrement bi bi-dash"></i>
          </span>
          <span class='record-quantity'>
          ${quantity}
          </span>
          <span>
            <i class=" record-quantity-control record-quantity-increment bi bi-plus"></i>
          </span>
          </td>
          <td class="text-end position-relative">
          <span class='record-cost'>${cost(price,quantity)}</span>
          <button class=" d-print-none btn btn-sm btn-primary record-row-del position-absolute">
            <i class=" bi bi-trash3"></i>
          </button>
          </td>
      `;

  tableRow.querySelector(".record-row-del").addEventListener("click", deleteRecord);

tableRow.querySelector(".record-quantity-increment").addEventListener('click',updateRecord.bind(null,productId,1));



// updateRecord.bind(null,productId,-1)
// const currentRecord = document.querySelector(`[product-id='${productId}']`);

tableRow.querySelector(".record-quantity-decrement").addEventListener('click',updateRecord.bind(null,productId,-1));
// let min=0;
// tableRow.querySelector(".record-quantity-decrement").addEventListener
// ('click',()=>{
//   const cQuantity = document.querySelector(".record-quantity");

// console.log(cQuantity.innerText);
// if(cQuantity.innerText>min){
// updateRecord.bind(null,productId,-1)
// }
// });



  return tableRow;
};



export const deleteRecord=(event)=>{



    if (confirm("Are U sure to remove product ?")) {
      const tableRow=event.target.closest("tr")
              tableRow.classList.add("animate__animated", "animate__fadeOut");
              tableRow.addEventListener("animationend", () => {
                tableRow.remove();
              });
            }
          }
  export const incrementRecordQuantity=(productId)=>{
    updateRecord(productId,userConfig.incrementRecordQuantity);
  };
  
export const decrementRecordQuantity=(productId)=>{
  const currentRecord=document.querySelector(`[product-id='${productId}']`);
  let currentQuantity = currentRecord.querySelector(".record-quantity");

  if(currentQuantity.innerText>1){
    updateRecord(productId,-1);
  }

  }


export const updateRecord=(productId,quantity)=>{
  const isExistedRow = document.querySelector(
    `[product-id='${productId}']`
  );

  let currentPrice = isExistedRow.querySelector(".record-price");
  let currentQuantity = isExistedRow.querySelector(".record-quantity");
  let currentCost = isExistedRow.querySelector(".record-cost");

  let newQuantity =
    parseFloat(currentQuantity.innerText) + parseFloat(quantity);
  let newCost = currentPrice.innerText * newQuantity;

  currentQuantity.innerText = newQuantity;
  currentCost.innerText = newCost;

}
export const calculateTotal=()=>{
    recordsTotal.innerText = [
        ...document.querySelectorAll(".record-cost"),
      ].reduce((pv, cv) => pv + parseFloat(cv.innerText), 0);
}

export const observerOptions = {
  childList: true,
  subtree: true,
};
export const recordRowObserver=new MutationObserver(() => {
  // console.log("I am working");

  calculateTotal()
  

  const rows=[...document.querySelectorAll(".record-row")].map(el=>{
    return {productId:parseInt(el.getAttribute("product-id")),quantity:parseFloat(el.querySelector(".record-quantity").innerText)}
  });

localStorage.setItem("rows",JSON.stringify(rows))

// console.log(rows);


userConfig.totalVoice && textToSpeech(recordsTotal.innerText,0.9,1)

})

