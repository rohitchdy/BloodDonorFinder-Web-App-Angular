import { AngularMaterialModule } from './angular-material/angular-material.module';
import { NavigationComponent } from './parts/navigation/navigation.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserComponent } from './pages/users/user/user.component';
import { ViewRequestComponent } from './pages/requests/view-request/view-request.component';
import { RequestListComponent } from './pages/requests/request-list/request-list.component';
import { RequestComponent } from './pages/requests/request/request.component';
import { PendingRequestComponent } from './pages/requests/pending-request/pending-request.component';
import { MyRequestComponent } from './pages/requests/my-request/my-request.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PasswordChangeRequestComponent } from './pages/password-change-request/password-change-request.component';
import { Otp1Component } from './pages/otp1/otp1.component';
import { OtpComponent } from './pages/otp/otp.component';
import { MatConfirmDialogComponent } from './pages/mat-confirm-dialog/mat-confirm-dialog.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ViewFeedComponent } from './pages/feeds/view-feed/view-feed.component';
import { FeedListComponent } from './pages/feeds/feed-list/feed-list.component';
import { FeedComponent } from './pages/feeds/feed/feed.component';
import { ViewDonationComponent } from './pages/donations/view-donation/view-donation.component';
import { MyPendingDonationComponent } from './pages/donations/my-pending-donation/my-pending-donation.component';
import { MyDonationComponent } from './pages/donations/my-donation/my-donation.component';
import { DonationListComponent } from './pages/donations/donation-list/donation-list.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    DonationListComponent,
    MyDonationComponent,
    MyPendingDonationComponent,
    ViewDonationComponent,
    FeedComponent,
    FeedListComponent,
    ViewFeedComponent,
    ForgetPasswordComponent,
    HomeComponent,
    LoginComponent,
    MatConfirmDialogComponent,
    OtpComponent,
    Otp1Component,
    PasswordChangeRequestComponent,
    ProfileComponent,
    RegisterComponent,
    MyRequestComponent,
    PendingRequestComponent,
    RequestComponent,
    RequestListComponent,
    ViewRequestComponent,
    UserComponent,
    UserListComponent,
    VerifyEmailComponent,
    NavigationComponent,
    PasswordChangeRequestComponent,
    ForgetPasswordComponent,
    OtpComponent,
    Otp1Component

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
