// Dependecies
import { Component, OnInit,Input, inject,  } from '@angular/core';
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


@Component({
  selector: 'app-message-notifications',
  standalone: true,
  imports : [ HttpClientModule, TableModule, CommonModule, RouterLink , ButtonComponent,ButtonModule, Button, ModalComponent, LoaderComponent],
  templateUrl: './message-notifications.component.html',
  styleUrl: './message-notifications.component.scss'
})
export class MessageNotificationsComponent {
  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);

  showNoResults:boolean = false;
 moreActions:boolean = false;

// variables
messages!: any;
displayDialog: boolean = false;
showLoader = true;
originalData = this.messages;
selectedUserId:any = null;
userDetails:any
editedAdmin1: IAdmin | any;
editedRowId: number | null = null;
  
 @Input() searchText: string = '';

 ngOnInit(): void {
  this.getAppNofications().subscribe({
    next: (res) => {
      this.messages = res;
      this.showLoader = false;
      console.log('messages',this.messages)
    },
    error: (error) => {
      console.log(error);
    },
  }
    
    )
 }

 getAppNofications(): Observable<any> {
   return this.http.get<any>(`${this.baseUrl}/api/admin/messages`);
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
      this.getAppNofications().subscribe(
        (res:any)=> {
          this.messages = res.data
          this.showLoader = false;
          // this.showNoResults = false;
         })
        this.messages = this.originalData
        // this.showNoResults = true
    }
    const filteredAdmins = this.messages.filter((admin:any) => {
      // Adjust the conditions based on your filtering requirements
      return (
        admin.firstname.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (admin.lastname && admin.lastname.toLowerCase().includes(this.searchText.toLowerCase())) ||
        admin.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (admin.phone_no && admin.phone_no.toLowerCase().includes(this.searchText.toLowerCase())) ||
        admin.user_type.toString().includes(this.searchText)
      );
    });
    this.messages = filteredAdmins;
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
    this.getAppNofications().subscribe(
      (res:any)=> {
        this.messages = res.data
        this.showLoader = false;
      }
      )
      this.messages = this.originalData
  }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.messages);
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


    isModalVisible: boolean = false;

    showModal() {
      this.isModalVisible = true;
    }
  
    hideModal() {
      this.isModalVisible = false;
    }
  


}
