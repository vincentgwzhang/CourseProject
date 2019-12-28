import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @ViewChild('form', {static: false})
  form: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    let values = this.form.value;
    let email = values['email'];
    let password = values['password'];

    this.authService.signinUser('vincentzhang@outlook.es', '1q2w3e4R');
    //this.authService.signinUser(email, password);
  }
}
