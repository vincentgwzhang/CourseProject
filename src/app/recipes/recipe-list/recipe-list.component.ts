import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private _recipeService: RecipeService,
              private _rounter: Router,
              private _route: ActivatedRoute) {

  }

  ngOnInit() {
    this.recipes = this._recipeService.recipes;
  }

  addNewRecipe() {
    this._rounter.navigate(['new'], {relativeTo: this._route});
  }
}
