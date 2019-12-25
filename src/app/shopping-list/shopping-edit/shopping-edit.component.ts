import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form', {static: false}) form: NgForm;
  private editShoppingItemSubscription: Subscription;
  private editShoppingItemMode: boolean;
  private editShoppingItemIndex: number;
  private editShoppingItem: Ingredient;
  private shoppingListService: ShoppingListService;

  constructor(private _shoppingListService: ShoppingListService) {
    this.shoppingListService = _shoppingListService;
  }

  ngOnInit() {
    this.editShoppingItemSubscription = this.shoppingListService.shoppingItemEditSubject.subscribe(
      (index: number) => {
        this.editShoppingItemMode = true;
        this.editShoppingItemIndex = index;
        this.editShoppingItem = this.shoppingListService.getIngredientByIndex(index);
        this.form.form.patchValue({
          name: this.editShoppingItem.name,
          amount: this.editShoppingItem.amount
        });
      }
    );
  }

  onAddItem() {
    this.onAppendItem();
  }

  onEditItem() {
    this.onAppendItem();
  }

  onClearForm() {
    this.editShoppingItemMode = false;
    this.editShoppingItemIndex = -1;
    this.form.reset();
  }

  onAppendItem() {
    let formValues = this.form.value;
    const ingredient = new Ingredient(formValues.name, Number(formValues.amount));
    if (this.editShoppingItemMode) {
      this._shoppingListService.editIngredients(this.editShoppingItemIndex, ingredient);
    } else {
      this._shoppingListService.addIngredients(ingredient);
    }
    this.onClearForm();
  }

  ngOnDestroy(): void {
    this.editShoppingItemSubscription.unsubscribe();
  }

  deleteItem() {
    if (this.editShoppingItemMode) {
      this.shoppingListService.deleteIngredient(this.editShoppingItemIndex);
    }
    this.onClearForm();
  }
}
