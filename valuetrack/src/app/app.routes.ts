import { Routes } from '@angular/router';
import { AuthService } from './features/auth/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { authGuard } from './features/auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/launch/launch.component').then(m => m.LaunchComponent)
    },

    {
        path: 'register',
        loadComponent: () =>
            import('./features/auth/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component')
            .then((m) => m.LoginComponent),
        providers: [provideHttpClient(), AuthService]
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
