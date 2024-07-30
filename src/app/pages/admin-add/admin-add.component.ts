import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { EmailTaken } from '../../helpers/validators/email-taken';
// import { AdminService } from 'src/app/service/admin.service';
// import { UsersService } from 'src/app/service/users.service';
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
  // code: string;
}
interface Users {
  type: string;
  code: string;
}

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule, ReactiveFormsModule, ButtonComponent, ModalComponent, VRInputComponent, LoaderComponent]
})

export class AdminAddComponent implements OnInit {

  inSubmission = false; 

  cities!: City[] |  undefined;
  userType!: Users[] |  undefined;
  userDetails:any

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);

  isModalVisible:boolean = false;
    // List of items to display in the dropdown
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' }
  ];

  // Selected item
  selectedItem: any;

  // Handler for selection change
  onSelectionChange(event: any) {
    this.selectedItem = event.target.value;
    console.log(this.selectedItem); // You can handle the selected item here
  }
  
  showAlert = false;
  alertMsg = 'please wait your account is being created';
  alertColor = 'primary';

  constructor(
    // private users: UsersService,
    //  private Admin: AdminService,
     private router: Router
    ){ }

  onSubmit(){
    if(this.adminForm.valid) {
     window.alert('admin added')
    }
  }
  ngOnInit(){
    this.isModalVisible = true;
    this.userType = [
      { type: 'Super Admin', code: '4' },
      { type: 'Sub Admin', code: '3' },
      { type: 'Partner', code: '5' },
  ];
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
 
  }

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
  // user_type = new FormControl('admin') 
  // device_token = new FormControl('iuxbybnhm', [Validators.required, Validators.minLength(1)])
  // ref_code = new FormControl('adeife.taiwo')
  // ref_by = new FormControl('Vroomng')
  
  
  adminForm = new FormGroup({
    first_name: this.first_name,
    last_name: this.last_name,
    email: this.email,
    phone_no: this.phone_no,
    password: this.password,
    password_confirmation: this.password_confirmation,
    city: this.city,
    // user_type: this.user_type,
    // device_token: this.device_token,
    // ref_code: this.ref_code,
    // ref_by: this.ref_by
  })

  // const selectedValue = this.form.get('selectedOption').value;
  submit(){
    
  console.log(this.adminForm.value)
     
  let addAdmin = {
    ...this.adminForm.value,
    user_type: 'admin', 
    device_token: 'vroomxtt1234',
    ref_code: 'adeife.taiwo',
    ref_by: 'Vroomng',

    // profile_url: this.profile_url.value.name
  };

  console.log(addAdmin)

  this.showAlert = true;
    this.inSubmission = true
    setTimeout(() => {
      this.showAlert = true;
  
      this.addAdmin(addAdmin).subscribe({
        next: (res: any) => {
          console.log(res);
          this.inSubmission = false
          this.router.navigate(['/users']);
          if (res.success) {
            alert(res.data.message);
          } else {
            alert(res.data.message);
            this.inSubmission = false
          }
        },
        error: (err: any) => {
          console.error('error',err);
          alert(err.error.data.message);
          // alert('An error occurred while adding the admin.');
        }
      });
    }, 1000);
   }

  addAdmin(addAdmin:any){
    return this.http.post(`${this.baseUrl}/api/admin/user/store`, addAdmin)
  }

  reset(){
    this.adminForm.reset()
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

   onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.profile_url.setValue(file); // Update the form control with the selected file
    console.log(this.profile_url.value.name)
  }
  

  
}
