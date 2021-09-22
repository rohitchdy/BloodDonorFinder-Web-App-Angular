import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-view-feed',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.css']
})
export class ViewFeedComponent implements OnInit {

  constructor(public feedService: FeedService, private dialogRef: MatDialogRef<ViewFeedComponent>) { }

  ngOnInit(): void {
  }

  onClose(): any {
    this.feedService.initializeFormGroup();
    this.dialogRef.close();
  }

}
