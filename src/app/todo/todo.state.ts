import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Action, State, StateContext } from "@ngxs/store";
import { TodoAction } from "./todo.actions";
import { tap } from "rxjs";

export interface TodoModel {
  id?: number;
  categoryId?: number;
  title?: string;
  body?: string;
  state?: number;
}

export interface TodoList {
  todoList: TodoModel[]
}

@State<TodoList>({
  name: "TodoState",
})
@Injectable()
export class TodoState {

  constructor(
    private http: HttpClient
  ) {}

  @Action(TodoAction.GetAll)
  getAll(ctx: StateContext<TodoList>) {
    return this.http.get<TodoList>("localhost:9000/todo").pipe(
      tap(data => {
        ctx.setState(data)
      })
    )
  }

}
