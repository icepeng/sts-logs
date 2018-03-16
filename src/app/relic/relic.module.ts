import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { RelicListComponent } from './containers/relic-list.component';
import { RelicComponent } from './containers/relic.component';
import { RelicService } from './services/relic.service';

@NgModule({
    imports: [CommonModule, RouterModule, ClarityModule],
    declarations: [RelicComponent, RelicListComponent],
})
export class RelicModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootRelicModule,
            providers: [RelicService],
        };
    }
}

@NgModule({
    imports: [
        RelicModule,
        RouterModule.forChild([
            {
                path: 'relics',
                component: RelicComponent,
                children: [
                    { path: 'list', component: RelicListComponent },
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                ],
            },
        ]),
    ],
})
export class RootRelicModule {}
