import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DataStorageService} from "../../shared/data-storage.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipeSubscription: Subscription;

  constructor(private _recipeService: RecipeService,
              private _router: Router,
              private _route: ActivatedRoute,
              private dataStorageService: DataStorageService,
              private authService: AuthService) {
    this.recipeSubscription = this._recipeService.recipeSubject.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  ngOnInit() {
    if (this.authService.isAuthenticated() && this.recipes.length == 0) {
      this.dataStorageService.getRecipesFromFirebase();
    }
  }

  addNewRecipe() {
    this._router.navigate(['/recipe', 'new'], {relativeTo: this._route});
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
