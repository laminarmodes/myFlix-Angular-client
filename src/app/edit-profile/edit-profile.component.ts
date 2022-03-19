// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {

  // user: any = {};

  @Input() userProfile = {
    Username: '',
    Email: '',
    Birthday: '',
    Password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  // getUser(): void {
  //   const user = localStorage.getItem('username');
  //   this.fetchApiData.getProfile().subscribe((resp: any) => {
  //     this.user = resp;
  //   });
  // }

  editUser(): void {
    this.fetchApiData.editUser(this.userProfile).subscribe((resp: any) => {

      this.dialogRef.close();
      window.location.reload();

      // Update user in local client
      //localStorage.setItem('username', this.userProfile.Username)
      localStorage.setItem('token', resp.token);
      localStorage.setItem('username', resp.user.Username);

      this.snackBar.open('Your profile has been updated', 'Ok', {
        duration: 4000,
      });

    }, (res) => {
      this.snackBar.open('Thank you', 'Ok', {
        duration: 4000,
      });
    });
  }

}
