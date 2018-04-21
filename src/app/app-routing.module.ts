import { NgModule } from '@angular/core';

import { Routes } from '@angular/router';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CreateAnnouncementComponent } from './admin-panel/create-announcement/create-announcement.component';
import { AddTagComponent } from './admin-panel/add-tag/add-tag.component';
import { HomeComponent } from './home/home.component';
import { DatabaseService } from './database.service';
import { AdminAuthGaurd } from './admin-auth-gaurd.service';
import { UserAuthGaurd } from './user-auth-gaurd.service';
import { OfficeHoursComponent } from './office-hours/office-hours.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';
import { OfficeHoursRequestComponent } from './notification-panel/office-hours-request/office-hours-request.component';
import { ViewRequestsComponent } from './admin-panel/view-requests/view-requests.component';
import { RegisterLoginAuthGaurd } from './registerlogin-auth-guard.service';

const appRoutes: Routes = [
    {path:'home' , component: HomeComponent},
    {path:'login' , component: LoginComponent,canActivate:[RegisterLoginAuthGaurd]},
    {path:'register' , component: RegisterComponent, canActivate:[RegisterLoginAuthGaurd]},
    {path:'profile' , component: ProfileComponent,canActivate:[UserAuthGaurd]},
    {path:'profile/:id' , component: ProfileComponent},
    {path:'officehours' , component: OfficeHoursComponent,canActivate:[UserAuthGaurd]},
    {path:'notifications' , component: NotificationPanelComponent,canActivate:[UserAuthGaurd],children:
    [
        {path:':id',component:OfficeHoursRequestComponent}
    ]},
    {path:'admin' , component: AdminPanelComponent,canActivate : [AdminAuthGaurd],children: 
    [
        {path:'', redirectTo : '/admin/announcement', pathMatch:'full' },
        {path:'announcement', component: CreateAnnouncementComponent},
        {path:'addtag', component: AddTagComponent},
        {path:'viewRequests', component: ViewRequestsComponent},
        {path:'**',redirectTo:'/admin/announcement'}
    ]
    },
    {path:'',redirectTo:'home',pathMatch:'full'}
  ];
  

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}