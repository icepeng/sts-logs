import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';

import { RunCountComponent } from './components/run-count.component';
import { RunUpgradeComponent } from './components/run-upgrade.component';
import { WinrateCountComponent } from './components/winrate-count.component';
import { WinrateUpgradeComponent } from './components/winrate-upgrade.component';
import { CardListComponent } from './containers/card-list.component';
import { CardOverallComponent } from './containers/card-overall.component';
import { CardComponent } from './containers/card.component';
import { reducers } from './reducers';
import { CardService } from './services/card.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxChartsModule,
        ClarityModule,
        NgxEchartsModule,
    ],
    declarations: [
        CardComponent,
        CardOverallComponent,
        CardListComponent,
        RunCountComponent,
        WinrateCountComponent,
        RunUpgradeComponent,
        WinrateUpgradeComponent,
    ],
})
export class CardModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootCardModule,
            providers: [CardService],
        };
    }
}

@NgModule({
    imports: [
        CardModule,
        RouterModule.forChild([
            {
                path: 'cards',
                component: CardComponent,
                children: [
                    // { path: 'overall', component: CardOverallComponent },
                    { path: 'list', component: CardListComponent },
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                ],
            },
        ]),
        StoreModule.forFeature('card', reducers),
    ],
})
export class RootCardModule {}
