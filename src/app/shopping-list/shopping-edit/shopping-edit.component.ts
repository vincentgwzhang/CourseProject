import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef<HTMLInputElement>;

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    const ingredient = new Ingredient(this.nameInputRef.nativeElement.value, Number(this.amountInputRef.nativeElement.value));
    this._shoppingListService.addIngredients(ingredient);
  }
}
