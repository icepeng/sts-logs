import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Run } from '../models/run.model';

@Component({
    selector: 'app-class-winrate',
    templateUrl: './class-winrate.component.html',
    styles: [],
})
export class ClassWinrateComponent implements OnInit, OnChanges {
    @Input() runs: Run[];
    stat = [];
    colorScheme = {
        domain: ['#A10A28', '#5AA454'],
    };

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        const ironcladRuns = this.runs.filter(
            run => run.character_chosen === 'IRONCLAD',
        );
        const silentRuns = this.runs.filter(
            run => run.character_chosen === 'THE_SILENT',
        );
        const ironcladVictory = ironcladRuns.filter(run => run.victory);
        const silentVictory = silentRuns.filter(run => run.victory);
        this.stat = [
            {
                name: 'IRONCLAD',
                value:
                    ironcladVictory.length / (ironcladRuns.length || 1) * 100,
            },
            {
                name: 'THE SILENT',
                value: silentVictory.length / (silentRuns.length || 1) * 100,
            },
        ];
    }
}
