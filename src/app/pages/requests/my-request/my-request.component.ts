import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RequestService } from 'src/app/services/request.service';
import { RequestComponent } from '../request/request.component';
import { ViewRequestComponent } from '../view-request/view-request.component';

@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.css']
})
export class MyRequestComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'bloodGroup', 'bloodUnit', 'remarks', 'mobile', 'hospitalName', 'district', 'municipality', 'localAddress', 'requestDate', 'status', 'isActive', 'actions'];
  dataSource = new  MatTableDataSource<Request>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;

  constructor(private requestService: RequestService,
              private router: ActivatedRoute,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.requestService.getAllMyRequests().subscribe(
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
  onView(row: any): any{
    this.requestService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ViewRequestComponent, dialogConfig);
  }

  onEdit(row: any): any{
    this.requestService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(RequestComponent, dialogConfig);
  }

  onDelete(id: any): void {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res => {
      if (res){
        console.log(id);
        this.requestService.deleteRequest(id).subscribe(
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
            this.notificationService.warn('! Delete Failed ');
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

    onResetRequest(id: any): void {
    this.dialogService.openConfirmDialog('Are you sure to reset this request?').afterClosed().subscribe(
      res => {
        if (res){
          this.requestService.onResetRequest(id).subscribe(
            response => {
              console.log(response);
              this.notificationService.success(':: Reseted Successfully.');
            }, error => {
              console.log(error);
              this.notificationService.warn('! Reset failed.');
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
