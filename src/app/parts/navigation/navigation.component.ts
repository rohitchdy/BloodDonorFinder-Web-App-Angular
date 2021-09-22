import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  currentUser: any;
  adminBoard: any;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.currentUser = this.tokenStorage.getUser();

    if (this.currentUser) {
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;
      console.log(this.roles);
      this.adminBoard = this.roles.includes('ROLE_ADMIN');


      this.username = user.username;
    }
  }
  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
