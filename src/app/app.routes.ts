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
import { DriversAddComponent } from './pages/drivers-add/drivers-add.component';
import { RiderAddComponent } from './pages/riders-add/riders-add.component';
import { TripMenuComponent } from './pages/trip-menu/trip-menu.component';
import { VehiclesMenuComponent } from './pages/vehicles-menu/vehicles-menu.component';
import { RatingsMenuComponent } from './pages/ratings-menu/ratings-menu.component';
import { QuestsMenuComponent } from './pages/quests-menu/quests-menu.component';
import { AccessControlComponent } from './pages/access-control/access-control.component';
import { AppActionsComponent } from './pages/app-actions/app-actions.component';

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

          { path: 'add-admin', component: AdminAddComponent, 
            canActivate: [authGuard]
          },
          { path: 'users/:uuid/edit', component: AdminEditComponent, title:'Edit Admin',  
            canActivate: [authGuard] },

        { path: 'trips-menu',      component: TripMenuComponent, 
            canActivate: [authGuard]},

         { 
            path: 'add-driver',      component: DriversAddComponent, 
           canActivate: [authGuard]
        },

        {
            path: 'add-rider',      component: RiderAddComponent,
            canActivate: [authGuard]
        },

        { 
          path: 'vehicles-menu', component: VehiclesMenuComponent,  
          canActivate: [authGuard]
        },
        { 
          path: 'ratings-menu', component: RatingsMenuComponent,  
          canActivate: [authGuard]
        },
        { 
          path: 'quest-menu', component: QuestsMenuComponent,  
          canActivate: [authGuard]
        },
        { 
          path: 'access-control', component: AccessControlComponent,  
          canActivate: [authGuard]
        },
        { 
          path: 'app-actions-menu', component: AppActionsComponent,  
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
