import {Component, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {Recipe} from "../recipes/recipe";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  uploadRecipes() {
    this.dataStorageService.uploadRecipesToFirebase().subscribe(
      (response :Recipe[]) => {
        console.log("Upload success");
        console.log(response);
      }
    );
  }

  downloadRecipes() {
    this.dataStorageService.getRecipesFromFirebase();
  }

  signout() {
    this.authService.logoutUser();
  }
}
