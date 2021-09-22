import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(public requestService: RequestService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<RequestComponent>) { }

  ngOnInit(): void {
  }
  onClear(): any {
    this.requestService.form.reset();
    this.requestService.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }
  onClose(): any {
    this.requestService.form.reset();
    this.requestService.initializeFormGroup();
    this.dialogRef.close();
  }

  onSubmit(): any {
    if (this.requestService.form.valid) {
      if (!this.requestService.form.get('id')?.value){
        console.log(this.requestService.form.value);
        this.requestService.addRequest(this.requestService.form.value).subscribe(
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
            this.notificationService.warn('! Submission failed');
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
        console.log(this.requestService.form.get('id')?.value);
        console.log(this.requestService.form.value);
        this.requestService.updateRequest((this.requestService.form.get('id')?.value), this.requestService.form.value).subscribe(
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
          this.notificationService.warn('! Submission failed');
          setTimeout(
            // tslint:disable-next-line: only-arrow-functions
            function(): any{
              location.reload();
            }, 1000
          );
        }
      );
      }
      this.requestService.form.reset();
      this.requestService.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();

    }
  }

  onResetRequest(id: any): void {
    this.requestService.onResetRequest(id).subscribe(
      response => {
        console.log(response);
      }, error => {
        console.log(error);
      }
    );
  }
}
