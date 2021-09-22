import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOME_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private homeUrl = `${HOME_URL}home`;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.tokenStorage.getToken() })
  };

  requestCount(): Observable<any> {
    const url = `${this.homeUrl}/request/count`;
    return this.http.get(url, this.httpOptions);
  }

  userCount(): Observable<any> {
    const url = `${this.homeUrl}/user/count`;
    return this.http.get(url, this.httpOptions);
  }

  feedCount(): Observable<any> {
    const url = `${this.homeUrl}/feed/count`;
    return this.http.get(url, this.httpOptions);
  }

  donationCount(): Observable<any> {
    const url = `${this.homeUrl}/complete/donation/count`;
    return this.http.get(url, this.httpOptions);
  }
  donationPendingCount(): Observable<any> {
    const url = `${this.homeUrl}/donation/pending/count`;
    return this.http.get(url, this.httpOptions);
  }

  myCompleteDonation(): Observable<any>{
    const url = `${this.homeUrl}/mydonation/complete/count`;
    return this.http.get(url, this.httpOptions);
  }
}
