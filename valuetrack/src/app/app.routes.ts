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
        path: 'dashboard',
        loadComponent: () =>
            import('./componets/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
