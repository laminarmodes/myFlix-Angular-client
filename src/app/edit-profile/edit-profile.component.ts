/** 
 * Renders the dialog to edit profile information
 * @module EditProfileComponent
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {

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

  /** Updates the user's profile information with the user input */
  editUser(): void {
    this.fetchApiData.editUser(this.userProfile).subscribe((resp: any) => {
      this.dialogRef.close();
      window.location.reload();
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

} //: export class EditProfileComponent implements OnInit
