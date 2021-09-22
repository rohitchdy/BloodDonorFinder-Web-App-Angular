import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'fullName', 'mobile', 'dob', 'gender', 'bloodGroup', 'district', 'municipality',
  'localAddress', 'email', 'username', 'donatedDate', 'isEnabled', 'createdDate', 'actions'];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;

  constructor(private userService: UserService,
              private router: ActivatedRoute,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(): any{
    this.userService.getUsers().subscribe(
      response => {
        this.dataSource.data = response;
        console.log(response);

      }
    );
  }

  onView(row: any): any{
    this.userService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(UserComponent, dialogConfig);
  }
  reloadPage(): any{
    window.location.reload();
  }

  onSearchClear(): any{
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(): any{
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  ngAfterViewInit(): any{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
