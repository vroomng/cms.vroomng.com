import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { IRatings_R } from '../../model/ridersinfo';

@Component({
  selector: 'app-ratings-driver',
  standalone: true,
  imports: [],
  templateUrl: './ratings-driver.component.html',
  styleUrl: './ratings-driver.component.scss'
})
export class RatingsDriverComponent {

  @Input() searchText: string = '';
  applyFilter() {
    throw new Error('Method not implemented.');
  }

}
