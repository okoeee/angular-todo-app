import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { UserAction } from "./user.action";
import { HttpClient } from "@angular/common/http";

@State<any>({
  name: "UserState"
})
@Injectable()
export class UserState {

  constructor(
    private http: HttpClient
  ) {}

  @Action(UserAction.Verify)
  verify(ctx: StateContext<any>) {
    return this.http.get("api/verify")
  }

}
