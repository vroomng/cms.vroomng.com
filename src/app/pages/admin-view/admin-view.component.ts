// Dependecies
import { Component, OnInit,Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IAdmin } from '../../model/admins';
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


// Decorator and file connector
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  standalone: true,
  imports : [
    HttpClientModule, TableModule, CommonModule, RouterLink , ButtonComponent,ButtonModule, Button, ModalComponent, LoaderComponent],
  providers: [DatePipe],
})

export class AdminViewComponent implements OnInit {

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);
  
 @Input() searchText: string = '';
 showNoResults:boolean = false;
 moreActions:boolean = false;

// variables
  admins!: any;
  displayDialog: boolean = false;
  showLoader = true;
  originalData = this.admins;
  selectedUserId:any = null;
  userDetails:any
  editedAdmin1: IAdmin | any;
  editedRowId: number | null = null;
  //  lifecycle and constructor
  constructor(
    // private users: UsersService,
    private datePipe: DatePipe,
    // private messageService: MessageService
  ){}
  ngOnInit(): void {
    this.getAdmins().subscribe(
    (res:any)=> {
      console.log(res)
      this.admins = res.data.admins.data
      console.log('response',res.data.admins.data)
      this.showLoader = false;
    }
    )
    const storedUserDetails = localStorage.getItem('userDetails');
    console.log(storedUserDetails);
    if (storedUserDetails) {
      this.userDetails = JSON.parse(storedUserDetails);

    } else {
      console.log('User details not found in localStorage.');
    }
  
    // this.accessTrail()
  }
 
  userAction(userId: any) {
    if (this.selectedUserId === userId) {
        this.selectedUserId = null; // Hide the card actions if the same user is clicked again
    } else {
        this.selectedUserId = userId; // Show the card actions for the clicked user
    }
}
  // // functions
  applyFilter() {
    const inputField = this.searchText.trim();
    if(inputField === ''){
      this.getAdmins().subscribe(
        (res:any)=> {
          this.admins = res.data
          this.showLoader = false;
          // this.showNoResults = false;
         })
        this.admins = this.originalData
        // this.showNoResults = true
    }
    const filteredAdmins = this.admins.filter((admin:any) => {
      // Adjust the conditions based on your filtering requirements
      return (
        admin.firstname.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (admin.lastname && admin.lastname.toLowerCase().includes(this.searchText.toLowerCase())) ||
        admin.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (admin.phone_no && admin.phone_no.toLowerCase().includes(this.searchText.toLowerCase())) ||
        admin.user_type.toString().includes(this.searchText)
      );
    });
    this.admins = filteredAdmins;
    // Check if there are any results
        if (filteredAdmins.length  === 0) {
          setTimeout(() => {
            this.showNoResults = true; 
          }, 1000);
         
          // Set a flag to show "No Search Result" message
        } else {
          this.showNoResults = false; // Hide the "No Search Result" message if there are results
        }
  }

 
  clear() {
    this.searchText = '';
    this.getAdmins().subscribe(
      (res:any)=> {
        this.admins = res.data
        this.showLoader = false;
      }
      )
      this.admins = this.originalData
  }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.admins);
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

    editAdmin(admin: IAdmin):any {
      this.editedAdmin1 = { ...admin }; // Create a copy to avoid modifying the original data; 
      this.editedRowId = admin.uuid;
      // this.displayDialog = true;
      this.selectedUserId = null; 
      this.isModalVisible = true
    }

    toggleDialog(){
      // this.displayDialog = !this.displayDialog
this.isModalVisible = !this.isModalVisible 
 }

    getAdmins(): Observable<IAdmin[]>{
      return this.http.get<IAdmin[]>(`${this.baseUrl}/api/admin/admins`);
    }

    isModalVisible: boolean = false;

    showModal() {
      this.isModalVisible = true;
    }
  
    hideModal() {
      this.isModalVisible = false;
    }
  

    

}
