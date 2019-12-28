import {Injectable} from '@angular/core';
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private urlBase: string = 'https://weimianren.firebaseio.com/';
  private urlVersion1: string = this.urlBase + 'recipes.json';

  constructor(private recipeService: RecipeService,
              private http: HttpClient,
              private authService: AuthService) {
  }

  uploadRecipesToFirebase(): Observable<Recipe[]> {
    let recipes: Recipe[] = this.recipeService.recipes;
    let token: string = this.authService.getTocken();
    return this.http.put<Recipe[]>(this.urlVersion1 + "?auth=" + token, recipes);
  }

  getRecipesFromFirebase() : void {
    let token: string = this.authService.getTocken();
    this.http.get<Recipe[]>(this.urlVersion1 + "?auth=" + token).subscribe(
      (recipes: Recipe[]) => {
        for (let recipe of recipes) {
          if (recipe['ingredients'] == null || recipe['ingredients'] == undefined || recipe['ingredients'].length == 0) {
            recipe['ingredients'] = [];
          }
        }

        this.recipeService.recipes = recipes;
      }
    );
  }
}
