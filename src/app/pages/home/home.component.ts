import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  request: any;
  pendingDonation: any;
  user: any;
  feed: any;
  donation: any;
  myCompleteDonation: any;
  currentUser: any;
  adminBoard: any;

  constructor(private homeService: HomeService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
      }
    this.currentUser = this.tokenStorage.getUser();

    if (this.currentUser) {
        const user = this.tokenStorage.getUser();
        this.roles = user.roles;
        this.adminBoard = this.roles.includes('ROLE_ADMIN');
      }

    this.countDonation();
    this.countFeed();
    this.countMyAcceptedRequest();
    this.countPendingRequest();
    this.countRequest();
    this.countUser();
  }

  countRequest(): void {
    this.homeService.requestCount().subscribe(
      response => {
        console.log(response);
        this.request = response;
      }, error => {
        console.log(error);
      }
    );
  }


  countUser(): void {
    this.homeService.userCount().subscribe(
      response => {
        console.log(response);
        this.user = response;
      }, error => {
        console.log(error);
      }
    );
  }
  countFeed(): void {
    this.homeService.feedCount().subscribe(
      response => {
        console.log(response);
        this.feed = response;
      }, error => {
        console.log(error);
      }
    );
  }
  countDonation(): void {
    this.homeService.donationCount().subscribe(
      response => {
        console.log(response);
        this.donation = response;
      }, error => {
        console.log(error);
      }
    );
  }

  countPendingRequest(): void {
    this.homeService.donationPendingCount().subscribe(
      response => {
        console.log(response);
        this.pendingDonation = response;
      }, error => {
        console.log(error);
      }
    );
  }

  countMyAcceptedRequest(): void {
    this.homeService.myCompleteDonation().subscribe(
      response => {
        console.log(response);
        this.myCompleteDonation = response;
      }, error => {
        console.log(error);
      }
    );
  }

}
