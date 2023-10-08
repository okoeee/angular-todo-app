import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { LoginComponent } from './user/login/login.component';
import { authGuard } from './auth/gard';

const routes: Routes = [
  { path: "", component: TodoListComponent, canActivate: [authGuard] },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
