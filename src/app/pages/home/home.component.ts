import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  productList: any[] = [];
cartObj: any = {
  "CartId": 0,
  "CustId": 1,
  "ProductId": 0,
  "Quantity": 0,
  "AddedDate": "2024-05-12T07:50:56.221Z"
}
  constructor(private productService: ProductService){
  }
  ngOnInit(): void {
    this.loadAllProducts();
  }
  loadAllProducts(){

  this.productService.getAllProducts().subscribe((result: any)=>{
    this.productList = result.data;
    console.log('resu', this.productList);
  })
  }
  addItemToCart(productId: number){
    debugger;
    this.cartObj.ProductId = productId;
    this.productService.addToCart(this.cartObj).subscribe((result: any)=>{
    // whenever we added something into the cart we need to emit that subject

    if(result.result){
      alert("Product added to cart");
          // whenever we added something into the cart we need to emit that subject
      this.productService.cartAddedSubject.next(true)
    }


})

  }
}
