import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { TodoAction } from "./todo.actions";
import { tap } from "rxjs";

export interface TodoModel {
  id: number;
  categoryId: number;
  title: string;
  body: string;
  state: number;
}

@State<TodoModel[]>({
  name: "TodoState",
  defaults: []
})
@Injectable()
export class TodoState {

  constructor(
    private http: HttpClient
  ) {}

  @Selector()
  static getState(state: TodoModel[]): TodoModel[] {
    return state
  }

  @Action(TodoAction.GetAll)
  getAll(ctx: StateContext<TodoModel[]>) {
    return this.http.get<TodoModel[]>("localhost:9000/todo").pipe(
      tap(data => {
        ctx.setState(data)
      })
    )
  }

}
