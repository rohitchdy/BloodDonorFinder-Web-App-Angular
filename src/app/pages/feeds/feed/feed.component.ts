import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FeedService } from 'src/app/services/feed.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  message1: any;
  message: any;
  error1: any;

  constructor(public feedService: FeedService, private notificationService: NotificationService,
              public dialogRef: MatDialogRef<FeedComponent>) { }



  ngOnInit(): void {
    // this.feedService.getAll();
  }
  onClear(): any {
    this.feedService.form.reset();
    this.feedService.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onClose(): any {
    this.feedService.form.reset();
    this.feedService.initializeFormGroup();
    this.dialogRef.close();
  }

  onSubmit(): any {
    if (this.feedService.form.valid) {
      if (!this.feedService.form.get('id')?.value){
        console.log(this.feedService.form.value);
        this.feedService.addFeed(this.feedService.form.value).subscribe(
          response => {
            console.log(response);
            this.notificationService.success(':: Submitted successfully');
            setTimeout(
              // tslint:disable-next-line: only-arrow-functions
              function(): any{
                location.reload();
              }, 1000
            );
          }, error => {
            console.log(error);
            this.notificationService.warn(':: Submission Failed');
            setTimeout(
              // tslint:disable-next-line: only-arrow-functions
              function(): any{
                location.reload();
              }, 1000
            );
          }
        );
      }
      else{
        console.log(this.feedService.form.get('id')?.value);
        console.log(this.feedService.form.value);
        this.feedService.updateFeed((this.feedService.form.get('id')?.value), this.feedService.form.value).subscribe(
        response => {
          console.log(response);
          this.message1 = response.message;
          this.notificationService.success(`:: ${this.message1}`);
          setTimeout(
            // tslint:disable-next-line: only-arrow-functions
            function(): any{
              location.reload();
            }, 1000
          );
        }, err => {
          this.error1 = err.error.message;
          this.notificationService.warn(`! ${this.error1}`);
          setTimeout(
            // tslint:disable-next-line: only-arrow-functions
            function(): any{
              location.reload();
            }, 1000
          );
        }
      );
      }
      this.feedService.form.reset();
      this.feedService.initializeFormGroup();
      this.onClose();
  }
}
}
