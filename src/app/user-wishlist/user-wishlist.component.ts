import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css']
})
export class UserWishlistComponent implements OnInit{

  allproducts:any=[]

  constructor(private api :ApiService){}

  ngOnInit(): void {
    this.getWishList()
  }


  getWishList() {
    this.api.getWishListAPI().subscribe((res:any) => {
      this.allproducts = res
      console.log(this.allproducts);
      this.api.getWishListCount()
    })
  }

removeItem(id:any) {
  this.api.removeWishListAPI(id).subscribe((res:any) => {
    this.getWishList()
  })
}

}
