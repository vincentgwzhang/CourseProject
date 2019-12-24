import {Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  onIngredientEmitter = new Subject<Ingredient[]>();

  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredientsList(): Ingredient[] {
    return this._ingredients.slice();
  }

  addIngredients(_ingredient: Ingredient) {
    this._ingredients.push(_ingredient);
    this.onIngredientEmitter.next(this._ingredients.slice());
  }

  appendRecipeToList(ingredientList: Ingredient[]) : void {
    this._ingredients.push(...ingredientList);
    this.onIngredientEmitter.next(this._ingredients.slice());
  }

  constructor() { }
}
