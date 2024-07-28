import { Component, inject, OnInit,   } from '@angular/core';
// import { DriversService } from 'src/app/service/driver.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../../components/shared/loader/loader.component';
// import { UsersService } from 'src/app/service/users.service';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-drivers-edit',
  templateUrl: './drivers-edit.component.html',
  styleUrls: ['./drivers-edit.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, ModalComponent, ButtonComponent, HttpClientModule, LoaderComponent],
})
export class DriversEditComponent implements OnInit {
close() {
throw new Error('Method not implemented.');
}


  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);

  drivers: any;
  driverId: any;
  userDetails:any

  cities!: City[] |  undefined;
  vehicles!: City[] |  undefined;

  showAlert = false;
  alertMsg = 'Please wait';
  alertColor = 'primary';

  displayDialog:boolean = false;

  constructor(
    // private Drivers: DriversService,
    private route: ActivatedRoute,
    private router: Router,
    // private users:UsersService
  ){

  }

  ngOnInit(){

    this.displayDialog = true;
    this.vehicles = [
      { name: 'SUV', code: 'NY' },
      { name: 'Sedan', code: 'RM' },
      { name: 'Van', code: 'LDN' },
  ];
  this.cities = [
    { name: 'Abia',  code: 'abia'},
    { name: 'Enugu',  code: 'enu' },
    { name: 'Bauchi',  code: 'bau' },
    { name: 'Calabar',  code: 'cal' },
    { name: 'Uyo', code: 'uyo' },
    { name: 'Port Harcourt',  code: 'ph' },
    { name: 'Abuja',  code: 'abj' },
    { name: 'Lagos',  code: 'lag'},
];

this.driverId = this.route.snapshot.paramMap.get('uuid')
  console.log(this.driverId)
  this.getSingleDriver(this.driverId).subscribe(
    (res:any)=>{
      console.log('single driver',res.data.user)
      this.drivers = res.data.user
      console.log(this.drivers.email)
    }
  )

 

}

getSingleDriver(driverId: any): Observable<any>{
  return this.http.get<any>(`${this.baseUrl}/api/driver/details/show/${driverId}`);
}





updateUser() {

  this.showAlert = true;

   var editDriverForm = {
     first_name: this.drivers.firstname,
     last_name: this.drivers.lastname,
     email: this.drivers.email,
     phone_no: this.drivers.Phone_no,
     password: this.drivers.password,
     city: this.drivers.city,
     user_type: this.drivers.user_type,
   }

   console.log(editDriverForm)
   this.updateDriver(editDriverForm, this.driverId).subscribe({
    next: (res:any) => {

      console.log(res)
   if(res.success === 'true'){
    alert(res.data.message)
   
    setTimeout(() => {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }, 1000);

   } else {
    alert(res.data.message)
   }
    }
  })
  
 }

 updateDriver(editDriverForm: object, driverId:any) {
  return this.http.put(`${this.baseUrl}/api/driver/details/store/${driverId}`, editDriverForm);
}

 deleteUser() {
     window.alert('are you sure?');
     const driverId = this.driverId;
     console.log(driverId)
     // this.displayDialog = true;
       this.deleteDriver(driverId).subscribe((res:any) => {
         console.log(res);

         if(res.success == true){
           alert(res.data.message)
           this.router.navigate(['/users']);
         } else {
           alert(res.data.message)
         }
       })
   
   }
   deleteDriver(driverId:any) {
    return this.http.delete(`${this.baseUrl}/api/driver/details/delete/${driverId}`);
  }

   onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // this.licence_docu.setValue(file); // Update the form control with the selected file
  }
  onFileSelected1(event: any) {
    const file: File = event.target.files[0];
    // this.insurance_docu.setValue(file); // Update the form control with the selected file
  }
  onFileSelected2(event: any) {
    const file: File = event.target.files[0];
    // this.vehicle_docu.setValue(file); // Update the form control with the selected file
  }
  onFileSelected3(event: any) {
    const file: File = event.target.files[0];
    // this.multi_docu.setValue(file); // Update the form control with the selected file
  }


  closeEdit(){
    // window.alert('close')
    this.displayDialog = !this.displayDialog;
    this.router.navigate(["/users"])
   }

   showModal() {
    this.displayDialog = !this.displayDialog;
  }

  hideModal() {
    this.displayDialog = !this.displayDialog;
  }

  

  
}
