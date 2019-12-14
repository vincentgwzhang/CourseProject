import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  onIngredientEmitter = new EventEmitter<Ingredient[]>();

  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredientsList(): Ingredient[] {
    return this._ingredients.slice();
  }

  addIngredients(_ingredient: Ingredient) {
    this._ingredients.push(_ingredient);
    this.onIngredientEmitter.emit(this._ingredients.slice());
  }

  appendRecipeToList(ingredientList: Ingredient[]) : void {
    this._ingredients.push(...ingredientList);
    this.onIngredientEmitter.emit(this._ingredients.slice());
  }

  constructor() { }
}
