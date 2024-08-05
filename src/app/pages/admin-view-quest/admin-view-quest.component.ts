
import { Component, inject, Input, OnInit } from '@angular/core';
import { IQuest,IAdmin } from '../../model/admins';
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


@Component({
  selector: 'app-admin-view-quest',
  standalone: true,
  imports:[ HttpClientModule, TableModule, CommonModule, RouterLink , ButtonComponent,ButtonModule, Button, ModalComponent, LoaderComponent],
  templateUrl: './admin-view-quest.component.html',
  styleUrl: './admin-view-quest.component.scss'
})
export class AdminViewQuestComponent implements OnInit {
  @Input() searchText: string = '';

 showNoResults:boolean = false;
 moreActions:boolean = false;

  quest: IQuest[] = [];
  questDtls: IAdmin | any;
  displayDialog: boolean = false;
  showLoader = true;
  originalData = this.quest;
  
  editedRowId: string | null = null;
  userDetails:any
  selectedUserId:any = null;
  editedAdmin1: IAdmin | any;
 

  private baseUrl = environment.serverUrl;
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.getAllQuest().subscribe({
      next: (res) => {
        console.log(res.data.expired.data);
        this.quest = res.data.expired.data;
        this.showLoader = false;
        
      }, 
      error: (error) => {
        console.log(error);
        this.showLoader = false;
      }
    })
  }

 
  applyFilter() {
    throw new Error('Method not implemented.');
  }

  getAllQuest(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/admin/quest/index`);
  }
  clear() {
    this.searchText = '';
    this.getAllQuest().subscribe(
      (res:any)=> {
        this.quest = res.data
        this.showLoader = false;
      }
      )
      this.quest = this.originalData
  }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.quest);
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

    viewQuest(quest: IQuest):any {
      this.questDtls = { ...quest }; // Create a copy to avoid modifying the original data; 
      this.editedRowId = quest.uuid  ;
      this.isModalVisible = true
    }

    toggleDialog(){
        this.isModalVisible = !this.isModalVisible
    }


  userAction(userId: any) {
    if (this.selectedUserId === userId) {
        this.selectedUserId = null; // Hide the card actions if the same user is clicked again
    } else {
        this.selectedUserId = userId; // Show the card actions for the clicked user
    }
}
isModalVisible: boolean = false;

showModal() {
  this.isModalVisible = true;
}

hideModal() {
  this.isModalVisible = false;
}




}
