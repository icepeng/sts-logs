import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Run } from '../models/run.model';

@Component({
    selector: 'app-class-compare',
    templateUrl: './class-compare.component.html',
    styles: [],
})
export class ClassCompareComponent implements OnInit, OnChanges {
    @Input() runs: Run[] = [];
    options = {
        tooltip: {},
        legend: {
            data: ['Ironclad', 'The Silent'],
            bottom: 10,
        },
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5],
                },
            },
            indicator: [
                { name: 'Runs', max: 100 },
                { name: 'Win%', max: 100 },
                { name: 'Avg. Playtime', max: 3600 },
                { name: 'Avg. Score', max: 1500 },
                { name: 'Avg. Floor reached', max: 51 },
            ],
        },
        series: [],
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
        const maxRuns = Math.max(ironcladRuns.length, silentRuns.length);
        this.options.radar.indicator[0] = { name: 'Runs', max: maxRuns };
        this.options.series = [
            {
                name: 'Ironclad vs The Silent',
                type: 'radar',
                data: [
                    {
                        value: [
                            ironcladRuns.length,
                            this.getWinrate(ironcladRuns),
                            this.getAvg(ironcladRuns, x => x.playtime),
                            this.getAvg(ironcladRuns, x => x.score),
                            this.getAvg(ironcladRuns, x => x.floor_reached),
                        ],
                        name: 'Ironclad',
                    },
                    {
                        value: [
                            silentRuns.length,
                            this.getWinrate(silentRuns),
                            this.getAvg(silentRuns, x => x.playtime),
                            this.getAvg(silentRuns, x => x.score),
                            this.getAvg(silentRuns, x => x.floor_reached),
                        ],
                        name: 'The Silent',
                    },
                ],
            },
        ];
    }

    getWinrate(runs: Run[]) {
        return runs.filter(x => x.victory).length / runs.length * 100;
    }

    getAvg(runs: Run[], selector: (x: Run) => number) {
        return runs.reduce((sum, x) => sum + selector(x), 0) / runs.length;
    }
}
