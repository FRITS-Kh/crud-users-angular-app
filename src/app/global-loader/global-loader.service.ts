import { Injectable } from '@angular/core';
import { EventType, Router } from '@angular/router';
import {
  defer,
  finalize,
  merge,
  MonoTypeOperatorFunction,
  of,
  scan,
  shareReplay,
  Subject,
  switchMap,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalLoaderService {
  loading$;
  private setLoading$ = new Subject<boolean>();

  constructor(private router: Router) {
    this.loading$ = merge(this.getRouterLoading(), this.setLoading$).pipe(
      shareReplay(1)
    );
  }

  show() {
    this.setLoading$.next(true);
  }

  hide() {
    this.setLoading$.next(false);
  }

  observe<T>(): MonoTypeOperatorFunction<T> {
    return (source$) =>
      defer(() => {
        this.show();

        return of(null);
      }).pipe(
        switchMap(() => source$),
        finalize(() => this.hide())
      );
  }

  private getRouterLoading() {
    return this.router.events.pipe(
      scan((prevState, event) => {
        if (event.type === EventType.NavigationStart) {
          return true;
        }

        if (
          event.type === EventType.NavigationEnd ||
          event.type === EventType.NavigationError ||
          event.type === EventType.NavigationCancel ||
          event.type === EventType.NavigationSkipped
        ) {
          return false;
        }

        return prevState;
      }, false)
    );
  }
}
