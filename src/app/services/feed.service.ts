import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOME_URL } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private feedUrl =  `${HOME_URL}home/feed`;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.tokenStorage.getToken() })
  };

  form: FormGroup = new FormGroup({
    id: new FormControl(null ),
    feedTitle: new FormControl('', Validators.required),
    feedDescription: new FormControl('', Validators.required),
    postDate: new FormControl(''),
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
      feedTitle: '',
      feedDescription: '',
      postDate: this.form.patchValue,

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
      roles: ''
    }
    });
  }

  populateForm(feed: any): any {
    this.form.setValue((feed));
    console.log(feed);
  }

 addFeed(data: any): Observable<any> {
   const url = `${this.feedUrl}/addNew`;
   return this.http.post(url, data, this.httpOptions);
 }

 getAll(): Observable<any>{
const url = `${this.feedUrl}/list`;
return this.http.get(url, this.httpOptions);
 }

 getOne(id: any): Observable<any> {
   const url = `${this.feedUrl}?feedId=${id}`;
   return this.http.get(url, this.httpOptions);

 }
 updateFeed(id: any, data: any): Observable<any> {
  const url = `${this.feedUrl}/update?feedId=${id}`;
  return this.http.put(url, data, this.httpOptions);
}

 deleteFeed(id: any): Observable<any> {
  const url = `${this.feedUrl}/delete?feedId=${id}`;
  return this.http.put(url, null, this.httpOptions);
 }



}
