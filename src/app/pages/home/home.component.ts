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

  constructor(private productService: ProductService){
  }
  ngOnInit(): void {
    this.loadAllProducts();
  }
  loadAllProducts(){
    debugger;
  this.productService.getAllProducts().subscribe((result: any)=>{
    this.productList = result.data;
    console.log('resu', this.productList);
  })
  }
}
