import { RequestService } from './../../../services/request.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RequestComponent } from '../request/request.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ViewRequestComponent } from '../view-request/view-request.component';


@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'bloodGroup', 'bloodUnit', 'remarks', 'mobile',
                                'hospitalName', 'district', 'municipality', 'localAddress', 'requestDate',
                                 'status', 'isActive', 'actions'];
  dataSource = new  MatTableDataSource<Request>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  currentUser: any;
  adminBoard: any;
  message: any;
  message1: any;


  constructor(private requestService: RequestService,
              private router: ActivatedRoute,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private dialog: MatDialog,
              private tokenStorage: TokenStorageService) { }

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
    this.requestService.getAll().subscribe(
      response => {
        this.dataSource.data = response;
        console.log(this.dataSource.data);
      },
      error => {
        console.log(error);
      });
  }
  reloadPage(): void {
    window.location.reload();
  }

  // tslint:disable-next-line: typedef
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  // tslint:disable-next-line: typedef
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onCreate(): void {
    this.requestService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(RequestComponent, dialogConfig);
  }

  onEdit(row: any): any{
    this.requestService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(RequestComponent, dialogConfig);
  }
  onView(row: any): any{
    this.requestService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ViewRequestComponent, dialogConfig);
  }

  onDelete(id: any): void {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res => {
      if (res){
        console.log(id);
        this.requestService.deleteRequest(id).subscribe(
          response => {
            console.log(response);
            this.notificationService.success(':: Deleted successfully');
            setTimeout(
              // tslint:disable-next-line: only-arrow-functions
              function(): any{
                location.reload();
              }, 1000
            );
          },
          err => {
            this.notificationService.warn('! Delete Failed');
            setTimeout(
              // tslint:disable-next-line: only-arrow-functions
              function(): any{
                location.reload();
              }, 1000
            );
          }
        );
      }
    });
  }

  onAcceptRequest(id: any): any {
    this.dialogService.openConfirmDialog('Are you sure to accept the request?').afterClosed().subscribe(
      res => {
        if (res) {
          this.requestService.requestsAccept(id).subscribe(
            response => {
              console.log(response);
              this.notificationService.success(':: Request Accepted');
              setTimeout(
                  // tslint:disable-next-line: only-arrow-functions
                  function(): any{
                    location.reload();
                  }, 1000
                );
            }, err => {
              this.notificationService.warn('! You can not accept your own requests');
            }
          );
        }
      }
    );
  }

}
