import { FeedComponent } from './../feed/feed.component';
import { DialogService } from './../../../services/dialog.service';
import { NotificationService } from './../../../services/notification.service';
import { Feed } from './../../../models/feed';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { FeedService } from 'src/app/services/feed.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewFeedComponent } from '../view-feed/view-feed.component';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'feedTitle', 'feedDescription', 'fullName', 'mobile', 'postDate', 'isActive', 'actions'];
  dataSource = new  MatTableDataSource<Feed>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  currentUser: any;
  adminBoard: any;



  constructor(private feedService: FeedService, private route: Router,
              private router: ActivatedRoute,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private dialog: MatDialog, private tokenStorage: TokenStorageService){}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.currentUser = this.tokenStorage.getUser();

    if (this.currentUser) {
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;
      this.adminBoard = this.roles.includes('ROLE_ADMIN');


      this.username = user.username;
    }
    // const id = this.router.snapshot.params.id;

    this.feedService.getAll().subscribe(
      response => {
        this.dataSource.data = response as Feed[];
        console.log(this.dataSource.data);
      },
      error => {
        console.log(error);
      }
    );
   }

   reloadPage(): void {
    window.location.reload();
  }

  onSearchClear(): any {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(): any {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onCreate(): void {
    this.feedService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(FeedComponent, dialogConfig);
  }

  onEdit(row: any): any{
    this.feedService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(FeedComponent, dialogConfig);
  }
  onView(row: any): any{
    this.feedService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ViewFeedComponent, dialogConfig);
  }

  onDelete(id: any): void {
    console.log(id);
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res => {
      if (res){
        this.feedService.deleteFeed(id).subscribe(
          response => {
            console.log(response);
            this.notificationService.success('! Deleted successfully');
            setTimeout(
              // tslint:disable-next-line: only-arrow-functions
              function(): any{
                location.reload();
              }, 1000
            );
          }, err => {
            this.notificationService.warn('! Delete Failed');
            setTimeout(
              // tslint:disable-next-line: only-arrow-functions
              function(): any{
                location.reload();
              }, 1000
            );
          }
        );
        // this.reloadPage();
      }
    });
  }

}
