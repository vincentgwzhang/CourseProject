import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private _rsService: RecipeService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this._rsService.getRecipeByID(this.id);
      }
    );
  }

  appendToShoppingList($event: MouseEvent) {
    this._rsService.appendToShoppingList(this.recipe);
  }

  editThisRecipe() {
    //this._router.navigate(['edit'], {relativeTo: this._route});
    this._router.navigate(['../', this.id, 'edit'], {relativeTo: this._route});
  }
}
