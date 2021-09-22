import { DataSource } from '@angular/cdk/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Donation } from 'src/app/models/donation';
import { DonationService } from 'src/app/services/donation.service';
import { ViewDonationComponent } from '../view-donation/view-donation.component';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'acceptedDate', 'donorName', 'donorContact', 'receiverName', 'receiverContact', 'status', 'requestDate', 'bloodUnit', 'hospitalName',
                                    'district', 'municipality', 'localAddress', 'actions'
                                  ];
  dataSource = new MatTableDataSource<Donation>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;

  constructor(private donationService: DonationService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getCompletedDonationDetails();
  }

  getCompletedDonationDetails(): any {
    this.donationService.getCompletedDonationDetails().subscribe(
      (response: any) => {
        this.dataSource.data = response;
        console.log(response);
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

    onView(row: any): any{
      this.donationService.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.dialog.open(ViewDonationComponent, dialogConfig);
    }

}
