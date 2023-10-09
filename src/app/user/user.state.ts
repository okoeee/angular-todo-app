import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UserAction } from "./user.action";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map, of, tap } from "rxjs";

export interface UserModel {
  csrfToken: string
}

@State<any>({
  name: "UserState"
})
@Injectable()
export class UserState {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  @Selector()
  static getState(state: UserState): UserState {
    return state
  }

  @Action(UserAction.Verify)
  verify(ctx: StateContext<UserModel>) {
    return this.http.get<UserModel>("api/verify").pipe(
      tap(data => {
        console.log(data)
        ctx.setState(data)
      })
    )
  }

  @Action(UserAction.Login)
  login(ctx: StateContext<any>, action: UserAction.Login) {
    return this.http.post("/api/login", action.payload).pipe(
      map(_ => this.router.navigate(["/"])),
      catchError(error => {
        console.log(error)
        this.router.navigate(["/login"])
        return of()
      })
    )
  }

}
