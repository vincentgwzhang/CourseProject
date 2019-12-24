import {Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  onIngredientEmitter = new Subject<Ingredient[]>();
  shoppingItemEditSubject = new Subject<number>();

  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredientsList(): Ingredient[] {
    return this._ingredients.slice();
  }

  getIngredientByIndex(index: number) : Ingredient {
    return this._ingredients[index];
  }

  addIngredients(_ingredient: Ingredient) {
    this._ingredients.push(_ingredient);
    this.onIngredientEmitter.next(this._ingredients.slice());
  }

  deleteIngredient(index: number) {
    this._ingredients.splice(index, 1);
    this.onIngredientEmitter.next(this._ingredients.slice());
  }

  editIngredients(index: number, _ingredient: Ingredient) {
    this._ingredients[index] = _ingredient;
    this.onIngredientEmitter.next(this._ingredients.slice());
  }

  appendRecipeToList(ingredientList: Ingredient[]) : void {
    this._ingredients.push(...ingredientList);
    this.onIngredientEmitter.next(this._ingredients.slice());
  }

  registerAsShoppingItemEdit(index: number) : void {
    this.shoppingItemEditSubject.next(index);
  }

  constructor() { }
}
