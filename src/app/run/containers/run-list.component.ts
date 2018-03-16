import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map, withLatestFrom } from 'rxjs/operators';

import { Run } from '../models/run.model';
import * as fromRun from '../reducers';

@Component({
    selector: 'app-run-list',
    templateUrl: './run-list.component.html',
})
export class RunListComponent implements OnInit {
    runs$ = this.store.select(fromRun.getAllRuns);
    selected$ = new BehaviorSubject<string | null>(null);
    selectedRun$: Observable<Run>;

    constructor(private store: Store<any>) {}

    ngOnInit() {
        this.selected$.subscribe(x => console.log(x))
        this.selectedRun$ = this.selected$.pipe(
            withLatestFrom(this.store.select(fromRun.getRunEntities)),
            map(([selected, entities]) => entities[selected]),
        );
    }
}
