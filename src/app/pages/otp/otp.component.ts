import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

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
    this.currentUser = this.token.getUser();
    const username = this.router.snapshot.paramMap.get('username');
    console.log(username);

  }
  enterOtp(): void{
    console.log(this.otp.otpnum);
    this.authService.verifyEmail(this.router.snapshot.paramMap.get('username'), this.otp.otpnum).subscribe(
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

  reloadPage(): void {
    window.location.reload();
  }

}

