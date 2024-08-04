import { Component, inject, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
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
import { IVehicleType } from '../../model/vehicleInfo';

@Component({
  selector: 'app-vehicle-types',
  templateUrl: './vehicle-types.component.html',
  styleUrls: ['./vehicle-types.component.scss'],
  standalone: true,
  imports : [
    HttpClientModule, TableModule, CommonModule, RouterLink , ButtonComponent,ButtonModule, Button, ModalComponent, LoaderComponent
  ]
})
export class VehicleTypeComponent implements OnInit {

  @Input() searchText: string = '';
  showNoResults:boolean = false;
  moreActions:boolean = false;
  vehicleType!: any;
  originalData = this.vehicleType;
  loaderColor!: 'primary';
  showLoader = true;
  userDetails:any;
  displayDialog:boolean = false;
  viewVehicle: IVehicleType | any ; 
  viewedRowId: string | null = null;

  selectedUserId:any = null;

  constructor(){}
  private baseUrl = environment.serverUrl;
  private http = inject(HttpClient);
  
  ngOnInit(): void {
    this.getVehicles().subscribe(
      (res:any) => {
        console.log(res.data)
        this.vehicleType = res.data.vehicle_type;
        this.showLoader = false;
      }
    )
    
  }

  getVehicles(): Observable<IVehicleType[]>{
    return this.http.get<any>(`${this.baseUrl}/api/admin/vehicle/type/index`);
  }

 
    

  clear() {
    this.searchText = '';
    this.getVehicles().subscribe(
      (res:any) => {
        console.log(res.data)
        this.vehicleType = res.data;
        this.showLoader = false;
      }
    )
      this.vehicleType = this.originalData
  }

  applyFilter() {
    const filteredAdmins = this.vehicleType.filter((item:any) => {
      // Adjust the conditions based on your filtering requirements
      return (
      item.vehicle_type.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.trip_type.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
    // Update the table data with the filtered results
    // If you are using server-side filtering, you may need to call an API here
    this.vehicleType = filteredAdmins;
  }
    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.vehicleType);
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
    
    editVehicle(vehicle: IVehicleType):any {
      this.viewVehicle = { ...vehicle }; // Create a copy to avoid modifying the original data; 
      this.viewedRowId = vehicle.uuid;
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
