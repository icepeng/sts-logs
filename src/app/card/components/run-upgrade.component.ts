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
                    data: this.getRunsByUpgrade(this.card, this.runCard),
                },
            ],
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
