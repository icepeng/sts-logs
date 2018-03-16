import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';

import { RunCard } from '../models/run-card.model';

@Component({
    selector: 'app-run-upgrade',
    templateUrl: './run-upgrade.component.html',
    styles: [
        `
    .chart {
      height: 240px;
    }`,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunUpgradeComponent implements OnInit, OnChanges {
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
                source: this.getRunsByUpgrade(this.card, this.runCard),
            },
        };
    }

    getRunsByUpgrade(
        card: string,
        runCard: RunCard[],
    ): { name: string; value: number }[] {
        return Object.entries(
            runCard.filter(x => x.card === card).reduce(
                (obj, x) => {
                    const item = obj[x.maxUpgrade] || 0;
                    return {
                        ...obj,
                        [x.maxUpgrade]: item + 1,
                    };
                },
                {} as { [upgrade: number]: number },
            ),
        ).map(([name, value]) => ({ name, value }));
    }
}
