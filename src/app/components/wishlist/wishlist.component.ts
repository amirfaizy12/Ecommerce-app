import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartSerService } from './../../core/services/cart-ser.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  // all_wishlist_porducts !:Iwishlist[];
  // respons:WritableSignal<any>=signal(null)
  respons:any;
  constructor(private _WishlistService :WishlistService,private _ToastrService:ToastrService,private _CartSerService: CartSerService){}

  ngOnInit(){
this._WishlistService.get_logged_user_wishlist().subscribe({
  next:(res)=>{
    // console.log(res);
    this.respons=res;
   
    // this._CounterService.wishlist_count.set(this.respons.count)
    this._WishlistService.changeWishlistCounter(this.respons.count);
    
    
    
  },
  error:(err)=>{
    // console.log(res);
    // this.respons=res;
   
    // this._CounterService.wishlist_count.set(this.respons.count)
    
    console.log(err);
    
    
  }
})
  }

add_to_cart(id:string):void{
  this._CartSerService.add_to_cart(id).subscribe({
    next:(res)=>{
      this._ToastrService.success(res.message)
      this._CartSerService.changeCounter(res.numOfCartItems);
      // this._CounterService.chenageData(res.numOfCartItems) //change here the data
      console.log(res);
      
    },
    error:(err)=>{
      // this._ToastrService.success(res.message)
      // this._CounterService.chenageData(res.numOfCartItems) //change here the data
      console.log(err);
      
    }
  })
}
remove(id:string){
 this._WishlistService.remove_item_from_wishlist(id).subscribe({
  next:(res)=>{
    this._ToastrService.error(res.message)
    console.log(res.data);
    this._WishlistService.get_logged_user_wishlist().subscribe((res)=>{
      this.respons=res;
      // this._CounterService.wishlist_count.set(this.respons.count)
      this._WishlistService.changeWishlistCounter(this.respons.count);
    })
    
   },
   error:(err)=>{
    // this._ToastrService.error(res.message)
    console.log(err);
    // this._WishlistService.get_logged_user_wishlist().subscribe((res)=>{
    //   this.respons=res;
    //   this._CounterService.wishlist_count.set(this.respons.count)
    // })
    
   }
 })
}
}
