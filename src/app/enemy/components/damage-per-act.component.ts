import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
} from '@angular/core';
import { Damage } from '../models/enemy.model';

@Component({
    selector: 'app-damage-per-act',
    templateUrl: './damage-per-act.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DamagePerActComponent implements OnInit, OnChanges {
    @Input() damages: Damage[];
    options = {
        tooltip: {},
        series: [
            {
                name: 'Damage',
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
                    name: 'Damage',
                    type: 'pie',
                    data: this.getDamagePerAct(this.damages),
                },
            ],
        };
    }

    getDamagePerAct(damages: Damage[]) {
        const first = damages
            .filter(x => x.floor <= 16)
            .reduce((sum, x) => sum + x.damage, 0);
        const second = damages
            .filter(x => x.floor > 16 && x.floor <= 33)
            .reduce((sum, x) => sum + x.damage, 0);
        const third = damages
            .filter(x => x.floor > 33 && x.floor <= 50)
            .reduce((sum, x) => sum + x.damage, 0);
        return [
            {
                name: 'Act 1',
                value: first,
            },
            {
                name: 'Act 2',
                value: second,
            },
            {
                name: 'Act 3',
                value: third,
            },
        ];
    }
}
