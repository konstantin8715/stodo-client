import { Injectable } from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService,
              private notificationService: NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        this.tokenStorageService.logOut();
        // window.location.reload();
      }

      const error = err.error.message || err.statusText;
      this.notificationService.showSnackBar(error);
      return throwError(error);
    }))
  }
}
