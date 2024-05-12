import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ecommerce';
  cartProducts: any[] = []; // we need to store the cart items
  constructor(private productService: ProductService){
    // we need to subscribe to that emitted cartAddedSubject
    this.productService.cartAddedSubject.subscribe(res=>{
      this.loadCart();
    })
  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.productService.getCartItemsByCusId(1).subscribe((res: any)=>{
      this.cartProducts =  res.data;
     
    })
  }
}
