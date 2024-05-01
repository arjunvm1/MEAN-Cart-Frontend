import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  

  wishlistCount = new BehaviorSubject(0)
  cartlistCount = new BehaviorSubject(0)

  SERVER_URL = "http://localhost:3000"
  constructor(private http:HttpClient) {
    if(sessionStorage.getItem('token')){
      this.getWishListCount()
    }
   }


  getAllProductsAPI() {
   return this.http.get(`${this.SERVER_URL}/allproducts`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`, user);
  }
  
  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`, user);
  }

  viewProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/view/product/${id}`);
  }

  appendTokenToHeader() {
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return {headers}
  }




  //WISHLIST
addWishlistAPI(product:any){
  return this.http.post(`${this.SERVER_URL}/addwishlist`,product,this.appendTokenToHeader());
}

getWishListAPI(){
  return this.http.get(`${this.SERVER_URL}/getwishlist`,this.appendTokenToHeader())
}

getWishListCount() {
  this.getWishListAPI().subscribe((res:any) => {
    this.wishlistCount.next(res.length)
  })
}

getCartListCount(){
  this.getCartListAPI().subscribe((res:any) => {
    this.cartlistCount.next(res.length)
  })
}

removeWishListAPI(id:any) {
  return this.http.delete(`${this.SERVER_URL}/removewishlist/${id}`,this.appendTokenToHeader())
}




//CART

addToCartAPI(product:any) {
  return this.http.post(`${this.SERVER_URL}/addtocart`,product,this.appendTokenToHeader())
}


getCartListAPI() {
  return this.http.get(`${this.SERVER_URL}/getcartlist`, this.appendTokenToHeader());
}


removeCartListAPI(id:any) {
  return this.http.delete(`${this.SERVER_URL}/removecartlist/${id}`,this.appendTokenToHeader())
}



}
