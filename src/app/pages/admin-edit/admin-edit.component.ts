import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IAdmin } from '../../model/admins';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../../components/shared/loader/loader.component';

interface City {
  name: string;
  // code: string;
}
interface Users {
  type: string;
  code: string;
}

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, ModalComponent, ButtonComponent, HttpClientModule, LoaderComponent],
})
export class AdminEditComponent implements OnInit {

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);


  inSubmission = false; 

  cities!: City[] |  undefined;
  userType!: Users[] |  undefined;

  admins!: IAdmin [] | any;
  adminId!: any;
  userDetails:any
  displayDialog:boolean = false;

  showAlert:boolean = false;
  alertMsg = 'please wait your account is being created';
  alertColor = 'primary';

  constructor(
    private route: ActivatedRoute,
    // private admin: AdminService,
    private router:Router,
    // private users: UsersService
    ){

  }
  ngOnInit() { 
    this.displayDialog = true
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
  this.userType = [
    { type: 'Super Admin', code: '4' },
    { type: 'Sub Admin', code: '3' },
    { type: 'Partner', code: '5' },
  ];
  
  this.adminId = this.route.snapshot.paramMap.get('uuid')
  console.log(this.adminId)
  this.getSingleUser(this.adminId).subscribe(
    (res:any)=>{
      console.log('single user',res)
      this.admins = res.data
      console.log(this.admins.user.email)
    }

  )
  // const userDetails = this.users.getStoredUserDetails();
  // this.userDetails = userDetails
  // console.log('view admin', email)

  }




  updateUser() {

   this.showAlert = true;

    var editAdminForm = {
      first_name: this.admins.user.user_profile.first_name,
      last_name: this.admins.user.user_profile.last_name,
      // email: this.admins.email,
      phone_no: this.admins.user.phone_no,
      // password: this.admins.password,
      city: this.admins.user.user_profile.city,
      user_type: this.admins.user.user_type,
    }

    console.log(editAdminForm)

    this.updateAdmin(editAdminForm, this.adminId).subscribe({
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

  getSingleUser(userId: any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/admin/user/${userId}`);
  }

  updateAdmin(editAdminForm: object, adminId:any) {
    return this.http.put(`${this.baseUrl}/api/admin/user/update/${adminId}`, editAdminForm);
  }

  deleteUser() {
      window.alert('are you sure?');
      const adminId = this.adminId;
      console.log(adminId)
      // this.displayDialog = true;
     
        this.deleteAdmin(adminId).subscribe((res:any) => {
          console.log(res);

          if(res.success == true){
            alert(res.data.message)
            this.router.navigate(['/users']);
          } else {
            alert(res.data.message)
          }
        })
    
    }

    deleteAdmin(adminId:any) {
      return this.http.delete(`${this.baseUrl}/api/admin/user/delete/${adminId}`);
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
