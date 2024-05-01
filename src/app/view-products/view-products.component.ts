import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit{
  product:any = {}

  constructor(private route:ActivatedRoute ,private api:ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((res:any) =>{
      console.log(res);
      const {id} = res 
      this.getProduct(id)
    })
  }

  getProduct(pid:any){
    this.api.viewProductAPI(pid).subscribe((res:any) =>{
      this.product = res
      console.log(this.product); 
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
