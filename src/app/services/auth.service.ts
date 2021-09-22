import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOME_URL } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private homeUrl = `${HOME_URL}auth`;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  login(username: string, password: string ): Observable<any> {
    const url = `${this.homeUrl}/signin`;
    return this.http.post(url, {
      username,
      password
    }, this.httpOptions);
  }

  register(fullName: string, mobile: string, dob: string, gender: string, bloodGroup: string,
           district: string, municipality: string, localAddress: string, username: string, email: string, password: string ): Observable<any> {
    const url = `${this.homeUrl}/signup`;
    return this.http.post(url, {
      fullName, mobile, dob, gender, bloodGroup, district, municipality, localAddress, username, email, password
    }, this.httpOptions);
  }

  verifyEmail( username: any, data: any): Observable<any> {
    const url = `${this.homeUrl}/emailverification/${username}?otpnum=${data}`;
    return this.http.post(url, data, this.httpOptions);
  }
  verifyEmail1(email: any, data: any): Observable<any> {
    const url = `${this.homeUrl}/otp/emailverification?otpnum=${data}&email=${email}`;
    return this.http.post(url, data, this.httpOptions);
  }
  generateOtp(email: any): Observable<any> {
    const url = `${this.homeUrl}/generate/otp?email=${email}`;
    return this.http.post(url, email, this.httpOptions);
  }
  changePassword(email: any, otpnum: any, data): Observable<any>{
    const url = `${this.homeUrl}/changePassword/${email}?otpnum=${otpnum}`;
    return this.http.post(url, data, this.httpOptions);
  }
}
