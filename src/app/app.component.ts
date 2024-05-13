import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ecommerce';
  cartProducts: any[] = []; // we need to store the cart items
  subTotal: number = 0;

  constructor(private productService: ProductService){
    // we need to subscribe to that emitted cartAddedSubject, then only imediatly the cart products will be updated
    this.productService.cartAddedSubject.subscribe(res=>{
      this.loadCart();
    })
  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    // we are using customerId 1 as a defult for now.
    this.productService.getCartItemsByCusId(1).subscribe((res: any)=>{
      this.cartProducts =  res.data;
      console.log('this.cartPro', this.cartProducts);
      this.cartProducts.forEach((addedProduct)=>{
        this.subTotal = this.subTotal + addedProduct.productPrice;
      })
    })
  }

  // we have to open the sale page when we click on the checkout
  redirectToSale(){
  }
}
