import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private _rsService: RecipeService) { }

  ngOnInit() {
  }

  appendToShoppingList($event: MouseEvent) {
    this._rsService.appendToShoppingList(this.recipe);
  }
}
