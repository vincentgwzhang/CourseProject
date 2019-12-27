import {EventEmitter, Injectable, Output} from '@angular/core';
import {Recipe} from "./recipe";
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public recipeSubject: Subject<Recipe[]> = new Subject<Recipe[]>();

  private _recipes: Recipe[] = [];

  get recipes(): Recipe[] {
    return this._recipes;
  }

  getRecipeByID(index: number) {
    return this.recipes.slice()[index];
  }

  updateRecipeByID(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeSubject.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeSubject.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeSubject.next(this.recipes.slice());
  }

  set recipes(value: Recipe[]) {
    this._recipes = value;
    this.recipeSubject.next(this.recipes);
  }

  constructor(private _slService: ShoppingListService) {
    this.recipeSubject.next(this.recipes);
  }

  appendToShoppingList(recipe: Recipe) : void {
    this._slService.appendRecipeToList(recipe.ingredients);
  }
}
