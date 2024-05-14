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
  categories: any[] = [];
  selectedCategory: number = 0;
  cartObj: any = {
    "CartId": 0,
    "CustId": 1,
    "ProductId": 0,
    "Quantity": 1,
    "AddedDate": "2024-05-12T07:50:56.221Z"
}
  constructor(private productService: ProductService){
  }
  
  ngOnInit(): void {
    this.loadAllProducts();
    this.loadCatogories();
  }

  loadAllProducts(){
  this.productService.getAllProducts().subscribe((result: any)=>{
    this.productList = result.data;
  })
  }
  
  getAllProductsByCategory(id: number){
    this.selectedCategory = id;
    this.productService.getAllProductsByCategory(id).subscribe((result: any)=>{
      this.productList = result.data;
    })
    }
  
    loadCatogories(){
      this.productService.getAllCategory().subscribe((result: any)=>{
        this.categories = result.data;})
      }
  addItemToCart(productId: number){
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
