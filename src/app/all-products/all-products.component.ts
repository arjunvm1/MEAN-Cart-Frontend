import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

allproducts:any =[]

ngOnInit(): void {
  this.getAllProduct()
}
constructor(private api:ApiService) {}

getAllProduct(){
  this.api.getAllProductsAPI().subscribe({
    next:(res:any) => {
      this.allproducts = res
    },
    error:(reason:any)=>{
      console.log(reason);
      
    }
  })
}

addToWishlist(product:any){
  if(sessionStorage.getItem("token")){
    //proceed to api call
    this.api.addWishlistAPI(product).subscribe({
      next:(res:any) => {
        alert(`${res.title} added to wishlist`)
        this.api.getWishListCount()
      },
      error:(reason:any) => {
        console.log(reason);
        alert(reason.error)
        console.log(reason.error);
        
        
      }
    })
  }else{
    alert("please Login!")
  }
}

addToCart(product:any){
  if(sessionStorage.getItem("token")){
    //proceed to api call
    this.api.addToCartAPI(product).subscribe({
      next:(res:any) => {
        alert(`${res.title} added to cart`);
        this.api.getCartListCount()
      },
      error:(reason:any) => {
        console.log(reason);
        alert(reason.error)
        console.log(reason.error);
      }
    })
  }else{
    alert("please Login!")
  }
}

}
