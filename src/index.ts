import {Observable} from 'rxjs';
require('./index.css') // The page is now styled

// Index.js
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}

// Accept hot module reloading
if (module.hot) {
  module.hot.accept()
}
// Buttons
const startOneSec = document.querySelector('#startOneSec');
const startHalfSec = document.querySelector('#startHalfSec');
const startQuarterSec = document.querySelector('#startQuarterSec');
const stopTimerButton = document.querySelector('#stopTimer');
const resetButton = document.querySelector('#reset');
// Button clicks
const startOne$ = Observable.fromEvent(startOneSec, 'click');
const startHalf$ = Observable.fromEvent(startHalfSec, 'click');
const startQuarter$ = Observable.fromEvent(startQuarterSec, 'click');
const stop$ = Observable.fromEvent(stopTimerButton, 'click');
const reset$ = Observable.fromEvent(resetButton, 'click');
// Observables
//const interval$ = Observable.interval(1000);
//const intervalThatStops$ = interval$
//  .takeUntil(stop$);

const data: Counter = { count: 0 };
const incFunc: CounterFunc = (acc: Counter): Counter =>
  ({ count: acc.count + 1 });
const resetFunc: CounterFunc = (acc: Counter): Counter => data;

const starters$ = Observable.merge(
  startOne$.mapTo(1000),
  startHalf$.mapTo(500),
  startQuarter$.mapTo(250)
);
const intervalActions = (time) => Observable.merge(
  Observable.interval(time)
    .takeUntil(stop$)
    .mapTo(incFunc),
  reset$.mapTo(resetFunc));

const timer$ = starters$
  .switchMap(intervalActions)
  .startWith(data)
  .scan((acc, curr: CounterFunc) => curr(acc));

const input = document.querySelector('#input');
const input$ = Observable.fromEvent<any>(input, 'input')
  .map(event => event.target.value);

Observable.combineLatest(timer$, input$,
  (timer, input) => ({count: timer.count, text: input}))
  .subscribe((x) => console.log(x));

interface Counter {
  count: number;
}
interface CounterFunc {
  (count: Counter) : Counter
}