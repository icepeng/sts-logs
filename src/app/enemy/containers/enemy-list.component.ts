import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, map } from 'rxjs/operators';

import * as fromRun from '../../run/reducers';
import * as fromEnemy from '../reducers';
import { EnemyService } from '../services/enemy.service';

@Component({
    selector: 'app-enemy-list',
    templateUrl: './enemy-list.component.html',
    styles: [
        `
    .card-chart {
        width: 100%;
        height: 320px;
    }`,
    ],
})
export class EnemyListComponent implements OnInit {
    list$: Observable<
        {
            name: string;
            damage: number;
            kill: number;
        }[]
    >;
    damageTotal$: Observable<number>;
    damageAvg$: Observable<number>;
    damagePerStage$: Observable<{ name: string; value: number }[]>;

    constructor(
        private store: Store<any>,
        private enemyService: EnemyService,
    ) {}

    ngOnInit() {
        this.list$ = this.store.select(fromRun.getAllRuns).pipe(
            combineLatest(
                this.store.select(fromEnemy.getEnemyEntities),
                this.store.select(fromEnemy.getDamages),
                this.store.select(fromEnemy.getKills),
            ),
            map(([runs, enemyEntities, damages, kills]) => {
                const enemies = Object.keys(enemyEntities);
                return enemies.map(enemy => {
                    const damage = damages
                        .filter(x => x.enemies === enemy)
                        .reduce((sum, x) => sum + x.damage, 0);
                    const kill = kills.filter(x => x.enemy === enemy).length;
                    return {
                        name: enemy,
                        damage,
                        kill,
                    };
                });
            }),
        );
        this.damageTotal$ = this.store
            .select(fromEnemy.getDamages)
            .pipe(
                map(damages => damages.reduce((sum, x) => sum + x.damage, 0)),
            );
        this.damageAvg$ = this.damageTotal$.pipe(
            combineLatest(this.store.select(fromRun.getTotalRuns)),
            map(([total, count]) => total / count),
        );
        this.damagePerStage$ = this.store.select(fromEnemy.getDamages).pipe(
            map(damages => {
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
                        name: 'Stage 1',
                        value: first,
                    },
                    {
                        name: 'Stage 2',
                        value: second,
                    },
                    {
                        name: 'Stage 3',
                        value: third,
                    },
                ];
            }),
        );
    }
}
