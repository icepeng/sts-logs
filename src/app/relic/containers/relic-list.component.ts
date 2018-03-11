import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRun from '../../run/reducers';
import { RelicService } from '../services/relic.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-relic-list',
    templateUrl: './relic-list.component.html',
    styles: [],
})
export class RelicListComponent implements OnInit {
    runs$ = this.store.select(fromRun.getAllRuns);
    list$: Observable<
        { name: string; runs: number; wins: number; winRate: number }[]
    >;

    constructor(
        private store: Store<any>,
        private relicService: RelicService,
    ) {}

    ngOnInit() {
        this.list$ = this.runs$.pipe(
            map(runs => {
                const relics = this.relicService.getRelics(runs);
                return relics.map(relic => {
                    const runCount = this.relicService.getRuns(relic, runs);
                    const winCount = this.relicService.getWins(relic, runs);
                    return {
                        name: relic,
                        runs: runCount,
                        wins: winCount,
                        winRate: runCount > 0 ? winCount / runCount : 0,
                    };
                });
            }),
        );
    }
}
