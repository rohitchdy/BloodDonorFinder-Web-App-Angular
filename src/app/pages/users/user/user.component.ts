import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public userService: UserService, private notificationService: NotificationService,
              public dialogRef: MatDialogRef<UserComponent>
    ) { }

  ngOnInit(): void {
  }


  onClear(): any {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onClose(): any {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
    this.dialogRef.close();
  }

}
