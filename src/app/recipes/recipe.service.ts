import {EventEmitter, Injectable, Output} from '@angular/core';
import {Recipe} from "./recipe";
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private _recipes: Recipe[] = [
    new Recipe(
      'name 1',
      'desc 1',
      'assets/images/viewscope1/view1.jpeg',
      [
        new Ingredient('i1', 1),
        new Ingredient('i2', 2),
      ]
    ),
    new Recipe(
      'name 2',
      'desc 2',
      'assets/images/viewscope1/view2.jpeg',
      [
        new Ingredient('i3', 3),
        new Ingredient('i4', 4),
      ]
    )
  ];

  get recipes(): Recipe[] {
    return this._recipes;
  }

  getRecipeByID(index: number) {
    return this.recipes.slice()[index];
  }

  set recipes(value: Recipe[]) {
    this._recipes = value;
  }

  constructor(private _slService: ShoppingListService) {
  }

  appendToShoppingList(recipe: Recipe) : void {
    this._slService.appendRecipeToList(recipe.ingredients);
  }
}
