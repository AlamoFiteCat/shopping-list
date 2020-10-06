import { Component, OnInit } from '@angular/core';

// [Store]
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AddItemAction,
  DeleteItemAction,
  LoadShoppingAction,
} from './store/actions/shopping.actions';
import { AppState } from './store/models/app-state';
import { ShoppingItem } from './store/models/shopping-item';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // [Properties]
  shoppingItems$: Observable<ShoppingItem[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  newShoppingItem: ShoppingItem = { id: '', name: '' };

  constructor(private _store: Store<AppState>) {}
  ngOnInit() {
    this.shoppingItems$ = this._store.select((store) => store.shopping.list);
    this.loading$ = this._store.select((store) => store.shopping.loading);
    this.error$ = this._store.select((store) => store.shopping.error);

    this._store.dispatch(new LoadShoppingAction());
  }

  addItem() {
    this.newShoppingItem.id = uuid();
    this._store.dispatch(new AddItemAction(this.newShoppingItem));
    this.newShoppingItem = { id: '', name: '' };
  }

  deleteItem(id: string) {
    this._store.dispatch(new DeleteItemAction(id));
  }
}
