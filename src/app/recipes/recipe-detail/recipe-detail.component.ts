import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private _rsService: RecipeService,
              private _route: ActivatedRoute) { }

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
}
