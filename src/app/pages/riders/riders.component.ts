import { Component, inject, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { IRiders } from '../../model/ridersinfo';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
// import { RiderService } from 'src/app/service/riders.service';
// import { UsersService } from 'src/app/service/users.service';
import { HttpClientModule } from '@angular/common/http';
import { TableModule} from 'primeng/table';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { Button, ButtonModule } from 'primeng/button';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { LoaderComponent } from '../../components/shared/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss'],
  standalone: true,
  imports : [
    HttpClientModule, TableModule, CommonModule, RouterLink , ButtonComponent,ButtonModule, Button, ModalComponent, LoaderComponent],
})
export class RidersComponent implements OnInit {

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);

 riders: IRiders [] = [];
 showLoader = true;
 searchText:string = '';
 userDetails:any;
 displayDialog:boolean = false;

  loaderColor!: 'primary';
 
  editedUser: IRiders | any;
  showNoResults:boolean = false;
  selectedUserId:any = null;
 
  editedRowId: number | null = null;

 constructor( ){}

  ngOnInit(): void {
    this.getRiders().subscribe(
      (res:any)=> {
        console.log(res.data)
        this.riders = res.data.riders.data
        console.log('response riders',res.data.riders.data)
        this.sortRiders()
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
    
    }


    getRiders():Observable<IRiders[]>{
      return this.http.get<IRiders[]>(`${this.baseUrl}/api/admin/riders`);
    }
    applyFilter() {
      this.searchText 
      console.log(this.searchText)
      
    }
  
    exportExcel() {
      import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(this.riders);
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
      this.getRiders().subscribe(
        (res:any)=>{
          console.log(res.data)
          this.riders = res.data;
          this.showLoader = false;
        }
      )
    }
    sortRiders(){
      if(this.riders){
        console.log('App drivers Exists')
       const newdata = this.riders.sort((a, b) => {
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
       
      }
      isModalVisible: boolean = false;
  
      showModal() {
        this.isModalVisible = true;
      }
    
      hideModal() {
        this.isModalVisible = false;
      }
    

      userAction(userId: any) {
        if (this.selectedUserId === userId) {
            this.selectedUserId = null; // Hide the card actions if the same user is clicked again
        } else {
            this.selectedUserId = userId; // Show the card actions for the clicked user
        }
    }

}
