import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as fromApp from 'app/store/app.reducers';
import * as fromAuth from 'app/auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { take, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor  implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!', req);
        // const copiedReq = req.clone({headers: req.headers.set('', '')});
        return this.store.select('auth')
          .pipe(take(1), switchMap((authState: fromAuth.State) => {
              const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
              return next.handle(copiedReq);
          }));
        // return null;
      }

}