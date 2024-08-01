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
import { CommonModule } from '@angular/common';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-riders-add',
  templateUrl: './riders-add.component.html',
  styleUrls: ['./riders-add.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent, CommonModule, ModalComponent, VRInputComponent, LoaderComponent, HttpClientModule]
})
export class RiderAddComponent implements OnInit {

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);

  userDetails:any
  insubmission = false;
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

}
   // validators & formcontrols

  //  license_docu!: FormControl;
    
   
  first_name = new FormControl('',[Validators.required, Validators.minLength(3)])
  last_name = new FormControl('',[Validators.required, Validators.minLength(3)])
  email = new FormControl('',
  [Validators.required,Validators.email], 
  // [this.emailTaken.validate]
  )
  phone_no = new FormControl('+234', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(15)
  ]) 
  password = new FormControl('',[Validators.required, Validators.pattern(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)])
  password_confirmation = new FormControl('',[Validators.required, Validators.pattern(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)])
  profile_url = new FormControl(<any>[ Validators.minLength(0)])
  city = new FormControl('', [Validators.required, Validators.minLength(3)]) 

   // Grouped Form
   riderForm = new FormGroup({
    first_name: this.first_name,
    last_name: this.last_name,
    email: this.email,
    phone_no: this.phone_no,
    password: this.password,
    password_confirmation: this.password_confirmation,
    city: this.city,
  
   })

  submit(){
    console.log(this.riderForm.value)
    this.insubmission = true
     
    let addRider = {
      ...this.riderForm.value,
      user_type: 'rider', 
      device_token: 'vroomxtt1234',
      ref_code: 'adeife.taiwo',
      ref_by: 'Vroomng',
  
      // profile_url: this.profile_url.value.name
    };
  
    console.log(this.riderForm)
    this.insubmission = true
    setTimeout(() => {
      this.showAlert = true;
  
      this.addnewRider(addRider).subscribe({
        next: (res: any) => {
          console.log(res);
          this.insubmission = false
          alert(res.data.message);
          this.router.navigate(['/users']);
         
        },
        error: (err: any) => {
          console.error('error',err);
          alert(err.error.data.message);
          this.insubmission = false
          // alert('An error occurred while adding the admin.');
        }
      });
    }, 1000);
    
    
  }

  addnewRider(addDrivers:any){
    return this.http.post(`${this.baseUrl}/api/admin/user/store`, addDrivers)
  }



reset(){
  this.riderForm.reset()
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
