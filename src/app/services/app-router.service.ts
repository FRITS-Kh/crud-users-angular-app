import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppRouterService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  reload(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { forceResolver: new Date().getTime() },
      queryParamsHandling: 'merge',
    });
  }
}
