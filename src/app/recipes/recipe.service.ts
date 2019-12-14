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

  @Output()
  recipeSelected = new EventEmitter<Recipe>();

  get recipes(): Recipe[] {
    return this._recipes;
  }

  set recipes(value: Recipe[]) {
    this._recipes = value;
  }

  triggerEvent(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

  constructor(private _slService: ShoppingListService) {
  }

  appendToShoppingList(recipe: Recipe) : void {
    this._slService.appendRecipeToList(recipe.ingredients);
  }
}
