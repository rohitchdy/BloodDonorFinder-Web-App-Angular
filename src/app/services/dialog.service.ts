import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../pages/mat-confirm-dialog/mat-confirm-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: any): any {
    return this.dialog.open(MatConfirmDialogComponent, {
       width: '390px',
       panelClass: 'confirm-dialog-container',
       disableClose: true,
       position: { top: '10px' },
       data : {
         message : msg
       }
     });
   }
}
