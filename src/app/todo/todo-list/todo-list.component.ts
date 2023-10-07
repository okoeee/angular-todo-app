import { Component } from '@angular/core';
import { TodoModel, TodoState } from '../todo.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoAction } from '../todo.actions';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Select(TodoState.getState) todoList$?: Observable<TodoModel[]>;

  todoForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required]
  })

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.store.dispatch(new TodoAction.GetAll())
  }

  onSubmit(): void {
    const todoForm = this.todoForm.value
    
    const data = {
      title: todoForm.title!,
      body: todoForm.body!
    }

    this.store.dispatch(new TodoAction.Post(data))
  }

}
