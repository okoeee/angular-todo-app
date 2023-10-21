import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { UserAction } from "./user.action";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map, of, tap } from "rxjs";

export interface UserModel {
  isLoggedIn: boolean,
  csrfToken: string
}

@State<any>({
  name: "UserState"
})
@Injectable()
export class UserState {

  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store
  ) {}

  @Selector()
  static getState(state: UserModel): UserModel {
    return state
  }

  @Selector()
  static isLoggedIn(state: UserModel): boolean {
    return state.isLoggedIn
  }

  @Action(UserAction.Verify)
  verify(ctx: StateContext<UserModel>) {
    return this.http.get<UserModel>("/api/verify").pipe(
      tap(data => {
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

  @Action(UserAction.Logout)
  logout(ctx: StateContext<UserModel>) {
    const token = this.store.selectSnapshot(UserState.getState).csrfToken
    const headers = new HttpHeaders({
      "Csrf-Token": token
    })
    return this.http.post("/api/logout", null, {headers: headers}).pipe(
      tap(_ => {
        ctx.setState({
          isLoggedIn: false,
          csrfToken: ""
        })
      }),
      tap(_ => 
        this.router.navigate(["/login"])
      ),
      catchError(error => {
        console.log(error)
        return of()
      })
    )
  }

}
