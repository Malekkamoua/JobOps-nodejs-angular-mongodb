import { Routes } from '@angular/router';
import { RegisterUserComponent } from 'src/app/pages/register-user/register-user.component';

import { LoginComponent } from '../../pages/login/login.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterUserComponent }
];
