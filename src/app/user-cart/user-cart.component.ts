import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit{


  allproducts:any=[]


  ngOnInit(): void {
    this.getCartList()
  }

  getCartList(){
    this.api.getCartListAPI().subscribe((res:any) => {
      this.allproducts = res;
      console.log(this.allproducts);
      this.api.getCartListCount()
      
    })
  }


  constructor(private api:ApiService){}




  removeItem(id:any) {
    this.api.removeCartListAPI(id).subscribe((res:any) => {
      this.getCartList();
    })
  }

}
