import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { RunListComponent } from './containers/run-list.component';
import { RunStatComponent } from './containers/run-stat.component';
import { RunComponent } from './containers/run.component';
import { UploadComponent } from './containers/upload.component';
import { reducers } from './reducers';
import { RunService } from './services/run.service';
import { ClassWinrateComponent } from './components/class-winrate.component';
import { OverallWinrateComponent } from './components/overall-winrate.component';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, NgxChartsModule],
    declarations: [
        RunComponent,
        UploadComponent,
        RunStatComponent,
        RunListComponent,
        ClassWinrateComponent,
        OverallWinrateComponent,
    ],
})
export class RunModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootRunModule,
            providers: [RunService],
        };
    }
}

@NgModule({
    imports: [
        RunModule,
        RouterModule.forChild([
            {
                path: 'runs',
                component: RunComponent,
                children: [
                    { path: 'upload', component: UploadComponent },
                    { path: 'stat', component: RunStatComponent },
                    { path: 'list', component: RunListComponent },
                    { path: '', redirectTo: 'upload', pathMatch: 'full' },
                ],
            },
        ]),
        StoreModule.forFeature('run', reducers),
    ],
})
export class RootRunModule {}
