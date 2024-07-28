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
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent, ModalComponent, VRInputComponent, LoaderComponent]
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
  // city = new FormControl(this.cities, [Validators.required, Validators.minLength(3)]) 
  user_type = new FormControl('admin') 
  device_token = new FormControl('iuxbybnhm', [Validators.required, Validators.minLength(1)])
  ref_code = new FormControl('adeife.taiwo')
  ref_by = new FormControl('Vroomng')
  
  
  adminForm = new FormGroup({
    first_name: this.first_name,
    last_name: this.last_name,
    email: this.email,
    phone_no: this.phone_no,
    password: this.password,
    password_confirmation: this.password_confirmation,
    // city: this.city,
    user_type: this.user_type,
    device_token: this.device_token,
    ref_code: this.ref_code,
    ref_by: this.ref_by
  })



  // const selectedValue = this.form.get('selectedOption').value;
  submit(){
     console.log(this.adminForm.value)
    //  window.alert('in process') 
    this.showAlert = true
    setTimeout(() => {
      this.showAlert = true
      this.alertMsg = 'Loading... If sync persists check network'
      this.alertColor = 'info'
      this.addAdmin(this.adminForm.value).subscribe(
        (res:any) => {
         console.log(res)
         if(res.success == true){
          // this.alertMsg = res.message;
          // this.alertColor = "success"
          alert(res.data.message)
         } else {
          // this.alertMsg = res.message;
          // this.alertColor = 'danger'
          alert(res.data.message)

         }
         }
        
      )
      }, 1600) 
  }

  addAdmin(adminForm:any){
    return this.http.post(`${this.baseUrl}/api/admin/user/store`, adminForm)
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

  
}
