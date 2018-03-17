import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    OnChanges,
} from '@angular/core';

import { Run, PathTaken } from '../models/run.model';

@Component({
    selector: 'app-path-ratio',
    templateUrl: './path-ratio.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathRatioComponent implements OnInit, OnChanges {
    @Input() runs: Run[];
    options = {
        tooltip: {},
        legend: {
            selected: {
                Boss: false,
                Treasure: false,
            },
        },
        series: [
            {
                name: 'Path',
                type: 'pie',
                data: [],
            },
        ],
    };

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        this.options = {
            ...this.options,
            series: [
                {
                    name: 'Path',
                    type: 'pie',
                    data: this.getPathCount(this.runs),
                },
            ],
        };
    }

    getPathCount(runs: Run[]) {
        const paths = runs.reduce(
            (arr, x) => [...arr, ...x.path_taken],
            [] as PathTaken[],
        );
        return [
            { name: 'Monster', value: paths.filter(x => x === 'M').length },
            { name: 'Campfire', value: paths.filter(x => x === 'R').length },
            { name: 'Treasure', value: paths.filter(x => x === 'T').length },
            { name: 'Elite', value: paths.filter(x => x === 'E').length },
            { name: 'Unknown', value: paths.filter(x => x === '?').length },
            { name: 'Shop', value: paths.filter(x => x === '$').length },
            { name: 'Boss', value: paths.filter(x => x === 'BOSS').length },
        ];
    }
}
