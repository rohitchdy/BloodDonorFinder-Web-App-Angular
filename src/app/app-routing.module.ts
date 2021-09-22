import { PendingRequestComponent } from './pages/requests/pending-request/pending-request.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { RequestListComponent } from './pages/requests/request-list/request-list.component';
import { FeedListComponent } from './pages/feeds/feed-list/feed-list.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { MyRequestComponent } from './pages/requests/my-request/my-request.component';
import { MyPendingDonationComponent } from './pages/donations/my-pending-donation/my-pending-donation.component';
import { MyDonationComponent } from './pages/donations/my-donation/my-donation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DonationListComponent } from './pages/donations/donation-list/donation-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { PasswordChangeRequestComponent } from './pages/password-change-request/password-change-request.component';
import { OtpComponent } from './pages/otp/otp.component';
import { Otp1Component } from './pages/otp1/otp1.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'pending-request', component: PendingRequestComponent, canActivate: [AuthGuard]},
  {path: 'requests', component: RequestListComponent, canActivate: [AuthGuard]},
  {path: 'feeds', component: FeedListComponent, canActivate: [AuthGuard]},
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'my-request', component: MyRequestComponent, canActivate: [AuthGuard]},
  {path: 'my-pending-donation', component: MyPendingDonationComponent, canActivate: [AuthGuard]},
  {path: 'my-donation', component: MyDonationComponent, canActivate: [AuthGuard]},
  {path: 'donations', component: DonationListComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'password-change/:email', component: PasswordChangeRequestComponent},
  {path: 'otp/:username', component: OtpComponent},
  {path: 'otp1/:email', component: Otp1Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
