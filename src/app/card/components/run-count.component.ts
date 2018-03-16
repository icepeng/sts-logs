import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    OnChanges,
} from '@angular/core';

import { RunCard } from '../models/run-card.model';

@Component({
    selector: 'app-run-count',
    templateUrl: './run-count.component.html',
    styles: [
        `
    .chart {
      height: 240px;
    }`,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunCountComponent implements OnInit, OnChanges {
    @Input() card: string;
    @Input() runCard: RunCard[];

    options = {
        tooltip: {},
        series: [
            {
                name: 'Count',
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
                    name: 'Count',
                    type: 'pie',
                    data: this.getRunsByCount(this.card, this.runCard),
                },
            ],
        };
    }

    getRunsByCount(
        card: string,
        runCard: RunCard[],
    ): { name: string; value: number }[] {
        return Object.entries(
            runCard.filter(x => x.card === card).reduce(
                (obj, x) => {
                    const item = obj[x.count] || 0;
                    return {
                        ...obj,
                        [x.count]: item + 1,
                    };
                },
                {} as { [count: number]: number },
            ),
        ).map(([name, value]) => ({ name, value }));
    }
}
