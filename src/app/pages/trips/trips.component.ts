import { Component, inject, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { IAllTrips } from '../../model/trips';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpClientModule,  } from '@angular/common/http';
import { TableModule} from 'primeng/table';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { Button, ButtonModule } from 'primeng/button';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { LoaderComponent } from '../../components/shared/loader/loader.component';
import { CommonModule } from '@angular/common';

// import { TripService } from 'src/app/service/trips.service';
// import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
  standalone: true,
  imports : [
    HttpClientModule, TableModule, CommonModule, RouterLink , ButtonComponent,ButtonModule, Button, ModalComponent, LoaderComponent
  ]
  
})
export class TripsComponent implements OnInit {


 @Input() searchText: string = '';

 showNoResults:boolean = false;
 moreActions:boolean = false;
  
  trips: IAllTrips[] = [];
  viewTrips: IAllTrips | any;
  viewRowId: number | null = null;
  displayDialog: boolean = false;
  showLoader = true;
  userDetails:any

  loaderColor!: 'primary';
  editedUser: IAllTrips | any;
  selectedUserId:any = null;
  editedRowId: number | null = null;
  
  constructor(
    // private Trips: TripService, private users:UsersService
  ){}


  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);
  ngOnInit(): void {
    this.getAllTrips().subscribe(
      (res:any) =>{
        console.log('All trips',res.data.trips.data)
        this.trips = res.data.trips.data
        this.showLoader = false;
      }
    )
    // const userDetails = this.users.getStoredUserDetails();
    // this.userDetails = userDetails
   
  }
 
  getAllTrips(): Observable<IAllTrips[]>{
    return this.http.get<IAllTrips[]>(`${this.baseUrl}/api/admin/trips/all`);
  }
    
  viewTrip(trip: IAllTrips):any {
    this.viewTrips = { ...trip }; // Create a copy to avoid modifying the original data; 
    this.viewRowId = trip.id;
    this.displayDialog = true;
  }
  applyFilter() {
    const filteredAdmins = this.trips.filter((item) => {
      // Adjust the conditions based on your filtering requirements
      return (
      item.firstname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.lastname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.vehicle_type.toLowerCase().includes(this.searchText.toLowerCase()) 
      );
    });
    // Update the table data with the filtered results
    // If you are using server-side filtering, you may need to call an API here
    this.trips = filteredAdmins;
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(this.trips);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'admins');
    });

}
saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

clear(){
  this.searchText = '',
  this.getAllTrips().subscribe(
    (res:any) =>{
      console.log('All trips',res.data.trips.data)
      this.trips = res.data.trips.data
      this.showLoader = false;
    }
  )
}

editUser(user: any):any {
  this.editedUser = { ...user }; // Create a copy to avoid modifying the original data; 
  this.editedRowId = user.id;
  this.displayDialog = true;
  this.selectedUserId = null; 
}
toggleDialog(){
  this.displayDialog = !this.displayDialog
}

userAction(userId: any) {
  if (this.selectedUserId === userId) {
      this.selectedUserId = null; // Hide the card actions if the same user is clicked again
  } else {
      this.selectedUserId = userId; // Show the card actions for the clicked user
  }
}

showModal() {
  this.displayDialog = true;
}

hideModal() {
 this.displayDialog = false;
}

 

}

