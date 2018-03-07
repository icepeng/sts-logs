import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';

export const appRoutes: Routes = [
    {
        path: 'about',
        component: AboutComponent,
    },
    { path: '', redirectTo: 'about', pathMatch: 'full' },
    { path: '**', redirectTo: 'about' },
];
