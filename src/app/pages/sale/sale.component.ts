import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent implements OnInit {
  cartProducts: any[] = []; // we need to store the cart items
  subTotal: number = 0;
  saleObj: any =  {
    "SaleId": 0,
    "CustId": 1,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "Patmm ",
    "DeliveryAddress1": "Plot nio 122",
    "DeliveryAddress2": "Ner ATM",
    "DeliveryCity": "Pune",
    "DeliveryPinCode": "440033",
    "DeliveryLandMark": "ATM"
};
  constructor(private productService: ProductService){
      debugger;
  }
  ngOnInit(): void {
    this.loadCart();
  }
  loadCart() {
    this.subTotal = 0;
    // we are using customerId 1 as a defult for now.
    this.productService.getCartItemsByCusId(1).subscribe((res: any)=>{
      this.cartProducts =  res.data;
      console.log('this.cartPro', this.cartProducts);
      this.cartProducts.forEach((addedProduct)=>{
        this.subTotal = this.subTotal + addedProduct.productPrice;
      })
    })
  }

  removeItem(id: number){
    this.productService.removeCartItemById(id).subscribe((res: any)=>{
      if(res.result){
        //after removing the cart item we need to load the updated cart again
        this.loadCart();
        this.productService.cartAddedSubject.next(true)
      }
    })
  }
  makeSale() {
    this.saleObj.TotalInvoiceAmount = this.subTotal;
    this.productService.cartAddedSubject.next(true);
    this.productService.makeSale( this.saleObj).subscribe((res: any) => {
      if (res.result) {
        alert("Sale Success")
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
    })
  }
}
