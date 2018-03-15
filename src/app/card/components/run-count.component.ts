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
    styles: [`
    .chart {
      height: 240px;
    }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunCountComponent implements OnInit, OnChanges {
    @Input() card: string;
    @Input() runCard: RunCard[];

    options = {
        tooltip: {},
        dataset: {
            source: [
                {
                    name: '1',
                    value: 5,
                },
                {
                    name: '2',
                    value: 10,
                },
            ],
        },
        series: [
            {
                name: 'pie',
                type: 'pie',
            },
        ],
    };

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        this.options = {
            ...this.options,
            dataset: {
                source: this.getRunsByCount(this.card, this.runCard),
            },
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
