import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserAction } from '../user.action';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  })

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    const loginForm = this.loginForm.value
    const data = {
      email: loginForm.email!,
      password: loginForm.password!
    }
    this.store.dispatch(new UserAction.Login(data))
  }

}
