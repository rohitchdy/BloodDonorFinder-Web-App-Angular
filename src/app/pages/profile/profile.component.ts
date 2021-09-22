import { Profile } from './../../models/profile';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Observable } from 'rxjs';

import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  form: any = {
    clientFullName: null,
    clientDob: null,
    gender: null,
    bloodGroup: null,
    mobile: null,
    district: null,
    municipality: null,
    localAddress: null
  };
  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = false;
  currentUser: any;
  profile: any;
  user: any;
  selectedFile: any;
  isSelectedFile?: false;
  currentFile: any;
  progress = 0;
  message = '';
  uploadSuccessfulMessage = 'any';

  constructor(private token: TokenStorageService,
              private userService: UserService,
              private profileService: ProfileService,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private dialog: MatDialog) { }

  displayedColumns: string[] = ['id', 'username', 'profilePic', 'clientFullName', 'clientDob', 'gender', 'bloodGroup', 'mobile', 'district', 'municipality', 'localAddress', 'actions'];
  dataSource = new  MatTableDataSource<Profile>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;

  fileInfos?: Observable<any>;

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    // this.viewProfilePic();
    this.getOwnClientDetail();
  }

  viewProfilePic(): void {
    this.profileService.viewProfilePic().subscribe(
      response => {
        this.dataSource.data = response;
        console.log(this.dataSource.data);
      }, error => {
        console.log(error);
      }
    );
  }
  getOwnClientDetail(): void {
    this.userService.getUser().subscribe(
      response => {
        console.log(response);
        this.user = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
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

  selectFile(event: any): any {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onSubmit(): void{
    this.progress = 0;
    const file = this.selectedFile;
    const formData = new FormData();
    formData.append('file', file);
    console.log(file);

    if (formData){
        this.profileService.uploadProfile(formData).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress){
              this.progress = Math.round(100 * event.loaded / event.total);
            }
            // else if(event instanceof HttpResponse){
            //   this.message = event.body.message;
            //   this.fileInfos = this.profileService.getFiles();
            // }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message){
              this.message = err.error.message;
            }
            else{
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        );
    }
  }


  Upload(): any{
    this.currentFile = this.selectedFile;
    const uploadFile: FormData = new FormData();
    uploadFile.append('file', this.selectedFile);
    console.log(uploadFile);

    this.profileService.uploadProfile(this.selectedFile).subscribe(
      (res: any) => {
        console.log(res);
        switch (res.type){
          case HttpEventType.Sent:
            console.log('Request is made.');
            break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received');
              break;
              case HttpEventType.UploadProgress:
                this.progress = Math.round(res.loaded / res.total * 100);
                console.log(`Uploaded! ${this.progress}%`);
                break;
                case HttpEventType.Response:
                  console.log(`Profile uploaded successfully`);
        }
      },
      err => {
        this.progress = 0;
        this.uploadSuccessfulMessage = 'Could not upload the profile Picture';
        console.log(err.error.message);
      }
    );
  }


}
