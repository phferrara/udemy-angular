import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as fromApp from 'app/store/app.reducers';
import * as fromAuth from 'app/auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor  implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!', req);
        // const copiedReq = req.clone({headers: req.headers.set('', '')});
        return this.store.select('auth')
          .take(1)
          .switchMap((authState: fromAuth.State) => {
            const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
            return next.handle(copiedReq);
          })
        // return null;
      }

}