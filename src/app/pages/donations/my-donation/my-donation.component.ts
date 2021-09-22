import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DonationService } from 'src/app/services/donation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ViewDonationComponent } from '../view-donation/view-donation.component';

@Component({
  selector: 'app-my-donation',
  templateUrl: './my-donation.component.html',
  styleUrls: ['./my-donation.component.css']
})
export class MyDonationComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id', 'acceptedDate', 'receiverName', 'receiverContact', 'status', 'requestDate', 'bloodUnit', 'hospitalName',
  'district', 'municipality', 'localAddress', 'actions'
];
dataSource: any;
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;
searchKey!: string;
constructor(private donationService: DonationService, private tokenStroage: TokenStorageService, private dialog: MatDialog) { }

ngOnInit(): void {
this.getPendingDonation();
}

getPendingDonation(): any{
this.donationService.requestAcceptedByMeCompleted().subscribe(
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
onView(row: any): any{
  this.donationService.populateForm(row);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '60%';
  this.dialog.open(ViewDonationComponent, dialogConfig);
}

}
