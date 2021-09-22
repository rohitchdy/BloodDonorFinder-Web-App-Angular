import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HOME_URL } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authUrl = `${HOME_URL}auth`;
  private homeUrl = `${HOME_URL}home`;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.tokenStorage.getToken() })
  };

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    fullName: new FormControl(''),
    mobile: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    bloodGroup: new FormControl(''),
    district: new FormControl(''),
    municipality: new FormControl(''),
    localAddress: new FormControl(''),
    donatedDate: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    createdDate: new FormControl(''),
    isEnabled: new FormControl(''),
    roles: new FormControl('')

  });

  initializeFormGroup(): void {
    this.form.setValue({
      id: '',
      fullName: '',
      mobile: '',
      dob: '',
      gender: '',
      bloodGroup: '',
      district: '',
      municipality: '',
      localAddress: '',
      donatedDate: '',
      username: '',
      email: '',
      password: '',
      isEnabled: '',
      createdDate: '',
      roles: ''
    });
  }

  populateForm(user: any): any {
    this.form.setValue((user));
    console.log(user);
  }


  getUsers(): Observable<any> {
    const url = `${this.homeUrl}/user/list`;
    return this.http.get(url, this.httpOptions);

  }
  getUsername(data: any): Observable<any> {
    const url = `${this.authUrl}/changePasswordRequest?email=${data}`;
    return this.http.post(url, data, this.httpOptions);
  }

  getUser(): Observable<any> {
    const url = `${this.homeUrl}/user/findById`;
    return this.http.get(url, this.httpOptions);
  }

  getOwnUser(id: any): Observable<any> {
    const url = `${this.homeUrl}/user/findById`;
    return this.http.get(url, this.httpOptions);
  }

  UpdateOwnUsername(data: any): Observable<any> {
    const url = `${this.homeUrl}/user/update`;
    return this.http.get(url, data);
  }
  UpdateUsername(data: any, id: any): Observable<any> {
    const url = `${this.homeUrl}/user/updateById?userId=${id}`;
    return this.http.get(url, data);
  }
}
