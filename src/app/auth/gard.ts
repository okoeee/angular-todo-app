import { inject } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const authGuard = () => {
  const http = inject(HttpClient)
  const router = inject(Router)

  return http.get("api/verify", { observe: 'response' }).pipe(
    catchError((error, httpResponse) => {
      console.error("Un authorized")
      router.navigate(['/login'])
      return throwError(error)
    })
  ).subscribe(
    (response: HttpResponse<any>) => {
      if(response.status === 200) return true
      return router.parseUrl('/login')
    }
  )

}
