import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  submitted = false;
  response: any;
  error: any;
  message: any;
  message1: any;
  constructor(private userService: UserService, private route: Router,
              private notificationService: NotificationService,
              private authService: AuthService) { }
  email = {
    email: ''
  };
  ngOnInit(): void {
  }

  search(): void {
    console.log(this.email.email);
    this.userService.getUsername(this.email.email).subscribe(
      response => {
        this.submitted = true;
        this.authService.generateOtp(this.email.email).subscribe(
          // tslint:disable-next-line: no-shadowed-variable
          response => {
            console.log(response);
          }, err => {
            console.log('xyz');
          }
        );
        this.notificationService.success('!Please enter otp');
        this.route.navigate([`otp1/${this.email.email}`]);
      },
      error => {
        console.log(error);
        this.notificationService.warn('! Email not found');
        setTimeout(
          // tslint:disable-next-line: only-arrow-functions
          function(): any{
            location.reload();
          }, 1000
        );
      }
    );
  }

}
