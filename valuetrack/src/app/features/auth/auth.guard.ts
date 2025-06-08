import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs";

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(state => state.auth.user).pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};