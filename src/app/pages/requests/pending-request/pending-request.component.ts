import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RequestService } from 'src/app/services/request.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { RequestComponent } from '../request/request.component';
import { ViewRequestComponent } from '../view-request/view-request.component';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'fullName', 'bloodGroup', 'bloodUnit', 'remarks', 'mobile', 'hospitalName', 'district', 'municipality', 'localAddress', 'requestDate', 'status', 'isActive', 'actions'];
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
    this.requestService.getAllPending().subscribe(
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
          }
        );
        console.log(id);
        this.notificationService.warn('! Deleted successfully');
        this.reloadPage();
      }
    });
  }
  onAcceptRequest(id: any): any {
    console.log(id);
    this.dialogService.openConfirmDialog('Are you sure to accept the request?').afterClosed().subscribe(
      res => {
        if (res) {
          this.requestService.requestsAccept(id).subscribe(
            response => {
              console.log(response);
              this.message = response;
              this.message1 = this.message;
              this.notificationService.success(':: Request Accepted');
                // this.reloadPage();
              setTimeout(
                  // tslint:disable-next-line: only-arrow-functions
                  function(): any{
                    location.reload();
                  }, 1000
                );
                },
                err => {
                  console.log(err.error.message);
                  this.notificationService.warn('! You cannot accept your own request.');
                  setTimeout(
                    // tslint:disable-next-line: only-arrow-functions
                    function(): any{
                      location.reload();
                    }, 1000
                  );
                }
          );
        }
      }
    );
  }


}
