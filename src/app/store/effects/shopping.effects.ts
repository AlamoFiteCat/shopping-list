import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  AddItemAction,
  AddItemSuccessAction,
  AddItemFailureAction,
  LoadShoppingAction,
  LoadShoppingFailureAction,
  LoadShoppingSuccessAction,
  ShoppingActionTypes,
  DeleteItemAction,
  DeleteItemSuccessAction,
  DeleteItemFailureAction,
} from '../actions/shopping.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShoppingService } from '../../services/shopping.service';

@Injectable()
export class ShoppingEffects {
  constructor(private actions$: Actions, private _ss: ShoppingService) {}

  // [Load Items Effect]
  @Effect() loadShopping$ = this.actions$.pipe(
    ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
    mergeMap(() =>
      this._ss
        .getShoppingItems()
        .pipe(map((data) => new LoadShoppingSuccessAction(data)))
    ),
    catchError((e) => of(new LoadShoppingFailureAction(e)))
  );

  // [Add Item Effect]
  @Effect() addShoppingItem$ = this.actions$.pipe(
    ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
    mergeMap((data) =>
      this._ss.addShoppingItem(data.payload).pipe(
        map(() => new AddItemSuccessAction(data.payload)),
        catchError((error) => of(new AddItemFailureAction(error)))
      )
    )
  );

  @Effect() deleteShoppingItem$ = this.actions$.pipe(
    ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
    mergeMap((data) =>
      this._ss.deleteShoppingItem(data.payload).pipe(
        map(() => new DeleteItemSuccessAction(data.payload)),
        catchError((error) => of(new DeleteItemFailureAction(error)))
      )
    )
  );
}
