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
  selector: 'app-app-surge',
  standalone: true,
  imports : [ HttpClientModule, TableModule, CommonModule, RouterLink , ButtonComponent,ButtonModule, Button, ModalComponent, LoaderComponent],
  templateUrl: './app-surge.component.html',
  styleUrl: './app-surge.component.scss'
})
export class AppSurgeComponent {private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);

  showNoResults:boolean = false;
 moreActions:boolean = false;

// variables
  builds!: any;
  displayDialog: boolean = false;
  showLoader = true;
  originalData = this.builds;
  selectedUserId:any = null;
  userDetails:any
  editedAdmin1: IAdmin | any;
  editedRowId: number | null = null;
  
 @Input() searchText: string = '';

 ngOnInit(): void {
  this.getAppBuild().subscribe({
    next: (res) => {
      this.builds = res;
      this.showLoader = false;
      console.log(this.builds)
    },
    error: (error) => {
      console.log(error);
    },
  }
    
    )
 }

 getAppBuild(): Observable<any> {
   return this.http.get<any>(`${this.baseUrl}/api/admin/app/builds`);
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
      this.getAppBuild().subscribe(
        (res:any)=> {
          this.builds = res.data
          this.showLoader = false;
          // this.showNoResults = false;
         })
        this.builds = this.originalData
        // this.showNoResults = true
    }
    const filteredAdmins = this.builds.filter((admin:any) => {
      // Adjust the conditions based on your filtering requirements
      return (
        admin.firstname.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (admin.lastname && admin.lastname.toLowerCase().includes(this.searchText.toLowerCase())) ||
        admin.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (admin.phone_no && admin.phone_no.toLowerCase().includes(this.searchText.toLowerCase())) ||
        admin.user_type.toString().includes(this.searchText)
      );
    });
    this.builds = filteredAdmins;
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
    this.getAppBuild().subscribe(
      (res:any)=> {
        this.builds = res.data
        this.showLoader = false;
      }
      )
      this.builds = this.originalData
  }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.builds);
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
