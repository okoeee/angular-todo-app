import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { UserAction } from "./user.action";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map, of } from "rxjs";

@State<any>({
  name: "UserState"
})
@Injectable()
export class UserState {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  @Action(UserAction.Verify)
  verify(ctx: StateContext<any>) {
    return this.http.get("api/verify")
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
