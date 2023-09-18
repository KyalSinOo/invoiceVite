import"../scss/app.scss";

import "bootstrap"
import Invoice from "./Invoice";
const invoiceApp=new Invoice({
    totalVoice:true,
    incrementQuantity:3
});

invoiceApp.init()