import { Component, OnInit,Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IApproved_Drivers } from '../../model/driverInfo';
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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss',
  standalone: true,
    imports : [
    HttpClientModule, TableModule, CommonModule, RouterLink , FormsModule, ButtonComponent,ButtonModule, Button, ModalComponent, LoaderComponent],
})
export class DriversComponent implements OnInit {
 isChecked: any;
 message:any;

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);
  
 @Input() searchText: string = '';
 showNoResults:boolean = false;
 moreActions:boolean = false;

 insubmission = false;

app_drivers: IApproved_Drivers [] = [];
  checked = false;
  userDetails:any;
  displayDialog:boolean = false;
  take_action: boolean = false;
  loaderColor!: 'primary';
  showLoader = true;
  // searchText: string = '';
  editedUser: IApproved_Drivers | any;
  // showNoResults:boolean = false;
  selectedUserId:any = null;
  originalData = this.app_drivers;
 

  editedRowId: number | null = null;


  constructor(
    // private approved_drivers : DriversService, private users:UsersService
  ){

  }

  ngOnInit(): void {
    this.getDrivers().subscribe(
      (res:any) => {
        console.log(res.data)
        this.app_drivers = res.data.drivers.data
        console.log('response',res.data.drivers.data)
        this.showLoader = false;
        // this.sortDrivers()
        
      }
    );

    const storedUserDetails = localStorage.getItem('userDetails');
    console.log(storedUserDetails);
    if (storedUserDetails) {
      this.userDetails = JSON.parse(storedUserDetails);

    } else {
      console.log('User details not found in localStorage.');
    }
    
  }

  getDrivers(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/admin/drivers`);
  }

  aprroveDriver(approveForm: object, driverId:any) {
    return this.http.put(`${this.baseUrl}/api/admin/driver/approval/${driverId}`, approveForm);
  }

  submitAction(driverId:any) {

    this.insubmission = true;

    let aprroveForm = {
       approve: this.isChecked,
       message: this.message
     }
     console.log(aprroveForm)
     this.aprroveDriver(aprroveForm, driverId).subscribe(
      (res: any) => {
        // This is the 'next' function, which handles successful responses
        console.log('Driver approved successfully:', res);
        this.insubmission = false;
        alert(res.data.message)
        setTimeout(() => {
          this.isModalVisible = false;
        },2000)
       
      },
      (err: any) => {
        // This is the 'error' function, which handles any errors that occur
        this.insubmission = false;
        alert(err.error.data.message)
       
      }
     );
   }

userAction(userId: any) {
  if (this.selectedUserId === userId) {
      this.selectedUserId = null; // Hide the card actions if the same user is clicked again
  } else {
      this.selectedUserId = userId; // Show the card actions for the clicked user
  }
}

applyFilter() {
  const inputField = this.searchText.trim();
  const filteredAdmins = this.app_drivers.filter((admin:any) => {
    // Adjust the conditions based on your filtering requirements
    return (
      admin.firstname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (admin.lastname && admin.lastname.toLowerCase().includes(this.searchText.toLowerCase())) ||
      admin.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (admin.phone_no && admin.phone_no.toLowerCase().includes(this.searchText.toLowerCase())) ||
      admin.user_type.toString().includes(this.searchText)
    );
  });
  this.app_drivers = filteredAdmins;
}

exportExcel() {
  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.app_drivers);
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
  this.getDrivers().subscribe(
    (res:any)=>{
      console.log(res.data)
      this.app_drivers = res.data;
      this.showLoader = false;
    }
  )
}

  sortDrivers(){
    if(this.app_drivers){
      console.log('App drivers Exists')
      const newdata = this.app_drivers.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      });
      console.log('sorted array',newdata)
    }
    }

    editUser(user: any):any {
      this.editedUser = { ...user }; // Create a copy to avoid modifying the original data; 
      this.editedRowId = user.id;
      this.isModalVisible = true;
      this.selectedUserId = null; 
    }
    toggleDialog(){
      // this.displayDialog = !this.displayDialog
      this.isModalVisible = !this.isModalVisible
      this.take_action = !this.take_action
     
    }
    isModalVisible: boolean = false;

    showModal() {
      this.isModalVisible = true;
    }
  
    hideModal() {
      this.isModalVisible = false;
    }

    actions() {
      this.take_action = !this.take_action
    }
  
}
    


