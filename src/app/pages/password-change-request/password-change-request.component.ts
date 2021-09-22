import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-password-change-request',
  templateUrl: './password-change-request.component.html',
  styleUrls: ['./password-change-request.component.css']
})
export class PasswordChangeRequestComponent implements OnInit {
  passwordChange = {
    newPassword: '',
    confirmPassword: ''
  };
  otpnumber = {
    otpnum: ''
  };
  submitted = false;

  constructor(private authService: AuthService, private route: Router, private router: ActivatedRoute,
              private notiFicationService: NotificationService) { }

  ngOnInit(): void {
  }

  ChangePassword(): void{
    const data = {
      newPassword: this.passwordChange.newPassword,
      confirmPassword: this.passwordChange.confirmPassword
    };
    const {
      otpnum
    } = this.otpnumber;
    console.log(otpnum);
    console.log(this.router.snapshot.paramMap.get('email'));
    this.authService.changePassword(this.router.snapshot.paramMap.get('email'), otpnum, data).subscribe(
      response => {
        console.log(response);
        this.notiFicationService.success(':: Password Changed Successfully');
        this.submitted = true;
        this.route.navigate(['/login']);
      },
      err => {
        this.notiFicationService.warn('! Password change failed');
      }
    );

  }
}
