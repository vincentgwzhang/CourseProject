import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private _shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this._shoppingListService.getIngredientsList();
    this.subscription = this._shoppingListService.onIngredientEmitter.subscribe(
      (_ingredients: Ingredient[]) => {
        this.ingredients = _ingredients;
      }
    );
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
