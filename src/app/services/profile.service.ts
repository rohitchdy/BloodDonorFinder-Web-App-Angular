import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOME_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private homeUrl = `${HOME_URL}home`;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' || 'application/json', Authorization: 'Bearer ' + this.tokenStorage.getToken() })
  };

  viewProfilePic(): Observable<any> {
    const url = `${this.homeUrl}/profile`;
    return this.http.get(url, this.httpOptions);
  }

  getUser(id: any): Observable<any> {
    const url = `${this.homeUrl}home/user/findUserById?userId=${id}`;
    return this.http.get(url, this.httpOptions);
  }

  upload(file: File): any{
    const url = `${this.homeUrl}/profile/update/profileStorage`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(url, formData, this.httpOptions);
  }

  // getFiles(){
  //   const url = `${this.homeUrl}/profile/files`
  //   return this.http.get(url, this.httpOptions);
  // }

  uploadProfile(data: any): any{
    const url = `${this.homeUrl}/profile/upload`;
    return this.http.post(url, data, this.httpOptions);
  }

}
