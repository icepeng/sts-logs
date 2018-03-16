import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';

import { Run } from '../models/run.model';

@Component({
    selector: 'app-campfire-usage',
    templateUrl: './campfire-usage.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampfireUsageComponent implements OnInit, OnChanges {
    @Input() runs: Run[];
    options = {
        tooltip: {},
        series: [
            {
                name: 'Campfire Usage',
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
                    name: 'Campfire Usage',
                    type: 'pie',
                    data: this.getCampfireUsage(this.runs),
                },
            ],
        };
    }

    getCampfireUsage(runs: Run[]) {
        return [
            {
                name: 'Rest',
                value: runs.reduce((sum, x) => sum + x.campfire_rested, 0),
            },
            {
                name: 'Upgrade',
                value: runs.reduce((sum, x) => sum + x.campfire_upgraded, 0),
            },
        ];
    }
}
