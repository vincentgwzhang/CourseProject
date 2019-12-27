import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe";
import {Ingredient} from "../../shared/ingredient";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private recipeService: RecipeService) {
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  public initForm(): void {
    let initRecipeName = '';
    let initRecipeDescription = '';
    let initRecipeImagePath = '';
    let ingredients: FormArray = new FormArray([]);

    if (this.editMode) {
      let selectedRecipe: Recipe = this.recipeService.getRecipeByID(this.id);
      initRecipeName = selectedRecipe.name;
      initRecipeDescription = selectedRecipe.description;
      initRecipeImagePath = selectedRecipe.imagePath;
      if (selectedRecipe.ingredients.length > 0) {
        for (let ingredient of selectedRecipe.ingredients) {
          ingredients.push(new FormGroup({
            'iName': new FormControl(ingredient.name, Validators.required),
            'iAmount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*/)])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(initRecipeName, Validators.required),
      'imagePath': new FormControl(initRecipeImagePath, Validators.required),
      'description': new FormControl(initRecipeDescription, Validators.required),
      'ingredients': ingredients
    });
  }

  onSave() {
    let formValue = this.recipeForm.value;
    let recipeName: string = formValue['name'];
    let imagePath: string  = formValue['imagePath'];
    let description: string  = formValue['description'];

    let formArray: FormArray = <FormArray>this.recipeForm.controls['ingredients'];
    let ins: Ingredient[] = [];
    for(let formGroup of formArray.controls) {
      ins.push(new Ingredient(formGroup.value['iName'], formGroup.value['iAmount']));
    }

    let recipe: Recipe = new Recipe(recipeName, description, imagePath, ins);

    if (this.editMode) {
      this.recipeService.updateRecipeByID(this.id, recipe);
      this._router.navigate(['/recipe', this.id], {relativeTo: this._activatedRoute});
    } else {
      this.recipeService.addRecipe(recipe);
      this._router.navigate(['/recipe'], {relativeTo: this._activatedRoute});
    }
  }

  addNewIngredient() {
    let formArray: FormArray = <FormArray>this.recipeForm.controls['ingredients'];
    formArray.controls.push(new FormGroup({
      'iName': new FormControl(null, Validators.required),
      'iAmount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*/)])
    }));
  }

  exitEdit() {
    this._router.navigate(['/recipe', this.id], {relativeTo: this._activatedRoute});
  }

  deleteIngredient(index: number) {
    let formArray: FormArray = <FormArray>this.recipeForm.controls['ingredients'];
    formArray.controls.splice(index, 1);
  }
}
