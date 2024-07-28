import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormsModule,ReactiveFormsModule,Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../../components/shared/loader/loader.component';
import { VRInputComponent } from '../../components/shared/vr-input/vr-input.component';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-drivers-add',
  templateUrl: './drivers-add.component.html',
  styleUrls: ['./drivers-add.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent, ModalComponent, VRInputComponent, LoaderComponent, HttpClientModule]
})
export class DriversAddComponent implements OnInit {

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);

  userDetails:any
// variables
  cities!: City[] |  undefined;
  vehicles!: City[] |  undefined;
  showAlert = false;
  alertMsg = 'Please wait';
  alertColor = 'primary';

  isModalVisible: boolean = false;

// constructor and lifecycle methods
  constructor(private router:Router)
      {
     }

  ngOnInit(){

    this.isModalVisible = true;

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

// const userDetails = this.users.getStoredUserDetails();
//   this.userDetails = userDetails
}
   // validators & formcontrols

  //  license_docu!: FormControl;
    
   firstname = new FormControl('',[Validators.required, Validators.minLength(3)]);
   lastname = new FormControl('', [Validators.required, Validators.minLength(3)]);
   email = new FormControl('', [Validators.required, Validators.minLength(3)]);
   phone_no = new FormControl('',[Validators.required, Validators.minLength(3)]);
   password = new FormControl('', [Validators.required, Validators.minLength(3)]);
   user_type = new FormControl('2',[Validators.required, Validators.minLength(3)]);
   city = new FormControl('',[Validators.required, Validators.minLength(3)]);
   supervisor = new FormControl('',[Validators.required, Validators.minLength(3)]);
   profile_url = new FormControl('',[Validators.required, Validators.minLength(3)]);
   holder_name = new FormControl('',[Validators.required, Validators.minLength(3)]);
   account_number = new FormControl('',[Validators.required, Validators.minLength(3)]);
   bank_name = new FormControl('',[Validators.required, Validators.minLength(3)]);
   location = new FormControl('',[Validators.required, Validators.minLength(3)]);
   IFSC_code = new FormControl('',[Validators.required, Validators.minLength(3)]);
   payment_email = new FormControl('',[Validators.required, Validators.minLength(3)]);
   licence_no = new FormControl('',[Validators.required, Validators.minLength(3)]);
   licence_docu = new FormControl(<any>[Validators.required, Validators.minLength(3)]);
   insurance_docu = new FormControl(<any>[Validators.required, Validators.minLength(3)]);
   vehicle_docu = new FormControl(<any>[Validators.required, Validators.minLength(3)]);
   multi_docu = new FormControl(<any>[Validators.required, Validators.minLength(3)]);
   vehicle_type = new FormControl('',[Validators.required, Validators.minLength(3)]);
 
   // Grouped Form
   addDrivers = new FormGroup({
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    phone_no: this.phone_no,
    password: this.password,
    user_type: this.user_type,
    city: this.city,
    supervisor: this.supervisor,
    profile_url: this.profile_url,     
    holder_name: this.holder_name,     
    account_number: this.account_number,     
    bank_name: this.bank_name,     
    location: this.location,     
    IFSC_code: this.IFSC_code,     
    payment_email: this.payment_email,     
    licence_no: this.licence_no,     
    licence_docu: this.licence_docu,     
    insurance_docu: this.insurance_docu,     
    vehicle_docu: this.vehicle_docu,     
    multi_docu: this.multi_docu,     
    vehicle_type: this.vehicle_type     
   })

  submit(){
    console.log(this.addDrivers.value)
    // window.alert('in process')
    this.showAlert = true
    setTimeout(() => {
      this.showAlert = true
      this.alertMsg = 'Loading... If sync persists check network'
      this.alertColor = 'info'
      const driverData = this.addDrivers.value
      console.log(driverData)
      this.addnewDriver(driverData).subscribe(
        (res:any) => {
         console.log(res)
         if(res.code == 200){
          this.alertMsg = res.message
          this.alertColor = "success"
         } else {
          this.alertMsg = res.message;
          this.alertColor = 'danger'
         }
         } 
      )
      }, 1600)
  }

  addnewDriver(addDrivers:any){
    return this.http.post(`${this.baseUrl}/api/driver/details/store`, addDrivers)
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.licence_docu.setValue(file); // Update the form control with the selected file
  }
  onFileSelected1(event: any) {
    const file: File = event.target.files[0];
    this.insurance_docu.setValue(file); // Update the form control with the selected file
  }
  onFileSelected2(event: any) {
    const file: File = event.target.files[0];
    this.vehicle_docu.setValue(file); // Update the form control with the selected file
  }
  onFileSelected3(event: any) {
    const file: File = event.target.files[0];
    this.multi_docu.setValue(file); // Update the form control with the selected file
  }


reset(){
  this.addDrivers.reset()
}  
  close(){
    // window.alert('close')
    this.isModalVisible = !this.isModalVisible
    setTimeout(() => {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/users', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }, 500);
    this.router.navigate(["/users"])
   }

   showModal() {
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }
   
}
