import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ModuleTeardownOptions } from '@angular/core/testing';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { panelRoutes } from './panel/panel.routes';

const rutasPanel: Routes = [
    ...panelRoutes
];

export const routes: Routes = [
    ...rutasPanel,
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'ajustes', component: UserEditComponent},
    {path: '**', component: HomeComponent}
];

// Exportar la configuración
export const appRoutingProviders: any[] = [];
//export const routing: ModuleWithProviders = RouterModule.forRoot(routes);