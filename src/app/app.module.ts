import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { CardModule } from './card/card.module';
import { metaReducers, reducers } from './reducers';
import { RelicModule } from './relic/relic.module';
import { appRoutes } from './routes';
import { RunModule } from './run/run.module';

@NgModule({
    declarations: [AppComponent, AboutComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot(reducers, { metaReducers }),
        RunModule.forRoot(),
        CardModule.forRoot(),
        RelicModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
