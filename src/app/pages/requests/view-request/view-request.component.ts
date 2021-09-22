import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  constructor(public requestService: RequestService,
              private dialogRef: MatDialogRef<ViewRequestComponent>) { }

  ngOnInit(): void {
  }

  onClose(): any {
    this.requestService.initializeFormGroup();
    this.dialogRef.close();
  }

}
