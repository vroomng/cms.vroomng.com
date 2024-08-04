import { Component, ViewChild } from '@angular/core';
import { RatingsDriverComponent } from '../ratings-driver/ratings-driver.component';
import { RatingsRiderComponent } from '../ratings-rider/ratings-rider.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ratings-menu',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule, ReactiveFormsModule, RatingsDriverComponent, RatingsRiderComponent],
  templateUrl: './ratings-menu.component.html',
  styleUrl: './ratings-menu.component.scss'
})
export class RatingsMenuComponent {
  @ViewChild(RatingsDriverComponent) childRef!: RatingsDriverComponent;
  @ViewChild(RatingsRiderComponent) childRef2!: RatingsRiderComponent;

  searchText: string = ''
  pages = [
    { id: 1, name: "Drivers", },
    { id: 2, name: "Riders", },
 ]

 activeIndex: number = 0;

 setActive(index: number) {
  this.activeIndex = index;

}

getRouterLink(index: number): string {
  switch(index) {
    case 0:
      return '/add-vehicle';
    case 1:
      return '/';
    case 2:
      return '/';
    case 3:
      return '/';
    default:
      return '/';
  }
}

applySearch(){
  this.childRef.applyFilter()
}

applySearch2(){
  this.childRef2.applyFilter()
}



}
