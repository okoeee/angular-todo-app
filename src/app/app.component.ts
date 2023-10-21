import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserAction } from './user/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private store: Store
  ) {}

  logout() {
    this.store.dispatch(new UserAction.Logout)
  }

}
