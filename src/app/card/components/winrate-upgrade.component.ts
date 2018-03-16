import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';

import { Run } from '../../run/models/run.model';
import { RunCard } from '../models/run-card.model';

@Component({
    selector: 'app-winrate-upgrade',
    templateUrl: './winrate-upgrade.component.html',
    styles: [
        `
  .chart {
    height: 240px;
  }`,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinrateUpgradeComponent implements OnInit, OnChanges {
    @Input() card: string;
    @Input() runCard: RunCard[];
    @Input() runEntities: { [id: string]: Run };

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
                name: 'bar',
                type: 'bar',
            },
        ],
    };

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        this.options = {
            ...this.options,
            dataset: {
                source: this.getWinrateByUpgrade(
                    this.card,
                    this.runCard,
                    this.runEntities,
                ),
            },
        };
    }

    getWinrateByUpgrade(
        card: string,
        runCard: RunCard[],
        runEntities: { [id: string]: Run },
    ): { name: string; value: number }[] {
        return Object.entries(
            runCard.filter(x => x.card === card).reduce(
                (obj, x) => {
                    const item = obj[x.maxUpgrade] || { run: 0, win: 0 };
                    return {
                        ...obj,
                        [x.maxUpgrade]: {
                            run: item.run + 1,
                            win: runEntities[x.run].victory
                                ? item.win + 1
                                : item.win,
                        },
                    };
                },
                {} as { [upgrade: number]: { run: number; win: number } },
            ),
        ).map(([name, x]) => ({ name, value: x.win / x.run }));
    }
}
