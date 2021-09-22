import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-view-donation',
  templateUrl: './view-donation.component.html',
  styleUrls: ['./view-donation.component.css']
})
export class ViewDonationComponent implements OnInit {

  constructor(public donationService: DonationService,
              public dialogRef: MatDialogRef<ViewDonationComponent>) { }

  ngOnInit(): void {
  }
  onClose(): any {
    this.donationService.initializeFormGroup();
    this.dialogRef.close();
  }

}
