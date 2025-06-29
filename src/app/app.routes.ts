import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'cadastro', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
];
