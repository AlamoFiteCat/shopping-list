import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { ShoppingItem } from '../store/models/shopping-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private BASE_URL = 'http://localhost:3000';
  private SHOPPING_URL = `${this.BASE_URL}/shopping`;

  constructor(private _http: HttpClient) {}

  getShoppingItems() {
    return this._http.get<ShoppingItem[]>(this.SHOPPING_URL).pipe(delay(500));
  }
  addShoppingItem(shoppingItem: ShoppingItem) {
    return this._http.post(this.SHOPPING_URL, shoppingItem).pipe(delay(500));
  }
  deleteShoppingItem(id: string) {
    return this._http.delete(`${this.SHOPPING_URL}/${id}`).pipe(delay(500));
  }
}
