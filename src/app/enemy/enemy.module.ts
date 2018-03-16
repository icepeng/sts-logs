import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';
import { NgxEchartsModule } from 'ngx-echarts';

import { DamagePerActComponent } from './components/damage-per-act.component';
import { EnemyListComponent } from './containers/enemy-list.component';
import { EnemyComponent } from './containers/enemy.component';
import { reducers } from './reducers';
import { EnemyService } from './services/enemy.service';

@NgModule({
    imports: [CommonModule, RouterModule, NgxEchartsModule, ClarityModule],
    declarations: [EnemyComponent, EnemyListComponent, DamagePerActComponent],
})
export class EnemyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootEnemyModule,
            providers: [EnemyService],
        };
    }
}

@NgModule({
    imports: [
        EnemyModule,
        RouterModule.forChild([
            {
                path: 'enemies',
                component: EnemyComponent,
                children: [
                    { path: 'list', component: EnemyListComponent },
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                ],
            },
        ]),
        StoreModule.forFeature('enemy', reducers),
    ],
})
export class RootEnemyModule {}
