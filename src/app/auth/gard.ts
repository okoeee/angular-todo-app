import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { UserAction } from "../user/user.action";
import { catchError, of, tap } from "rxjs";

export const authGuard = () => {
  const http = inject(HttpClient)
  const router = inject(Router)
  const store = inject(Store)

  return store.dispatch(new UserAction.Verify).pipe(
    tap(_ => true),
    catchError(error => {
      router.navigate(["/login"])
      return of(false)
    })
  )

}
