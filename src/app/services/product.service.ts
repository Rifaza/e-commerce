import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //Whenever we added the data we need to added into the cart For that we need to use the subject.
  public cartAddedSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getAllProducts():Observable<any[]>{
    return this.http.get<any[]>("https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProducts")
  }

  getAllProductsByCategory(id: number) : Observable<any[]>{
    return this.http.get<any[]>("https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId?id="+id)
  }
  getAllCategory():Observable<any[]>{
    return this.http.get<any[]>("https://onlinetestapi.gerasim.in/api/Ecomm/GetAllCategory")
  }
  addToCart(obj: any):Observable<any>{
    return this.http.post<any>("https://onlinetestapi.gerasim.in/api/Ecomm/AddToCart", obj)
  }
  // we are getting the cart product by customer id
  getCartItemsByCusId(cusId: number) : Observable<any[]>{
    return this.http.get<any[]>("https://onlinetestapi.gerasim.in/api/Ecomm/GetCartProductsByCustomerId?id="+cusId)

  }
    // we are getting the cart product by customer id
    removeCartItemById(cartId: number) : Observable<any[]>{
      return this.http.get<any[]>("https://onlinetestapi.gerasim.in/api/Ecomm/DeleteProductFromCartById?id="+cartId)
    }
  
    makeSale(obj: any) : Observable<any> {
      return this.http.post<any>("https://onlinetestapi.gerasim.in/api/Ecomm/AddNewSale",obj);
    }


    
  }
