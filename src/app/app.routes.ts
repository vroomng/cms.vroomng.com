import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { AdminComponent } from './layout/admin/admin.component';
import { Component } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { authGuard } from './guard/auth/auth.guard';
import { AdminAddComponent } from './pages/admin-add/admin-add.component';
import { AdminEditComponent } from './pages/admin-edit/admin-edit.component';
import { LoginGuard } from './guard/login/login.guard';
import { DriversEditComponent } from './pages/drivers-edit/drivers-edit.component';
import { DriversAddComponent } from './pages/drivers-add/drivers-add.component';
import { RidersAddComponent } from './pages/riders-add/riders-add.component';
import { RidersEditComponent } from './pages/riders-edit/riders-edit.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    },
    {
        path: 'sign-in',
        component: AuthComponent,
        canActivate: [LoginGuard],
    },
    {
        path: '',
        component: AdminComponent,
        children: [
           { path: 'dashboard',
            component: DashboardComponent,
            canActivate: [authGuard],
        },
         {
             path: 'users',
             component: UsersComponent,
             canActivate: [authGuard],
          },
          {
            path: 'vehicles',
            component: VehiclesComponent,
            canActivate: [authGuard],
          },

          { path: 'add-admin',      component: AdminAddComponent, 
            canActivate: [authGuard]
        },
          { path: 'users/:uuid/edit', component: AdminEditComponent, title:'Edit Admin',  
            canActivate: [authGuard]
        },
          { path: 'driver/:uuid/edit', component: DriversEditComponent, title:'Edit Driver', 
             canActivate: [authGuard]
            },

            { path: 'add-driver',      component: DriversAddComponent, 
                canActivate: [authGuard]
            },

            {
                path: 'add-rider',      component: RidersAddComponent,
                    canActivate: [authGuard]
            
            },
            { path: 'rider/:uuid/edit', component: RidersEditComponent, title:'Edit Rider',  
                canActivate: [authGuard]
            },





        ]
    },
    {
        path: '',
        component: AuthComponent,
        children: [
           { path: 'login',
            component: LoginComponent,
            // canActivate: [LoginGuard],
        },
         {
             path: 'forgot-password',
             component: ForgotPasswordComponent
          },

        ]
    }
];
