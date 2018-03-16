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
    styles: [],
})
export class EnemyListComponent implements OnInit {
    list$: Observable<
        {
            name: string;
            damage: number;
            kill: number;
        }[]
    >;
    damages$ = this.store.select(fromEnemy.getDamages);
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
                this.damages$,
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
        this.damageTotal$ = this.damages$.pipe(
            map(damages => damages.reduce((sum, x) => sum + x.damage, 0)),
        );
        this.damageAvg$ = this.damageTotal$.pipe(
            combineLatest(this.store.select(fromRun.getTotalRuns)),
            map(([total, count]) => total / count),
        );
    }
}
