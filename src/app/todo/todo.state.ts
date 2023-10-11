import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { TodoAction } from "./todo.actions";
import { tap } from "rxjs";
import { UserState } from "../user/user.state";

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
    private http: HttpClient,
    private store: Store
  ) {}

  @Selector()
  static getState(state: TodoModel[]): TodoModel[] {
    return state
  }

  @Action(TodoAction.GetAll)
  getAll(ctx: StateContext<TodoModel[]>) {
    return this.http.get<TodoModel[]>("/api/todo").pipe(
      tap(data => {
        ctx.setState(data)
      })
    )
  }

  @Action(TodoAction.Post)
  post(ctx: StateContext<TodoModel>, action: TodoAction.Post) {
    const token = this.store.selectSnapshot(UserState.getState).csrfToken
    const headers = new HttpHeaders({
      "Csrf-Token": token
    })
    return this.http.post("/api/todo", action.payload, {headers: headers})
  }

}
