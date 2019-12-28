import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('form', {static: false})
  form: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    let values = this.form.value;
    let email = values['email'];
    let password = values['password'];

    this.authService.signupUser(email, password);
    this.onReset();
  }

  onReset() {
    this.form.reset();
  }
}
