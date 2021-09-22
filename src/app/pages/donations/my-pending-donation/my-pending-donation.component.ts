import { NotificationService } from 'src/app/services/notification.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DonationService } from 'src/app/services/donation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ViewDonationComponent } from '../view-donation/view-donation.component';

@Component({
  selector: 'app-my-pending-donation',
  templateUrl: './my-pending-donation.component.html',
  styleUrls: ['./my-pending-donation.component.css']
})
export class MyPendingDonationComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'acceptedDate', 'receiverName', 'receiverContact', 'status', 'requestDate', 'bloodUnit', 'hospitalName',
                                    'district', 'municipality', 'localAddress', 'actions'
                                  ];
  dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;
  constructor(private donationService: DonationService, private tokenStroage: TokenStorageService,
              private dialog: MatDialog, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getPendingDonation();
  }

  getPendingDonation(): any{
    this.donationService.requestAcceptedByMe().subscribe(
      response => {
        this.dataSource = response;
        console.log(this.dataSource);

      }
    );
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

  onComplete(id: any, id1: any): any{
  console.log(id, id1);
  this.donationService.completeRequest(id, id1).subscribe(
    response => {
      this.notificationService.success(':: Completed');
      setTimeout(
              // tslint:disable-next-line: only-arrow-functions
              function(): any{
                location.reload();
              }, 1000
            );
    }
  );

  }
  onView(row: any): any{
    this.donationService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ViewDonationComponent, dialogConfig);
  }

  reloadPage(): void {
    window.location.reload();
  }

}
