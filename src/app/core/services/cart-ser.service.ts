import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { Observable, single } from 'rxjs';
import { envionment } from '../environments/envionment';
import { env } from 'process';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartSerService implements OnInit {
  _PLATFORM_ID = inject(PLATFORM_ID);
  constructor(private _HttpClient: HttpClient) {
    this.get_cart().subscribe({
      next:(res)=>{
        // console.log(res.numOfCartItems);
        this.changeCounter(res.numOfCartItems);
        
      },
      error:(err)=>{
        // console.log(err);
        
      }
    })
  }
  ngOnInit(): void {}
  countCart=signal(0);
  changeCounter(newcounter:number)
  {
    this.countCart.set(newcounter);
  }

  add_to_cart(Id: string): Observable<any> {
    let token = '';
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      token = localStorage.getItem('userData')!;
    }
    return this._HttpClient.post(
      `${envionment.baseUrl}/api/v1/cart`,
      { productId: Id },
      { headers: { token: token } }
    );
  }
  get_cart(): Observable<any> {
    let token = '';
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      token = localStorage.getItem('userData')!;
    }
    return this._HttpClient.get(`${envionment.baseUrl}/api/v1/cart`, {
      headers: new HttpHeaders({ token: token }),
    });
  }
  updata_quntity(pid: string, count: number): Observable<any> {
    let token = '';
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      token = localStorage.getItem('userData')!;
    }
    return this._HttpClient.put(
      `${envionment.baseUrl}/api/v1/cart/${pid}`,
      {
        count: count,
      },
      { headers: { token: token } }
    );
  }
  delete_item(id: string): Observable<any> {
    let token = '';
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      token = localStorage.getItem('userData')!;
    }
    return this._HttpClient.delete(`${envionment.baseUrl}/api/v1/cart/${id}`, {
      headers: { token: token },
    });
  }
  clear_cart(): Observable<any> {
    let token = '';
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      token = localStorage.getItem('userData')!;
    }
    return this._HttpClient.delete(`${envionment.baseUrl}/api/v1/cart`, {
      headers: { token: token },
    });
  }
}
