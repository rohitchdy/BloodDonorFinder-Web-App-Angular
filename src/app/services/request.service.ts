import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOME_URL } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requestUrl = `${HOME_URL}home/request`;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.tokenStorage.getToken() })
  };
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    bloodGroup: new FormControl(''),
    bloodUnit : new FormControl(''),
    remarks : new FormControl(''),
     mobile: new FormControl(''),
     hospitalName: new FormControl(''),
     district: new FormControl(''),
     municipality: new FormControl(''),
     localAddress: new FormControl(''),
     status: new FormControl(''),
     requestDate: new FormControl(''),
     isActive: new FormControl(''),
     user: new FormGroup({
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

     })


  });

  initializeFormGroup(): void {
    this.form.setValue({
      id: '',
      bloodGroup: '',
      bloodUnit: '',
      remarks: '',
      mobile: '',
      hospitalName: '',
      district: '',
      municipality: '',
      localAddress: '',
      status: this.form.patchValue,
      requestDate: '',
      isActive: '',
      user: {
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
      roles: this.form.patchValue
    }
    });
  }

  populateForm(request: any): any {
    this.form.setValue((request));
    console.log(request);
  }


  addRequest(data: any): Observable<any> {
    const url = `${this.requestUrl}/addNew`;
    return this.http.post(url, data, this.httpOptions);
  }

  getAll(): Observable<any>{
    const url = `${this.requestUrl}/list`;
    return this.http.get(url, this.httpOptions);
  }

  getAllPending(): Observable<any> {
    const url = `${this.requestUrl}/pending/list`;
    return this.http.get(url, this.httpOptions);
  }

  getOne(id: any): Observable<any> {
    const url = `${this.requestUrl}?requestId=${id}`;
    return this.http.get(url, this.httpOptions);
  }

  updateRequest(id: any, data: any): Observable<any> {
    const url = `${this.requestUrl}/update?requestId=${id}`;
    return this.http.put(url, data, this.httpOptions);
  }

  deleteRequest(id: any ): Observable<any> {
    const url = `${this.requestUrl}/delete?requestId=${id}`;
    return this.http.put(url, null, this.httpOptions);
  }

  getAllMyRequests(): Observable<any> {
    const url = `${this.requestUrl}/myRequests`;
    return this.http.get(url, this.httpOptions);
  }

  onResetRequest(id: any): Observable<any> {
    const url = `${this.requestUrl}/reset?requestId=${id}`;
    return this.http.get(url, this.httpOptions);
  }

  requestsAccept(id: any): Observable<any> {
    const url = `${this.requestUrl}/accept?requestId=${id}`;
    return this.http.post(url, null, this.httpOptions);
  }


  myAcceptedRequest(): Observable<any> {
    const url = `${this.requestUrl}/acceptedList`;
    return this.http.get(url, this.httpOptions);
  }

}
