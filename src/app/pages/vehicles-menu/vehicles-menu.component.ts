import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleTypeComponent } from '../vehicle-types/vehicle-types.component';
import { VehicleMakeComponent } from '../vehicle-make/vehicle-make.component';

@Component({
  selector: 'app-vehicles-menu',
  templateUrl: './vehicles-menu.component.html',
  styleUrls: ['./vehicles-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, VehicleTypeComponent, VehicleMakeComponent],
})

export class VehiclesMenuComponent {

  @ViewChild(VehicleTypeComponent) childRef!: VehicleTypeComponent;
  @ViewChild(VehicleMakeComponent) childRef1!: VehicleMakeComponent;

  searchText: string = ''

  pages = [
    { id: 1, name: "Types", },
    { id: 1, name: "Makes", },
 ]

 activeIndex: number = 0;

  setActive(index: number) {
    this.activeIndex = index;

  }

  getRouterLink(index: number): string {
    switch(index) {
      case 0:
        return '/add-vehicle-type';
      case 1:
        return '/add-vehicle-make';
      case 2:
        return '/';
      case 3:
        return '/';
      default:
        return '/';
    }
  }

 applySearch(){
  // this.childRef.applyFilter()
}

 
}
