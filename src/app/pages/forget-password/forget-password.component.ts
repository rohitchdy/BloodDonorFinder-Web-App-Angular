import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  submitted = false;
  response: any;
  error: any;
  message: any;
  message1: any;
  constructor(private userService: UserService, private route: Router, private notificationService: NotificationService) { }
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
        this.notificationService.success('!Please enter your otp sent to email');
        this.route.navigate([`password-change/${this.email.email}`]);
      },
      error => {
        console.log(error);
        this.notificationService.warn('! Email not found');
        setTimeout(
          // tslint:disable-next-line: only-arrow-functions
          function(): void{
            location.reload();
          }, 1000
        );
      }
    );
  }

}
