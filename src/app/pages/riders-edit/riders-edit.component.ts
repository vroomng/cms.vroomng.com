import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { FormsModule } from '@angular/forms';

interface City {
  name: string;
  // code: string;
}

@Component({
  selector: 'app-riders-edit',
  templateUrl: './riders-edit.component.html',
  styleUrls: ['./riders-edit.component.scss'],
  standalone: true,
    imports : [
    HttpClientModule, TableModule, CommonModule, RouterLink , FormsModule,  ButtonComponent,ButtonModule, Button, ModalComponent, LoaderComponent],
})
export class RidersEditComponent implements OnInit {

  riderId: any;
  riders: [] | any;
  userDetails:any

  cities!: City[] |  undefined;

  showAlert:boolean = false;
  alertMsg = 'Updating user ...';
  alertColor = 'primary';


  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);

  constructor(
    // private Rider: RiderService,
    private route: ActivatedRoute,
    private router: Router,
    // private users:UsersService
    ){}

  ngOnInit(){ 
    this.isModalVisible = true;
   this.riderId = this.route.snapshot.paramMap.get('id');
   console.log(this.riderId)
   this.getSingleRider(this.riderId).subscribe(
     (res:any)=>{
      console.log('single driver',res.data.user)
      this.riders = res.data.user
      console.log(this.riders.email)
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

    getSingleRider(riderId: any): Observable<any>{
      return this.http.get<any>(`${this.baseUrl}/api/admin/user/${riderId}`);
    }
  update() {
    this.showAlert = true;
    var editRiderForm = {
      firstname: this.riders.firstname,
      lastname: this.riders.lastname,
      // email: this.riders.email,
      phone_no: this.riders.Phone_no,
      // password: this.riders.password,
      city: this.riders.city,
      // user_type: this.riders.user_type,
    }
  
    console.log(editRiderForm)
    this.updateRider(editRiderForm, this.riderId).subscribe({
      next: (res:any) => {
        console.log(res)
        if(res.code === 200){
        this.alertMsg = 'User Updated'
        this.alertColor = 'success'
      }else {
        this.alertMsg = res.message
        this.alertColor = 'danger'
      }
      }
    })
   
  }

  // addRiders(addRiders:any){
  //   return this.http.post(`${this.baseUrl}/newUserEntry`, addRiders)
  // }

  updateRider(editRiderForm: object, riderId:any) {
    return this.http.put(`${this.baseUrl}/updateUser/${riderId}`, editRiderForm);
  }

 
  deleteRider() {
      this.showAlert === true;
      window.alert('are you sure?')
      const riderId = this.riderId;
        this.delete(riderId).subscribe((res:any) => {
          // console.log(res);
          const response = res.data;
          if(res.code == 200){
            window.alert('successfully deleted')
           this.alertMsg = 'Successfully deleted'
           this.alertColor = 'success'
           this.router.navigate(["/users"])
          } else {
            window.alert('failed to delete')
            this.alertMsg = res.message
           this.alertColor = 'danger'
          }
  
        })
    
    }

    delete(riderId:any) {
      return this.http.delete(`${this.baseUrl}/users/${riderId}`);
    }
  
    close(){
      this.isModalVisible = !this.isModalVisible
      this.router.navigate(["/users"])
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
