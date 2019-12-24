import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('form', {static: false}) form: NgForm;

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    let formValues = this.form.value;
    const ingredient = new Ingredient(formValues.name, Number(formValues.amount));
    this._shoppingListService.addIngredients(ingredient);
  }
}
