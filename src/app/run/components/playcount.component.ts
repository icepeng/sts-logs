import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Run } from '../models/run.model';

@Component({
    selector: 'app-playcount',
    templateUrl: './playcount.component.html',
    styles: [],
})
export class PlaycountComponent implements OnInit, OnChanges {
    @Input() runs: Run[] = [];
    stat = [];
    view = [700, 200];
    colorScheme = {
        domain: ['#A10A28', '#5AA454'],
    };

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        const ironcladRuns = this.runs.filter(
            run => run.character_chosen === 'IRONCLAD',
        ).length;
        const silentRuns = this.runs.filter(
            run => run.character_chosen === 'THE_SILENT',
        ).length;
        this.stat = [
            {
                name: 'IRONCLAD',
                value: ironcladRuns,
            },
            {
                name: 'THE_SILENT',
                value: silentRuns,
            },
        ];
    }
}
