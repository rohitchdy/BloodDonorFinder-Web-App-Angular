import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  [x: string]: any;
  form: any = {
    fullName: null,
    mobile: null,
    dob: null,
    gender: null,
    bloodGroup: null,
    district: null,
    municipality: null,
    localAddress: null,
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private userService: UserService, private route: Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  onSubmit(): void{
    const {fullName, mobile, dob, gender, bloodGroup, district, municipality, localAddress, username, email, password} = this.form;
    console.log(bloodGroup);
    this.authService.register(fullName, mobile, dob, gender, bloodGroup, district, municipality, localAddress, username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        // tslint:disable-next-line: no-conditional-assignment
        if (this.isSuccessful = true){
          this.notificationService.success(':: Registration Successful. Please verify your email with otp sent to your email.');
        }
        this.route.navigate([`otp/${username}`]);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.notificationService.warn(`! ${this.errorMessage}`);


      }
    );
  }

}
