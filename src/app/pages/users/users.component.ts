import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminViewComponent } from '../admin-view/admin-view.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriversComponent } from '../drivers/drivers.component';
import { RidersComponent } from '../riders/riders.component';
// import { PartnersComponent } from '../partners/partners.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, AdminViewComponent , DriversComponent, RidersComponent, FormsModule, ReactiveFormsModule],
})
export class UsersComponent implements OnInit {

@ViewChild(AdminViewComponent) childRef!: AdminViewComponent;
@ViewChild(DriversComponent) childRef1!: DriversComponent;
@ViewChild(RidersComponent) childRef2!: RidersComponent;
// @ViewChild(PartnersComponent) childRef3!: PartnersComponent;

@ViewChild(AdminViewComponent) exportRef!: AdminViewComponent;
@ViewChild(DriversComponent) exportRef1!: DriversComponent;
@ViewChild(RidersComponent) exportRef2!: RidersComponent;
// @ViewChild(PartnersComponent) exportRef3!: PartnersComponent;



 users = [
    { id: 1, name: "admin", },
    { id: 2, name: "drivers", },
    { id: 3, name: "riders",  },
    // { id: 4, name: "partners",  },
 ]

 searchText: string = ''
 

 constructor(){}
  ngOnInit() {
    
  }
 
  activeIndex: number = 0;

  setActive(index: number) {
    this.activeIndex = index;

  }

  getRouterLink(index: number): string {
    switch(index) {
      case 0:
        return '/add-admin';
      case 1:
        return '/add-driver';
      case 2:
        return '/add-rider';
      // case 3:
      //   return '/add-partners';
      default:
        return '/';
    }
  }

  applySearch(index: number) {
    if (index === 0) {
        this.childRef.applyFilter()
    } else if (index === 1) {
      this.childRef1.applyFilter() 
    }
     else if (index === 2) {
      this.childRef2.applyFilter()
    }
    //  else if (index === 3) {
    //   // this.childRef3.applyFilter()
    // }
}

  export(index: number){
    if (index === 0) {
      this.exportRef.exportExcel()
  } else if (index === 1) {
    this.exportRef1.exportExcel()
  }
   else if (index === 2) {
    this.exportRef2.exportExcel()
  }
  //  else if (index === 3) {
  //   // this.exportRef3.exportExcel()
  // }
  }



}
