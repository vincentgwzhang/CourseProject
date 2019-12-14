import { Injectable } from '@angular/core';
import {Recipe} from "./recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private _recipes: Recipe[] = [
    new Recipe('name 1','desc 1','assets/images/viewscope1/view1.jpeg'),
    new Recipe('name 2','desc 2','assets/images/viewscope1/view2.jpeg')
  ];

  get recipes(): Recipe[] {
    return this._recipes;
  }

  set recipes(value: Recipe[]) {
    this._recipes = value;
  }

  constructor() { }
}
