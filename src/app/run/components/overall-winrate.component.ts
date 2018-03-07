import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Run } from '../models/run.model';

@Component({
    selector: 'app-overall-winrate',
    templateUrl: './overall-winrate.component.html',
    styles: [],
})
export class OverallWinrateComponent implements OnInit, OnChanges {
    @Input() runs: Run[];
    stat = [];
    colorScheme = {
        domain: ['#A10A28', '#5AA454'],
    };

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        const victory = this.runs.filter(run => run.victory).length;
        const loss = this.runs.length - victory;
        this.stat = [
            {
                name: 'VICTORY',
                value: victory,
            },
            {
                name: 'LOSS',
                value: loss,
            },
        ];
    }
}
