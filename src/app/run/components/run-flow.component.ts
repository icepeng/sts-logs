import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
} from '@angular/core';
import { Run } from '../models/run.model';

@Component({
    selector: 'app-run-flow',
    templateUrl: './run-flow.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunFlowComponent implements OnInit, OnChanges {
    @Input() run: Run;
    options = {
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {},
            },
        },
        tooltip: {},
        legend: {
            data: ['HP', 'Max HP', 'Gold'],
            // x: 'left',
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
            },
            {
                type: 'inside',
                realtime: true,
            },
        ],
        xAxis: [
            {
                type: 'category',
                data: [],
            },
        ],
        yAxis: [
            {
                name: 'HP',
                type: 'value',
            },
            {
                name: 'Gold',
                type: 'value',
            },
        ],
        series: [
            {
                name: 'HP',
                type: 'line',
                data: [],
            },
            {
                name: 'Max HP',
                type: 'line',
                data: [],
            },
            {
                name: 'Gold',
                type: 'line',
                yAxisIndex: 1,
                data: [],
            },
        ],
    };

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        this.options = {
            ...this.options,
            xAxis: [
                {
                    type: 'category',
                    data: this.run.path_per_floor.map(
                        (value, index) => (index + 1).toString() + '-' + value,
                    ),
                },
            ],
            series: [
                {
                    name: 'HP',
                    type: 'line',
                    data: this.run.current_hp_per_floor,
                },
                {
                    name: 'Max HP',
                    type: 'line',
                    data: this.run.max_hp_per_floor,
                },
                {
                    name: 'Gold',
                    type: 'line',
                    yAxisIndex: 1,
                    data: this.run.gold_per_floor,
                },
            ],
        };
    }
}
