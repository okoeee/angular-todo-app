import { Component } from '@angular/core';
import { TodoModel, TodoState } from '../todo.state';
import { Select, Store } from '@ngxs/store';
import { Observable, first } from 'rxjs';
import { TodoAction } from '../todo.actions';
import { FormBuilder, Validators } from '@angular/forms';
import { UserModel, UserState } from 'src/app/user/user.state';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Select(TodoState.getState) todoList$?: Observable<TodoModel[]>;
  @Select(UserState.getState) userState$!: Observable<UserModel>;

  todoForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    categoryId: [0, Validators.required],
    state: [0, Validators.required]
  })

  categoryOptions = [
    {value: 0, name: "フロントエンド"}
  ]

  statusOptions = [
    {value: 0, name: "未着手"},
    {value: 1, name: "進行中"},
    {value: 2, name: "完了"}
  ]

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.store.dispatch(new TodoAction.GetAll())
  }

  onSubmit(): void {
    const todoForm = this.todoForm.value

    // todo categoryIdなどを追加する
    const data = {
      title: todoForm.title!,
      body: todoForm.body!
    }

    this.store.dispatch(new TodoAction.Post(data))
  }

}
