import { inject } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";

export const authGuard = () => {
  const http = inject(HttpClient)
  const router = inject(Router)

  return http.get("api/verify", { observe: 'response' })
  .subscribe({
    next: (_: HttpResponse<any>) => {
      return router.navigate(["/"])
    },
    error: (httpResponse: HttpResponse<any>) => {
      if(httpResponse.status === 401) return router.navigate(["/login"])
      console.error(`Verify error reason is ${httpResponse.status}: ${httpResponse.statusText}`)
      return router.navigate(["/login"])
    },
    complete: () => {}
  })

}
