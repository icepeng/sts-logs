import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRun from '../reducers';

@Component({
    selector: 'app-run-list',
    templateUrl: './run-list.component.html',
})
export class RunListComponent implements OnInit {
    runs$ = this.store.select(fromRun.getAllRuns);

    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
