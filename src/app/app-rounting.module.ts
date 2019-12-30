import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "./auth/auth-guard.service";
import {RecipesComponent} from "./recipes/recipes.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {SignupComponent} from "./auth/signup/signup.component";

const rounts: Routes = [
  {path: '', redirectTo: '/recipe', pathMatch: 'full'},
  {path: 'recipe', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService]},
      {path: ':id', component: RecipeDetailComponent, canActivate: [AuthGuardService]},
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService]}
    ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignupComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(rounts)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRountingModule { }
