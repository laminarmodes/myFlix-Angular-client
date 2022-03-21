/** 
 * Renders the details about a particular movie
 * @module DetailsCardComponent
 */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss']
})

export class DetailsCardComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      ImagePath: any,
      Director: string,
      Description: string,
      Genre: string,
    }
  ) { }

  ngOnInit(): void {
  }

} //: export class DetailsCardComponent implements OnInit
