import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { IRatings_D } from '../../model/driverInfo';

@Component({
  selector: 'app-ratings-rider',
  standalone: true,
  imports: [],
  templateUrl: './ratings-rider.component.html',
  styleUrl: './ratings-rider.component.scss'
})
export class RatingsRiderComponent {
  @Input() searchText: string = '';
  applyFilter() {
    throw new Error('Method not implemented.');
  }

}
