import {
  defaultIfEmpty,
  forkJoin,
  map,
  MonoTypeOperatorFunction,
  Observable,
  share,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

const LOADING_DELAY = 300;
const LOADING_MIN_DURATION = 500;

export function delayedLoading<T>(showLoading: () => void): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => {
    const response$ = source.pipe(share());
    const ready$ = timer(LOADING_DELAY).pipe(
      takeUntil(response$),
      tap(() => showLoading()),
      switchMap(() => timer(LOADING_MIN_DURATION)),
      defaultIfEmpty(0),
    );
    return forkJoin([response$, ready$]).pipe(map(([response]) => response));
  };
}
