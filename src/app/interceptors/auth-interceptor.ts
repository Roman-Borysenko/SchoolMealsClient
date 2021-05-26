import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { env } from "process";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  env = environment;

  constructor(private router: Router) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneHeaders = req.headers;

    if (window.location.pathname != "/login" || req.url.includes("api/user/tokencheck")) {
      let user = localStorage.getItem("_auth");
      if (user !== null && user !== undefined && user !== "") {
        let token = JSON.parse(user).token;
        cloneHeaders = cloneHeaders.append('Authorization', 'Bearer ' + token);
      } else {
        this.router.navigate(['/login']);
      }
    }

    const cloned = req.clone({
      headers: cloneHeaders
    });

    return next.handle(cloned).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        // if (event.status == 401) {
        //   this.router.navigate(['/login']);
        // }
        switch (event.status) {
          case 401: this.router.navigate(['/login']); break;
          case 403: this.router.navigate(['/' + this.env.language]); break;
        }
      }
    }), catchError((error: HttpErrorResponse) => {
      // if (error.status === 401) {
      //   this.router.navigate(['/login']);
      // }
      switch (error.status) {
        case 401: this.router.navigate(['/login']); break;
        case 403: this.router.navigate(['/' + this.env.language]); break;
      }
      return throwError(error)
    }));
  }
}