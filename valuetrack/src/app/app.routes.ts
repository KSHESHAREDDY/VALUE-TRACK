import { Routes } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { authGuard } from './gurds/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./componets/launch/launch.component').then(m => m.LaunchComponent),
        providers: [provideHttpClient(), AuthService]
    },
    {
        path: 'marriage',
        loadComponent: () =>
            import('./componets/marriage/marriage.component').then(m => m.MarriageComponent),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'marriage'
    }
];
