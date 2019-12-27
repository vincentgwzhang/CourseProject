import {Injectable} from '@angular/core';
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private urlBase: string = 'https://weimianren.firebaseio.com/';
  private urlVersion1: string = this.urlBase + 'recipes.json';

  constructor(private recipeService: RecipeService,
              private http: HttpClient) {
  }

  uploadRecipesToFirebase(): Observable<Recipe[]> {
    let recipes: Recipe[] = this.recipeService.recipes;
    return this.http.put<Recipe[]>(this.urlVersion1, recipes);
  }

  getRecipesFromFirebase() : void {
    this.http.get<Recipe[]>(this.urlVersion1).subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.recipes = recipes;
      }
    );
  }
}
