import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRun from '../../run/reducers';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-card-overall',
    templateUrl: './card-overall.component.html',
    styles: [],
})
export class CardOverallComponent implements OnInit {
    runs$ = this.store.select(fromRun.getAllRuns);

    constructor(private store: Store<any>) {}

    ngOnInit() {
    }
}
