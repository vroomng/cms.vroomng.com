import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripsComponent } from '../trips/trips.component';
import { TripsCompletedComponent } from '../trips-completed/trips-completed.component';
import { TripsOngoingComponent } from '../trips-ongoing/trips-ongoing.component';
import { TripsCanceledComponent } from '../trips-canceled/trips-canceled.component';





@Component({
  selector: 'app-trip-menu',
  templateUrl: './trip-menu.component.html',
  styleUrls: ['./trip-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule, ReactiveFormsModule, TripsComponent,TripsCompletedComponent, TripsCanceledComponent, TripsOngoingComponent],
  
})
export class  TripMenuComponent {
  
@ViewChild(TripsComponent) childRef!:  TripsComponent;
@ViewChild(TripsCompletedComponent) childRef1!: TripsCompletedComponent;
@ViewChild(TripsCanceledComponent) childRef2!: TripsCanceledComponent;
@ViewChild(TripsOngoingComponent) childRef3!: TripsOngoingComponent;

  users = [
    // { id: 1, name: "All Trips", },
    { id: 1, name: "All trips", },
    { id: 2, name: "Completed",  },
    { id: 3, name: "On going ",  },
    { id: 4, name: "Canceled ",  },
 ]
 searchText: string = ''
 addNewAdmin: boolean = false;

 constructor(){}
  ngOnInit() {
    
  }
 
  activeIndex: number = 0;
  // activeUserData: string = this.users[0].data;

  setActive(index: number) {
    this.activeIndex = index;

  }


  applySearch(){
    this.childRef.applyFilter()
  }


}
