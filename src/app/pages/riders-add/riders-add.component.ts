import { Component, inject, OnInit } from '@angular/core';
import { FormControl , FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
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
  // code: string;
}

@Component({
  selector: 'app-riders-add',
  templateUrl: './riders-add.component.html',
  styleUrls: ['./riders-add.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent, ModalComponent, VRInputComponent, LoaderComponent, HttpClientModule]
})
export class RidersAddComponent {
  // variables
  cities!: City[] |  undefined;
  showAlert = false;
  alertMsg = 'Please wait';
  alertColor = 'primary';
  userDetails:any;
  displayDialog:boolean = false;

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);
  
  // constructors & lifecycles
  constructor(private router:Router){
  }
  ngOnInit(){
    this.displayDialog = true;    
    this.cities = [
      { name: 'Abia' },
      { name: 'Enugu' },
      { name: 'Bauchi' },
      { name: 'Calabar' },
      { name: 'Uyo' },
      { name: 'Port Harcourt' },
      { name: 'Abuja' },
      { name: 'Lagos'},
  ];
  // const userDetails = this.users.getStoredUserDetails();
  // this.userDetails = userDetails
  // this.addAccessTrail()
}
// functions
// validators & formcontrols
    
firstname = new FormControl('',[Validators.required, Validators.minLength(3)]);
lastname = new FormControl('', [Validators.required, Validators.minLength(3)]);
email = new FormControl('', [Validators.required, Validators.minLength(3)]);
phone_no = new FormControl('+234',[Validators.required, Validators.minLength(3)]);
password = new FormControl('', [Validators.required, Validators.minLength(3)]);
user_type = new FormControl('1',[Validators.required, Validators.minLength(3)]);
city = new FormControl('',[Validators.required, Validators.minLength(3)]);
balance = new FormControl('',[Validators.required, Validators.minLength(0)]);
ref_by = new FormControl('SAMUELD1122',[Validators.required, Validators.minLength(0)]);
profile_url = new FormControl('https://res.cloudinary.com/xenxei46/image/upload/v1682686741/boy_rexp5y.png',[Validators.required, Validators.minLength(0)]);
device_token = new FormControl('ertyu1',[Validators.required, Validators.minLength(0)]);
device_type = new FormControl('1',[Validators.required, Validators.minLength(0)]);
ride_check = new FormControl('1',[Validators.required, Validators.minLength(0)]);
country_code = new FormControl('NG',[Validators.required, Validators.minLength(0)]);
country_dailing_code = new FormControl('+234',[Validators.required, Validators.minLength(0)]);

// Grouped Form
addRiders = new FormGroup({
  firstname: this.firstname,
  lastname: this.lastname,
  email: this.email,
  phone_no: this.phone_no,
  password: this.password,
  user_type: this.user_type,
  city: this.city,
  balane: this.balance,
  ref_by: this.ref_by,
  profile_url: this.profile_url,
  device_token: this.device_token,
  device_type: this.device_type,
  ride_check: this.ride_check,
  country_code: this.country_code,
  country_dailing_code: this.country_dailing_code

})

  
onSubmit(){
  this.showAlert = true
  setTimeout(() => {
    this.showAlert = true
    this.alertMsg = 'Loading... If sync persists check network'
    this.alertColor = 'info'
    const ridersData = this.addRiders.value
    // console.log(ridersData)
    this.addRider(ridersData).subscribe(
      (res:any) => {
       console.log(res)
       if(res.code == 200){
        this.alertMsg = res.message,
        this.alertColor = "success"
       } else {
        this.alertMsg = res.message,
        this.alertColor = 'danger'
       }
       } 
    )
    }, 1600)
}


addRider(addRiders:any){
  return this.http.post(`${this.baseUrl}/newUserEntry`, addRiders)
}

close(){
  this.displayDialog = !this.displayDialog;
  this.router.navigate(["/users"])
 }


reset(){
  this.addRiders.reset()
}  


showModal() {
  this.displayDialog = true;
}

hideModal() {
  this.displayDialog = false;
}


}
