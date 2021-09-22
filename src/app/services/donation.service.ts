import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HOME_URL } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private donationUrl = `${HOME_URL}home`;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.tokenStorage.getToken() })
  };

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    acceptedDate: new FormControl(''),
    status: new FormControl(''),
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
    }),
    request: new FormGroup({
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
    }),
  });

  initializeFormGroup(): void {
    this.form.setValue({
      id: '',
      acceptedDate: '',
      status: '',
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
      },
      request: {
        id: '',
        bloodGroup: '',
        bloodUnit: '',
        remarks: '',
        mobile: '',
        hospitalName: '',
        district: '',
        municipality: '',
        localAddress: '',
        status: '',
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
        roles: ''
      }
      },

    });
  }

  populateForm(donation: any): any {
    this.form.setValue((donation));
    console.log(donation);
  }

  getCompletedDonationDetails(): any{
    const url = `${this.donationUrl}/donationDetails`;
    return this.http.get(url, this.httpOptions);
  }
  getDonationDetails(): any{
    const url = `${this.donationUrl}/request/acceptedList`;
    return this.http.get(url, this.httpOptions);
  }

  completeRequest(id: any, id1: any): any {
    const url = `${this.donationUrl}/request/complete?donationId=${id}&requestId=${id1}`;
    return this.http.post(url, null, this.httpOptions);
  }

  requestAcceptedByMe(): any{
    const url = `${this.donationUrl}/request/acceptedByMe`;
    return this.http.get(url, this.httpOptions);
  }
  requestAcceptedByMeCompleted(): any{
    const url = `${this.donationUrl}/request/acceptedByMe/completed`;
    return this.http.get(url, this.httpOptions);
  }
}
