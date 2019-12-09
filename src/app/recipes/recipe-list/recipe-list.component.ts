import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('name 1','desc 1','assets/images/viewscope1/view1.jpeg'),
    new Recipe('name 2','desc 2','assets/images/viewscope1/view2.jpeg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
