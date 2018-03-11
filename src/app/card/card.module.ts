import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CardListComponent } from './containers/card-list.component';
import { CardOverallComponent } from './containers/card-overall.component';
import { CardComponent } from './containers/card.component';
import { CardService } from './services/card.service';

@NgModule({
    imports: [CommonModule, RouterModule, NgxChartsModule, ClarityModule],
    declarations: [CardComponent, CardOverallComponent, CardListComponent],
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
    ],
})
export class RootCardModule {}
