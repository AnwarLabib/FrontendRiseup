import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CreateAnnouncementComponent } from './admin-panel/create-announcement/create-announcement.component';
import { AddTagComponent } from './admin-panel/add-tag/add-tag.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnnouncementsComponent } from './home/announcements/announcements.component';
import { AboutComponent } from './home/about/about.component';
import { FoundersComponent } from './home/founders/founders.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { CarouselModule } from 'ngx-bootstrap';
import { DatabaseService } from './database.service';
import { AnnouncementComponent } from './admin-panel/create-announcement/announcement/announcement.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { TagViewComponent } from './admin-panel/add-tag/tag-view/tag-view.component';

//import { NgSelectModule } from '@ng-select/ng-select';
import {SelectModule} from 'ng2-select';
import { AdminAuthGaurd } from './admin-auth-gaurd.service';
import { UserAuthGaurd } from './user-auth-gaurd.service';
import { OfficeHoursComponent } from './office-hours/office-hours.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';
import { RequestDescriptionComponent } from './notification-panel/office-hours-request/request-description/request-description.component';
import { ExpertSuggestComponent } from './notification-panel/office-hours-request/expert-suggest/expert-suggest.component';
import { ExpertSuggestionViewComponent } from './notification-panel/office-hours-request/expert-suggestion-view/expert-suggestion-view.component';
import { UserChooseComponent } from './notification-panel/office-hours-request/user-choose/user-choose.component';
import { UserChoiceViewComponent } from './notification-panel/office-hours-request/user-choice-view/user-choice-view.component';
import { RequestConfirmationComponent } from './notification-panel/office-hours-request/request-confirmation/request-confirmation.component';
import { OfficeHoursRequestComponent } from './notification-panel/office-hours-request/office-hours-request.component';
import { GiveFeedbackComponent } from './notification-panel/office-hours-request/give-feedback/give-feedback.component';
import { ExpertRejectComponent } from './notification-panel/office-hours-request/expert-reject/expert-reject.component';
import { ViewRequestsComponent } from './admin-panel/view-requests/view-requests.component';
import { RegisterLoginAuthGaurd } from './registerlogin-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminPanelComponent,
    CreateAnnouncementComponent,
    AddTagComponent,
    HomeComponent,
    AnnouncementsComponent,
    AboutComponent,
    FoundersComponent,
    AnnouncementComponent,
    TagViewComponent,
    OfficeHoursComponent,
    NotificationPanelComponent,
    RequestDescriptionComponent,
    ExpertSuggestComponent,
    ExpertSuggestionViewComponent,
    UserChooseComponent,
    UserChoiceViewComponent,
    RequestConfirmationComponent,
    OfficeHoursRequestComponent,
    GiveFeedbackComponent,
    ExpertRejectComponent,
    ViewRequestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    RouterModule,
    FormsModule,
    CarouselModule.forRoot(),
    HttpModule,
    FormsModule,
    StorageServiceModule,
    // NgSelectModule
    SelectModule
  ],
  providers: [DatabaseService,AdminAuthGaurd,UserAuthGaurd,RegisterLoginAuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
