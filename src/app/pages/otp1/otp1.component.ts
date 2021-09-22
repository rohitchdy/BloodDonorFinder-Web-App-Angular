import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-otp1',
  templateUrl: './otp1.component.html',
  styleUrls: ['./otp1.component.css']
})
export class Otp1Component implements OnInit {
  otp = {
    otpnum: ''
  };
  message: any;
  message1: any;
  submitted = false;
  currentUser: any;

constructor(private authService: AuthService, private route: Router, private token: TokenStorageService,
            private router: ActivatedRoute, private notificationService: NotificationService) { }

ngOnInit(): void {
  const email = this.router.snapshot.paramMap.get('email');
  this.currentUser = this.token.getUser();
  console.log(email);

}

enterOtp(): void{
console.log(this.otp.otpnum);
this.authService.verifyEmail1(this.router.snapshot.paramMap.get('email'), this.otp.otpnum).subscribe(
  response => {
    // console.log(response);
    this.submitted = true;
    this.message = response;
    this.notificationService.success(' Account Verified Successfully.');
    this.route.navigate(['../login']);
  },
  err => {
    this.notificationService.success('! Otp not match. ');
  }
);

}
}
