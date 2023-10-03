import { Component } from '@angular/core';
import { TodoModel, TodoState } from '../todo.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Select(TodoState.getState) todoList$?: Observable<TodoModel[]>;

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(new TodoAction.GetAll())
  }

}
