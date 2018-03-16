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
    selector: 'app-winrate-count',
    templateUrl: './winrate-count.component.html',
    styles: [
        `
    .chart {
      height: 240px;
    }`,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinrateCountComponent implements OnInit, OnChanges {
    @Input() card: string;
    @Input() runCard: RunCard[];
    @Input() runEntities: { [id: string]: Run };

    options = {
        tooltip: {},
        xAxis: { type: 'category', data: [] },
        yAxis: {},
        series: [
            {
                name: 'Win%',
                type: 'bar',
                data: [],
            },
        ],
    };

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        const counts = this.getCounts(this.card, this.runCard);
        this.options = {
            ...this.options,
            xAxis: { type: 'category', data: counts },
            series: [
                {
                    name: 'Win%',
                    type: 'bar',
                    data: counts.map(x =>
                        this.getWinrateFromCount(
                            this.card,
                            x,
                            this.runCard,
                            this.runEntities,
                        ),
                    ),
                },
            ],
        };
    }

    getCounts(card: string, runCard: RunCard[]) {
        return runCard
            .filter(x => x.card === card)
            .map(x => x.count)
            .filter((el, i, a) => i === a.indexOf(el))
            .sort();
    }

    getWinrateFromCount(
        card: string,
        count: number,
        runCard: RunCard[],
        runEntities: { [id: string]: Run },
    ) {
        const [win, run] = runCard
            .filter(x => x.card === card && x.count === count)
            .map(x => x.run)
            .reduce(
                ([w, r], x) => [w + (runEntities[x].victory ? 1 : 0), r + 1],
                [0, 0] as [number, number],
            );
        return win / run;
    }
}
