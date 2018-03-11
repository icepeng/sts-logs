import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRun from '../reducers';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-run-stat',
    templateUrl: './run-stat.component.html',
})
export class RunStatComponent implements OnInit {
    runs$ = this.store.select(fromRun.getAllRuns);

    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
