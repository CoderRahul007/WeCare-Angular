import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { UserAppointmentsComponent } from './user-appointments/user-appointments.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { RescheduleAppointmentsComponent } from './reschedule-appointments/reschedule-appointments.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { CoachHomeComponent } from './coach-home/coach-home.component';
import { CoachSignupComponent } from './coach-signup/coach-signup.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { CoachLoginComponent } from './coach-login/coach-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';   
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,  
    UserLoginComponent,
    CoachLoginComponent,
    UserSignupComponent,
    CoachSignupComponent,
    CoachHomeComponent,
    BookAppointmentComponent,
    RescheduleAppointmentsComponent,
    CoachProfileComponent,
    UserHomeComponent,
    UserAppointmentsComponent,
    HomeComponent,
    UserProfileComponent,
    UserAppointmentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
